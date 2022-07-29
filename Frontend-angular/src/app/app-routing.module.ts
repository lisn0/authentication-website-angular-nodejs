import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
  AuthGuardService as AuthGuard
} from './services/auth/auth-guard.service';
import {IndexComponent} from "./index/index.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {AddEventComponent} from "./add-event/add-event.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginActivate} from "./services/auth/login-guard.service";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetComponent} from "./reset/reset.component";
import {AdminComponent} from "./admin/admin.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import { ForumComponent } from './forum/forum.component';
import { AddpostComponent } from './addpost/addpost.component';
import { ListpostsComponent } from './listposts/listposts.component';
import {EventDetailsComponent} from "./event-details/event-details.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path:'calendar', component:CalendarComponent, canActivate : [AuthGuard]},
  {path:'calendar/add', component:AddEventComponent, canActivate : [AuthGuard]},
  {path:'calendar/event/details/:eventId', component:EventDetailsComponent, canActivate : [AuthGuard]},
  {path:'forum',component:ForumComponent, canActivate : [AuthGuard]},
  {path: 'addpost', component:AddpostComponent, canActivate : [AuthGuard]},
  {path: 'listposts', component:ListpostsComponent, canActivate : [AuthGuard]},
  { path: 'home', component: AppComponent, canActivate : [AuthGuard] },
  { path: 'login', component : LoginComponent, canActivate: [LoginActivate]},
  { path: 'register', component : RegisterComponent, canActivate: [LoginActivate]},
  { path: '', component : IndexComponent, canActivate: [LoginActivate]},
  {path:'forgot', component:ForgotPasswordComponent, canActivate: [LoginActivate]},
  {path:'reset', component:ResetComponent},
  {path:'admin', component:AdminComponent, canActivate : [AuthGuard]},
  {path:'edituser/:id', component:EditUserComponent, canActivate : [AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate : [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
