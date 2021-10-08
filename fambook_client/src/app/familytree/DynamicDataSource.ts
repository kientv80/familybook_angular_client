import { CollectionViewer, DataSource, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { FamBookService } from "app/fam-book.service";
import { Person } from "app/schema/person";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";


/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DynamicDataSource implements DataSource<Person> {

    dataChange = new BehaviorSubject<Person[]>([]);

    get data(): Person[] {
        return this.dataChange.value;
    }
    set data(value: Person[]) {
        this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(public _treeControl: FlatTreeControl<Person>, private famservice: FamBookService) { }

    connect(collectionViewer: CollectionViewer): Observable<Person[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if ((change as SelectionChange<Person>).added ||
                (change as SelectionChange<Person>).removed) {
                this.handleTreeControl(change as SelectionChange<Person>);
            }
        });
        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    disconnect(collectionViewer: CollectionViewer): void { }

    /** Handle expand/collapse behaviors */
    handleTreeControl(change: SelectionChange<Person>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
        }
    }

    /**
     * Toggle the node, remove from display list
     */
    toggleNode(node: Person, expand: boolean) {
        if (node !== undefined && node.children === undefined) {
            this.famservice.getChildren(node.id).subscribe({
                next: result => {
                    if (result.errorCode == 0) {
                        node.children = result.data;
                        this.processtoggleNode(node, expand);
                    } else {
                        console.log(result);
                    }
                },
                error: error => {
                    console.log(error);
                }
            });
        } else {
            this.processtoggleNode(node, expand);
        }

    }
    processtoggleNode(node: Person, expand: boolean): void {
        node.isLoading = true;
        setTimeout(() => {
            const children: Person[] = [];
            node.children.forEach(c => {
                let flag: boolean = false;
                this.data.forEach(item => {
                    if (item.id === c.id) {
                        flag = true;
                    }
                });
                if (!flag)
                    children.push(c);
            });

            const index = this.data.indexOf(node);
            if (!children || index < 0) { // If no children, or cannot find the node, no op
                return;
            }
            if (expand) {
                children.map(person => {
                    if (node.level == undefined)
                        node.level = 1;
                    person.level = node.level + 1;
                });
                const nodes = children;
                this.data.splice(index + 1, 0, ...nodes);
            } else {
                let count = 0;
                for (let i = index + 1; i < this.data.length
                    && this.data[i].level > node.level; i++, count++) { }
                this.data.splice(index + 1, count);
            }

            // notify the change
            this.dataChange.next(this.data);
            node.isLoading = false;
        }, 1000);
    }
    addParent(childId: number): void {
        let index = this.data.findIndex(person => person.id === childId)
        if (index >= 0) {
            let child: Person = this.data[index];
            this.famservice.getParent(childId).subscribe({
                next: result => {
                    child.isLoading = true;
                    setTimeout(() => {
                        if (result.errorCode === 0 && result.data !== undefined) {
                            let parent: Person = result.data;
                            if (parent.children != undefined) {
                                parent.level = child.level;
                                this.data.map(c => {
                                    c.level = c.level + 1;
                                });
                                let current = this.data;
                                this.data = [];
                                this.data[0] = parent;
                                this.data.splice(1, current.length, ...current);
                                // notify the change
                                this.dataChange.next(this.data);
                                //this.treeControl.expand(parent);
                            }

                        } else if (result.errorCode !== 0) {
                            console.log(result);
                        }
                        child.isLoading = false;
                    }, 1000);
                },
                error: error => {
                    console.log(error);
                }
            });
        }
    }
}