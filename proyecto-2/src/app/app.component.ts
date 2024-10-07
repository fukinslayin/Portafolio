import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { MainFormComponent } from './pages/form/login/login.component';
import { RegisterFormComponent } from './pages/form/register/registerform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CharactersNavbarComponent } from './components/shared/navbars/characters-navbar/characters-navbar.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CharactersComponent,
    MainFormComponent,
    RegisterFormComponent,
    ReactiveFormsModule,
    CharactersNavbarComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'starwars';
}
