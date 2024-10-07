import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-navbar',
  standalone: true,
  imports: [TabMenuModule, ButtonModule, MenubarModule],
  templateUrl: './characters-navbar.component.html',
})
export class CharactersNavbarComponent implements OnInit {
  items: MenuItem[] = [];
  username: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verifica si está autenticado
    this.authService.isLoggedIn().subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      this.username = this.authService.getUserDisplayName();
      this.menuItems();
    });
  }

  menuItems(): void {
    this.items = [
      {
        label: 'Acerca',
        icon: 'pi pi-fw pi-question-circle',
        routerLink: '/about',
      },
      {
        label: 'Personajes',
        icon: 'pi pi-fw pi-face-smile',
        routerLink: '/characters',
      },
    ];

    if (!this.isLoggedIn) {
      this.items = [
        ...this.items,
        {
          label: 'Iniciar Sesión',
          icon: 'pi pi-fw pi-user',
          routerLink: '/login',
        },
      ];
    } else {
      this.items = [
        ...this.items,
        {
          label: 'Favoritos',
          icon: 'pi pi-fw pi-star',
          routerLink: '/favorites',
        },
        {
          label: this.username || 'Usuario',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'Cerrar Sesión',
              icon: 'pi pi-fw pi-sign-out',
              command: () => this.logout(),
            },
          ],
        },
      ];
    }
  }

  public async logout() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('No se ha podido salir', error);
    }
  }
}
