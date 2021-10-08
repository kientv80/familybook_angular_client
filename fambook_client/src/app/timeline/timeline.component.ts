import { collectExternalReferences } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamBookService } from 'app/fam-book.service';
import { Comment } from 'app/schema/comment';
import { Feed } from 'app/schema/feed';
import { Result } from 'app/schema/result';
import { UtilsService } from 'app/utils.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  feeds: Feed[];
  result: Result<Feed[]>;
  id: number = undefined;
  newComments: string[] = [];
  newFeedContent: string;
  image: File[];
  fileName: string = "";
  @Input() type: String;

  constructor(private route: ActivatedRoute, private fambookservice: FamBookService, private utils: UtilsService) { }

  ngOnInit(): void {
    this.loadFeeds();
    this.route.url.subscribe(url => {
      this.loadFeeds();
    });
  }
  loadFeeds() {

    if (this.route.snapshot.paramMap.get('id') !== undefined)
      this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id === undefined || this.id === 0)
      this.id = 2;

    console.log(this.id);

    if (this.type === "feed") {
      this.fambookservice.getFeeds(this.id).subscribe({
        next: result => {
          if (result.errorCode == 0) {
            this.feeds = result.data;
          } else {
            console.log(result)
          }
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      this.fambookservice.getTimelineFeeds(this.id).subscribe({
        next: result => {
          if (result.errorCode == 0) {
            this.feeds = result.data;
          } else {
            console.log(result)
          }
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
  openLink(url: string): void {
    this.utils.openLink(url);
  }
  showComments(feedId: number): void {
    this.fambookservice.getComments(feedId).subscribe({
      next: result => {
        if (result.errorCode == 0) {
          if (result.data != undefined && result.data.length > 0) {
            let findex = this.feeds.findIndex(f => f.id === feedId);
            this.feeds[findex].comments = result.data;
          }
        } else {
          console.log(result)
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  submitComment(id: number): void {
    var comment = new Comment();
    comment.feedId = id;
    comment.comment = this.newComments[id];
    if (comment.comment.endsWith("\n")) {
      comment.comment = comment.comment.substring(0, comment.comment.length - 1);
    }
    this.fambookservice.postComment(comment).subscribe({
      next: result => {
        if (result.errorCode === 0) {
          let findex = this.feeds.findIndex(f => f.id === id);
          if (this.feeds[findex].comments === undefined) {
            this.showComments(id);
          } else {
            this.feeds[findex].comments.push(result.data);
          }
          this.feeds[findex].commentCount = this.feeds[findex].commentCount + 1;
          this.newComments[id] = "";
        } else {
          console.log(result);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
  reply(feedId: number, cmtId: number, profileName: string): void {
    this.newComments[feedId] = profileName + " ";
    window.document.getElementById("cmt_" + feedId).focus();
  }
  like(feedId: number): void {
    this.fambookservice.postLike(feedId + "").subscribe({
      next: result => {
        if (result.errorCode == 0) {
          let index = this.feeds.findIndex(feed => feed.id === feedId);
          this.feeds[index].likeCount = this.feeds[index].likeCount + 1;
          window.document.getElementById("like_" + feedId).textContent = "Liked";
        } else {
          console.log(result);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  postFeed(): void {
    this.fambookservice.postFeed(this.newFeedContent, this.image).subscribe({
      next: result => {
        if (result.errorCode == 0) {
          this.newFeedContent = "";
          this.feeds.unshift(result.data);
          this.fileName = "";
          this.image = null;
        } else {
          console.log(result);
          alert(result.mgs);
        }
      },
      error: error => {
        console.log(error);
      }
    });

  }
  onFileSelected(event): void {
    this.image = event.target.files;
    this.fileName = this.image[0].name;
  }
  clickMe() {
    alert(this.type);
  }
}
