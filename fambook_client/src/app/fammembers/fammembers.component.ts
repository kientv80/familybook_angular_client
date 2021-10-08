import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamBookService } from 'app/fam-book.service';
import { Person } from 'app/schema/person';
import { Result } from 'app/schema/result';

@Component({
  selector: 'app-fammembers',
  templateUrl: './fammembers.component.html',
  styleUrls: ['./fammembers.component.css']
})
export class FammembersComponent implements OnInit {

  constructor(private fbservice: FamBookService) { }
  persons: Person[];
  editpperson: Person;
  addNew: boolean = false;
  showRelation: boolean = false;
  relationId: number;

  ngOnInit(): void {
    this.fbservice.getMyAddedFamilyMembers().subscribe({
      next: result => {
        if (result.errorCode === 0) {
          this.persons = result.data;
        } else {
          console.log(result);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
  onSubmit(result: Result<Person>): void {
    if (result.errorCode == 0)
      this.clear();
  }
  clear(): void {
    this.editpperson = undefined;
  }
  edit(id: number): void {
    let index = this.persons.findIndex(p => p.id === id);
    this.editpperson = this.persons[index];
    this.addNew = false;
  }
  add(id: number): void {
    this.addNew = true;
    this.editpperson = new Person();
    this.editpperson.relationId = id;
  }
  delete(id: number): void {

  }

  showRelations(): void {
    this.showRelation = true;
  }
  onRelationEvent(event): void {
    this.showRelation = false;
  }
}
