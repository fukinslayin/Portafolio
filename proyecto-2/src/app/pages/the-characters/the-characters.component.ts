import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { StarWarsApiService } from '../../services/starwars.api.service';
import { Character, CharacterUrl } from '../../interfaces/character.interface';
import { ApiResponse } from '../../interfaces/response.interface';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { CharactersNavbarComponent } from '../../components/shared/navbars/characters-navbar/characters-navbar.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { InputTextModule } from 'primeng/inputtext';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { RefreshIcon } from 'primeng/icons/refresh';
import { Pagination } from '../../interfaces/paginator.interface';
import { CardsComponent } from '../../components/cards/cards.component';
import { CustomOverlayComponent } from '../../components/custom-overlay/custom-overlay.component';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FavoritesService } from '../../services/favorites.service';
import { AlertService } from '../../services/message.service';

@Component({
  selector: 'app-the-characters',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    RippleModule,
    CharactersNavbarComponent,
    PaginationComponent,
    InputTextModule,
    FooterComponent,
    ButtonModule,
    RefreshIcon,
    CardsComponent,
    CustomOverlayComponent,
    RouterModule,
    ToastModule,
  ],
  templateUrl: './the-characters.component.html',
  styleUrl: './the-characters.component.scss',
})
export class TheCharactersComponent implements OnInit {
  query: string = '';
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  first: number = 0;
  rows: number = 6;
  totalRecords: number = 0;
  currentPage: number = 1;
  totalPages: number = 9;

  constructor(
    private StarWarsApiService: StarWarsApiService,
    private favoritesService: FavoritesService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
  }
  private loadCharacters() {
    this.StarWarsApiService.getCharacters(
      this.currentPage,
      this.rows,
      this.query
    ).subscribe({
      next: async (response: ApiResponse) => {
        this.characters = response.results;
        this.totalRecords = this.totalPages * this.rows;
        for (const character of this.characters) {
          const characterId = this.getCharacterId(character);
          character.isFavorite = await this.favoritesService.isFavorite(
            characterId
          );
        }
      },
      error: (errService) => {
        console.error('Error en la peticion', errService);
      },
    });
  }

  openOverlay(character: Character) {
    this.selectedCharacter = character;
  }

  public onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.query = input.value ?? null;
    this.currentPage = 1;
    this.loadCharacters();
  }

  public onPageChange(event: Pagination) {
    this.first = event.first;
    this.currentPage = event.page + 1;
    this.loadCharacters();
  }

  public getImageUrl(character: CharacterUrl) {
    const id = this.idCharacter(character.url);
    return `${this.StarWarsApiService.imageBaseUrl}${id}.jpg`;
  }

  public idCharacter(url: string): string {
    const part = url.split('/');
    return part[part.length - 2];
  }

  private getCharacterId(character: Character): number {
    const characterIdString = this.idCharacter(character.url);
    return parseInt(characterIdString, 10);
  }

  public async addToFavorites(character: Character) {
    const characterId = this.getCharacterId(character);

    const characterData: Character = { ...character, id: characterId };
    try {
      const exists = await this.favoritesService.isFavorite(characterId);
      if (exists) {
        this.alertService.showMessage(
          'Este personaje ya fue guardado como favorito.'
        );
        return;
      }
      await this.favoritesService.addFavorites(characterData);
      this.alertService.showMessage(
        'Personaje añadido a favoritos!',
        'success'
      );
      character.isFavorite = true;
    } catch (error) {
      this.alertService.showMessage('Error al añadir el personaje', 'warn');
    }
  }

  public async removeToFavorite(character: Character) {
    const characterId = this.getCharacterId(character);
    try {
      await this.favoritesService.removeFavorites(characterId);
      character.isFavorite = false;
    } catch (error) {
      console.error('error al guardar el personaje', error);
    }
  }
}
