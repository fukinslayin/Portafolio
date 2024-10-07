import { Routes, provideRouter, withHashLocation } from '@angular/router';
import { MainFormComponent } from './pages/form/login/login.component';
import { RegisterFormComponent } from './pages/form/register/registerform.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { AboutComponent } from './pages/about/about.component';
import { ForgotPasswordComponent } from './pages/form/forgot-password/forgot-password.component';
import { TheCharactersComponent } from './pages/the-characters/the-characters.component';
import { authGuard } from './guards/auth.guard';
import { formGuard } from './guards/form.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: 'characters', component: TheCharactersComponent },
  {
    path: 'favorites',
    component: CharactersComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: MainFormComponent, canActivate: [loginGuard] },
  {
    path: 'register',
    component: RegisterFormComponent,
    canActivate: [loginGuard],
    canDeactivate: [formGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'characters' },
  { path: '**', pathMatch: 'full', redirectTo: 'characters' },
];

export const appRouting = [provideRouter(routes, withHashLocation())];
