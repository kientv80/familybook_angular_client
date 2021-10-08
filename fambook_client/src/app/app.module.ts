import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { FambookLayoutComponent } from './layouts/fambook-layout/fambook-layout.component';
import { FambookLayoutModule } from './layouts/fambook-layout/fambook-layout.module';
import { FammembersComponent } from './fammembers/fammembers.component';
import { RelationrequestComponent } from './relationrequest/relationrequest.component';
import { ProfileComponent } from './profile/profile.component';
import { RelationComponent } from './relation/relation.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        FambookLayoutModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        FambookLayoutComponent,
        
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
