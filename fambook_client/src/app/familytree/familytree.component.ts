import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FamBookService } from 'app/fam-book.service';
import { Person } from 'app/schema/person';
import { UtilsService } from 'app/utils.service';
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

  constructor(private famservice: FamBookService, private util: UtilsService) {
  }

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<Person>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.famservice);
    this.famservice.getMyFamilyTree().subscribe({
      next: result => {
        let persons: Person[] = [];
        var root = result.data;
        root.level = 0;
        persons[0] = root;
        this.dataSource.data = persons;
        this.treeControl.expand(root);
      }
    });;
  }


  getLevel = (node: Person) => node.level;

  isExpandable = (node: Person): boolean | undefined => {
    return true;
  }

  hasChild = (_: number, _nodeData: Person) => true;

  loadParent(childId: number): void {
    this.dataSource.addParent(childId);
  }
  openInsideLink(url : string): void {
    this.util.openInsideLink(url);
  }
}
