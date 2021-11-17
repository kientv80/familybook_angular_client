import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FamBookService } from 'app/fam-book.service';
import { NotifydaialogComponent } from 'app/notifydaialog/notifydaialog.component';
import { NotifyInfo } from 'app/schema/notifyinfo';
import { Relation } from 'app/schema/relation';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {
  
  @Output() relationEvent = new EventEmitter<string>();
  relations: Relation[];
  profileName: string;
  constructor(private fbService: FamBookService, private dailog : MatDialog) { }
  ngOnInit(): void {
  }
  loadRelations(profileId:number, profileName: string): void {
    this.profileName = profileName;
    this.fbService.getRelations(profileId).subscribe({
      next: result => {
        if (result.errorCode === 0) {
          this.relations = result.data;
        }
      },
      error: error => {

      }
    });
  }
  close():void {
    this.relations = undefined;
    this.relationEvent.emit("close");
  }
  delRelation(id : number):void{
    let ref = this.dailog.open(NotifydaialogComponent,{
      data: new NotifyInfo("confirm","Confirmation","Are you sure you want to delete this relation?",true,"Confirm","Cancel")
    });
    ref.afterClosed().subscribe(result =>{
      if("ok" === result){
        this.fbService.delRelation(id).subscribe({
          next: result =>{
            if(result.errorCode===0){
              this.relations = this.relations.filter(r => r.id != id);
            }else{
              console.log(result);
            }
          }
        });
      }else{

      }
    });
  }
  toVN(type : string): string {
    if("KID" === type){
      return "Con";
    }else if("DAD" === type){
      return "Bố ";
    }else if("MOM" === type){
      return "Mẹ";
    }else if("WIFE_OR_HUSBAND" === type){
      return "Vợ,Chồng";
    }
  }
}
