import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { FormService } from '../../../services/form.service';
import { AlertService } from '../../../services/message.service';
import { FormNavbarComponent } from '../../../components/shared/navbars/form-navbar/form-navbar.component';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StyleClassModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    FormNavbarComponent,
  ],
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss'],
})
export class RegisterFormComponent {
  user: User | null = null;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private formService: FormService,
    private alertService: AlertService
  ) {
    this.createForm();
    this.formService.registerForm('registerForm', this.form);
  }

  public get username() {
    return this.form.get('username');
  }

  public get email() {
    return this.form.get('mail');
  }

  public get password() {
    return this.form.get('password');
  }

  public get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  public get invalidEmail() {
    return this.form.get('mail')?.invalid && this.form.get('mail')?.touched;
  }

  public get passwordinvalid() {
    return (
      this.form.get('password')?.invalid && this.form.get('password')?.touched
    );
  }

  public get confirmPasswordinvalid() {
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    return password !== confirmPassword;
  }

  public createForm() {
    this.form = this.fb.group(
      {
        username: ['', Validators.required],
        mail: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  public passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  }

  public async onRegister(event: Event) {
    event.preventDefault();
    if (this.form.invalid) {
      return;
    }
    try {
      const { username, mail, password } = this.form.value;
      await this.authService.registerWithEmail(
        { email: mail, password },
        username
      );
      this.alertService.showMessage(
        'Registro exitoso. Por favor, inicia sesión.',
        'success'
      );
      this.router.navigate(['/characters']);
    } catch (error) {
      this.alertService.showMessage('No se pudo registrar', 'warn');
    }
  }

  save() {}
}
