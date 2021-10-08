import { Routes } from "@angular/router";
import { FamilytreeComponent } from "app/familytree/familytree.component";
import { FammembersComponent } from "app/fammembers/fammembers.component";
import { FeedComponent } from "app/feed/feed.component";
import { RelationrequestComponent } from "app/relationrequest/relationrequest.component";
import { TimelineComponent } from "app/timeline/timeline.component";

export const FambookRoutes: Routes = [
    { path: 'timeline/:id', component: TimelineComponent },
    { path: 'feed/:id', component: FeedComponent },
    { path: 'farmily', component: FamilytreeComponent },
    { path: 'fammembers', component: FammembersComponent },
    { path: 'relationrequest', component: RelationrequestComponent },
];