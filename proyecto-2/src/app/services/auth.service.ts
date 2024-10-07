import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { AuthCredentials } from '../interfaces/auth-credentials.interface';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  constructor(private auth: Auth) {
    //Observa estado de autenticacion
    this.observeAuthState();
  }

  private observeAuthState(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.updateAuthenticationState(user);
    });
  }

  private updateAuthenticationState(user: User | null): void {
    this.userSubject.next(user);
    this.isAuthenticatedSubject.next(!!user);
  }

  private handleError(operation: string, error: any): void {
    console.error(`Error en ${operation}`, error);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  public async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
      this.isAuthenticatedSubject.next(true);
    } catch (error) {
      this.handleError('inicio de sesión con Google', error);
      throw error;
    }
  }

  public async signInWithEmail(credentials: AuthCredentials): Promise<void> {
    try {
      await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );
      this.isAuthenticatedSubject.next(true);
    } catch (error) {
      this.handleError('inicio de sesión con email', error);
      throw error;
    }
  }

  public async registerWithEmail(
    credentials: AuthCredentials,
    username: string
  ): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;

      // se actualiza el perfil del usuario con el nombre de usuario
      await updateProfile(user, { displayName: username });

      this.userSubject.next(user);
      this.isAuthenticatedSubject.next(false);
    } catch (error) {
      this.handleError('registro con email', error);
      throw error;
    }
  }
  public async sendPasswordResetEmail(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      this.handleError('envío de correo de restablecimiento', error);
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.isAuthenticatedSubject.next(false);
    } catch (error) {
      this.handleError('cierre de sesión', error);
      throw error;
    }
  }

  public getUserDisplayName(): string | null {
    const user = this.userSubject.value;
    return user?.displayName ?? null;
  }

  public getUserId(): string | null {
    const user = this.userSubject.value;
    return user?.uid ?? null;
  }
}
