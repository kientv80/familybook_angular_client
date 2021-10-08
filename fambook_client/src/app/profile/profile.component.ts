import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamBookService } from 'app/fam-book.service';
import { Person } from 'app/schema/person';
import { Result } from 'app/schema/result';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() editpperson: Person;
  @Input() addNew: boolean = false;
  @Output() profileEvent = new EventEmitter<Result<any>>();
  image: File[];
  fileName: string;
  

  constructor(private fbservice : FamBookService) { }

  ngOnInit(): void {
  }


  save(): void {
    const formData = new FormData();
    if (this.image !== undefined && this.image.length > 0)
      formData.append("image", this.image[0]);
    formData.append("profile", JSON.stringify(this.editpperson));
    
    if (!this.addNew) {
      this.fbservice.postUpdateProfile(formData).subscribe({
        next: result => {
          if (result.errorCode === 0) {
            this.clearSelect();
            this.close();
            console.log(result.mgs);
          } else {
            console.log(result);
          }
          this.profileEvent.emit(result);
        },
        error: error => {
          console.log(error);
          this.profileEvent.emit(new Result(-1,"faile"));
        }
      });
    } else {
      this.fbservice.postAddProfile(formData).subscribe({
        next: result => {
          if (result.errorCode === 0) {
            this.clearSelect();
            this.close();
            this.addNew = false;
            console.log(result.mgs);
          } else {
            console.log(result);
          }
          this.profileEvent.emit(result);
        },
        error: error => {
          console.log(error);
          this.profileEvent.emit(new Result(-1,"faile"));
        }
      });
    }

  }
  close(): void {
    this.editpperson = undefined;
    this.fileName = undefined;
    this.image = undefined;
    this.profileEvent.emit(new Result(0,"closed"));
  }
  onFileSelected(event): void {
    this.image = event.target.files;
    this.fileName = this.image[0].name;
  }
  clearSelect(): void {
    this.image = undefined;
    this.fileName = "";
  }
}
