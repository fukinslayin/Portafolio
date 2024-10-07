import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FormNavbarComponent } from '../../../components/shared/navbars/form-navbar/form-navbar.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AlertService } from '../../../services/message.service';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    FormNavbarComponent,
    FooterComponent,
    RouterModule,
  ],
  encapsulation: ViewEncapsulation.None,

  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public get email() {
    return this.form.get('email');
  }

  public async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    try {
      const { email } = this.form.value;
      await this.authService.sendPasswordResetEmail(email);
      this.alertService.showMessage(
        'Si existe una cuenta con ese email, se enviará un enlace para restablecer la contraseña.',
        'success'
      );
      this.router.navigate(['/login']);
    } catch (error) {
      this.alertService.showMessage(
        'Error al enviar el email de restablecimiento',
        'warn'
      );
    }
  }
}
