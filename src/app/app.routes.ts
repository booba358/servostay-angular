import { Routes } from '@angular/router';
import { LoginComponent } from './modules/traveler/login/login.component';
import { SignupComponent } from './modules/traveler/signup/signup.component';
import { DashboardComponent } from './modules/traveler/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: 'traveler/sign-in', component: LoginComponent },
    { path: 'traveler/sign-up', component: SignupComponent, canActivate: [authGuard]},
    { path: 'traveler/dashboard', component: DashboardComponent, canActivate: [authGuard]},
];
