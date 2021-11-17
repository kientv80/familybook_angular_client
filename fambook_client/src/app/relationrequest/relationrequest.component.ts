import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FamBookService } from 'app/fam-book.service';
import { NotifydaialogComponent } from 'app/notifydaialog/notifydaialog.component';
import { NotifyInfo } from 'app/schema/notifyinfo';
import { RelationRequest } from 'app/schema/relationrequest';

@Component({
  selector: 'app-relationrequest',
  templateUrl: './relationrequest.component.html',
  styleUrls: ['./relationrequest.component.css']
})
export class RelationrequestComponent implements OnInit {
  requests: RelationRequest[];
  constructor(private fservice: FamBookService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fservice.getRelationRequests().subscribe({
      next: result => {
        if (result.errorCode === 0) {
          this.requests = result.data;
        }
      }
    });
  }
  comfirm(id: number): void {
    this.fservice.confirmRelationRequest(id).subscribe({
      next: result => {
        console.log(result);
      }
    });
  }
  reject(id: number): void {
    this.fservice.rejectRelationRequest(id).subscribe({
      next: result => {
        if (result.errorCode === 0) {
          this.requests = this.requests.filter(r => r.id !== id);
          this.dialog.open(NotifydaialogComponent, {
            data: new NotifyInfo("success", "Từ Trối", "Từ trối thành công", false, "Ok", "Đóng")
          });
        } else {
          this.dialog.open(NotifydaialogComponent, {
            data: new NotifyInfo("failed", "Từ Trối", "Từ trối không thành công, vui lòng thử lại sau.", false, "Ok", "Đóng")
          });
        }
      }
    });
  }
  toVN(type: string): string {
    if ("kid" === type) {
      return "Con";
    } else if ("dad" === type) {
      return "Bố ";
    } else if ("mom" === type) {
      return "Mẹ";
    } else {
      return "Vợ,Chồng";
    }
  }
}
