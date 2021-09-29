import { Routes } from "@angular/router";
import { FamilytreeComponent } from "app/familytree/familytree.component";
import { TimelineComponent } from "app/timeline/timeline.component";

export const FambookRoutes: Routes = [
    { path: 'feed',      component: TimelineComponent },
    { path: 'farmily',      component: FamilytreeComponent },
];