import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FambookRoutes } from './fambook.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { TimelineComponent } from 'app/timeline/timeline.component';
import { FamilytreeComponent } from 'app/familytree/familytree.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    TimelineComponent,
    FamilytreeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FambookRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSelectModule,
    MatTooltipModule,
    YouTubePlayerModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class FambookLayoutModule { }
