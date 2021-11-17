import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamBookService } from 'app/fam-book.service';
import { Person } from 'app/schema/person';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddRelationDialogComponent } from 'app/add-relation-dialog/add-relation-dialog.component';
import { NotifydaialogComponent } from 'app/notifydaialog/notifydaialog.component';
import { NotifyInfo } from 'app/schema/notifyinfo';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private fservice: FamBookService, public dialog: MatDialog) {

  }
  profiles: Person[];
  ngOnInit(): void {
    this.route.queryParamMap.forEach(p => {
      if (p.get("text") !== undefined && p.get("text") !== "") {
        this.fservice.searchProfile(p.get("text")).subscribe({
          next: result => {
            if (result.errorCode == 0) {
              this.profiles = result.data;
            }
          },
          error: error => {

          }
        });
      }
    });
  }
  addRelation(p: Person): void {
    let dialogRef = this.dialog.open(AddRelationDialogComponent, {
      data: p
    });
    dialogRef.afterClosed().subscribe(result => {
      if ("Successed" === result)
      this.dialog.open(NotifydaialogComponent, {
        data: new NotifyInfo("success", "", "Thành công", false, "Ok", "Đóng")
      });
      else if ("Failed" === result)
      this.dialog.open(NotifydaialogComponent, {
        data: new NotifyInfo("failed", "", "Thất bại, vui lòng thử lại sau.", false, "Ok", "Đóng")
      });
    });
  }
}
