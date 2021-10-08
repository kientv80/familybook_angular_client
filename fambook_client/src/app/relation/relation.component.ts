import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamBookService } from 'app/fam-book.service';
import { Relation } from 'app/schema/relation';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {
  
  @Output() relationEvent = new EventEmitter<string>();
  relations: Relation[];
  constructor(private fbService: FamBookService) { }
  @Input() 
  
  ngOnInit(): void {
  }
  loadRelations(profileId:number): void {
    this.fbService.getRelations(profileId).subscribe({
      next: result => {
        debugger
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
}
