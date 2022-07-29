import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FooterComponent } from './footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { EventBoxComponent } from './event-box/event-box.component';
import { AddEventComponent } from './add-event/add-event.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EventDetailsComponent } from './event-details/event-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ForumComponent } from './forum/forum.component';
import { AddpostComponent } from './addpost/addpost.component';
import { ListpostsComponent } from './listposts/listposts.component';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import { LoginComponent } from './login/login.component';
import {RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetComponent } from './reset/reset.component';
import { AdminComponent } from './admin/admin.component';
import {EditUserComponent} from "./edit-user/edit-user.component";
import {AuthService} from "./services/auth/auth.service";
import {AuthInterceptor} from "./interceptors/auth-interceptor";
import { RootComponent } from './root/root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    CalendarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    RootComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetComponent,
    AdminComponent,
    EditUserComponent,
    EventBoxComponent,
    AddEventComponent,
    EventDetailsComponent,
    ForumComponent,
    AddpostComponent,
    ListpostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    PickerModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
