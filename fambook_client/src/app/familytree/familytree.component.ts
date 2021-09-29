import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FamBookService } from 'app/fam-book.service';
import { Person } from 'app/schema/person';
import { DynamicDataSource } from './DynamicDataSource';

@Component({
  selector: 'app-familytree',
  templateUrl: './familytree.component.html',
  styleUrls: ['./familytree.component.css']
})
export class FamilytreeComponent implements OnInit {
  persons: Person[] = [];
  treeControl: FlatTreeControl<Person>;
  dataSource: DynamicDataSource;

  constructor(private famservice: FamBookService) {
  }

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<Person>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.famservice);
    this.famservice.getMyFamilyTree().subscribe({
      next: result => {
        let persons: Person[] = [];
        persons[0] = result.data;
        this.dataSource.data = persons;
      }
    });;
  }


  getLevel = (node: Person) => node.level;

  isExpandable = (node: Person): boolean | undefined => {
    return true;
  }

  hasChild = (_: number, _nodeData: Person) => true;

  loadParent(childId: number): void {
    let index = this.dataSource.data.findIndex(person => person.id === childId)
    if (index >= 0) {
      let child: Person = this.dataSource.data[index];
      this.famservice.getParent(childId).subscribe({
        next: result => {
          if (result.errorCode == 0) {
            let parent: Person = result.data;
            if (parent.children != undefined) {
              parent.level = child.level;
              this.dataSource.data.map(c => {
                c.level = c.level + 1;
              });
              let current = this.dataSource.data;
              this.dataSource.data = [];
              this.dataSource.data[0] = parent;
              this.dataSource.data.splice(1, current.length, ...current);
              this.dataSource.dataChange.next(this.dataSource.data);
              //this.treeControl.expand(parent);
            }

          } else {
            console.log(result);
          }
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
}
