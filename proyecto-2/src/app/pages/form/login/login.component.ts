import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from 'firebase/auth';
import { AuthCredentials } from '../../../interfaces/auth-credentials.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../services/message.service';
import { FormNavbarComponent } from '../../../components/shared/navbars/form-navbar/form-navbar.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    StyleClassModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    FormsModule,
    FormNavbarComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class MainFormComponent {
  credentials: AuthCredentials = {
    email: '',
    password: '',
  };
  user: User | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  public async signInWithGoogle(event: Event): Promise<void> {
    event.preventDefault();
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/characters']);
    } catch (error) {
      this.alertService.showMessage(
        'No se ha podido iniciar sesion, intentelo más tarde o compruebe sus datos'
      );
    }
  }

  public async onLogin(event: Event): Promise<void> {
    event.preventDefault();
    try {
      await this.authService.signInWithEmail(this.credentials);
      this.router.navigate(['/characters']);
    } catch (error) {
      this.alertService.showMessage(
        'Datos incorrectos o no se encontró la cuenta.',
        'warn'
      );
    }
  }
}
