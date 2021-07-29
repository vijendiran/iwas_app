import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginformComponent } from './login/loginform/loginform.component';
import { CreateMemberComponent } from './member/create-member/create-member.component';
import { ViewMemberComponent } from './member/view-member/view-member/view-member.component';
import { CreateSubscriptionComponent } from './subscription/create-subscription/create-subscription/create-subscription.component';
import { ViewSubscriptionComponent } from './subscription/view-subscription/view-subscription/view-subscription.component';
import { ToggleComponent } from './toggle/toggle/toggle.component';

const routes: Routes = [
  {path:'',component:LoginformComponent},
  {path: 'create-member',component: CreateMemberComponent},
  {path: 'create-subscription',component: CreateSubscriptionComponent},
  {path:'view-subscription',component:ViewSubscriptionComponent,canActivate:[AuthGuard]},
  {path:'view-member',component:ViewMemberComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path: '**', redirectTo: ''}   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
