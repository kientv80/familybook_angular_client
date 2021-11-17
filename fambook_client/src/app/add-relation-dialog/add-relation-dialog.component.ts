import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from 'app/schema/person';
import { MatButtonModule } from '@angular/material/button';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { FormControl, Validators } from '@angular/forms';
import { FamBookService } from 'app/fam-book.service';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { Result } from 'app/schema/result';
@Component({
  selector: 'app-add-relation-dialog',
  templateUrl: './add-relation-dialog.component.html',
  styleUrls: ['./add-relation-dialog.component.css']
})
export class AddRelationDialogComponent implements OnInit {
  selected: string;
  errorMsg: string = "";
  relationType = new FormControl('', [Validators.required]);


  constructor(@Inject(MAT_DIALOG_DATA) public person: Person, private fService: FamBookService, public dialogRef: MatDialogRef<AddRelationDialogComponent>) { }
  ngOnInit(): void {
  }
  submit(): void {
    console.log(this.selected);
    if (this.relationType.hasError('required')) {
      this.errorMsg = 'Bạn phải chọn mối quan hệ';
    } else {
      this.fService.postAddRelation(this.selected, this.person.id).subscribe({
        next: reult => {
          console.log(reult);
          if (reult.errorCode === 0) {
            this.dialogRef.close("Successed");
          }else{
            this.dialogRef.close("Failed");
          }
        }
      });
    }
  }
  cancel() : void {
    this.dialogRef.close("Cancel");
  }
  getErrorMessage() {
    return this.errorMsg;
  }
}
