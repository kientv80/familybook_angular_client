import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  type: string = "feed";
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
  }
}
