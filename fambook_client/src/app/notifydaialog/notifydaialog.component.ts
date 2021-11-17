import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyInfo } from 'app/schema/notifyinfo';

@Component({
  selector: 'app-notifydaialog',
  templateUrl: './notifydaialog.component.html',
  styleUrls: ['./notifydaialog.component.css']
})
export class NotifydaialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public notifyInfo : NotifyInfo, public dialogRef: MatDialogRef<NotifydaialogComponent>) { }

  ngOnInit(): void {
  }
  ok(): void {
    this.dialogRef.close("ok");
  }
  close(): void {
    this.dialogRef.close("cancel");
  }
}
