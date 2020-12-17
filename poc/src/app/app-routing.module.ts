import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  // Landing page.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pre-login/login').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./pre-login/signup').then(m => m.SignupModule) },
  // Applied auth guard on dashboard.
  { path: 'dashboard', loadChildren: () => import('./post-login/dashboard').then(m => m.DashboardModule), canActivate:[AuthGuardService] },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
