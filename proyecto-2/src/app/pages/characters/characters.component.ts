import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardsComponent } from '../../components/cards/cards.component';
import { StarWarsApiService } from '../../services/starwars.api.service';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Character, CharacterUrl } from '../../interfaces/character.interface';
import { CharactersNavbarComponent } from '../../components/shared/navbars/characters-navbar/characters-navbar.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { Pagination } from '../../interfaces/paginator.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    ButtonModule,
    CardsComponent,
    PaginationComponent,
    ProgressSpinnerModule,
    CommonModule,
    CardModule,
    CharactersNavbarComponent,
    FooterComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  loading: boolean = false;
  messageError: string = '';
  characters: Character[] = [];

  first: number = 0;
  rows: number = 6; // Número de personajes por página
  totalRecords: number = 0;
  currentPage: number = 1;
  totalPages: number = 9;

  constructor(
    private starWars: StarWarsApiService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
  }
  private loadCharacters() {
    if (!this.favoritesService.hasFavorites()) {
      this.loading = false;
    } else {
      this.loading = true;
    }
    this.favoritesService.getFavorites(this.currentPage, this.rows).subscribe({
      next: (favorites: Character[]) => {
        if (favorites && favorites.length > 0) {
          this.characters = favorites;
          this.totalRecords = this.favoritesService.totalRecords;
        } else {
          this.characters = [];
        }
        this.loading = false;
      },
      error: (errService: Error) => {
        this.loading = false;
        console.error('error en la petición', errService);
      },
    });
  }

  public onPageChange(event: Pagination) {
    this.first = event.first;
    this.currentPage = event.page + 1;
    this.loadCharacters();
  }

  public getImageUrl(character: CharacterUrl) {
    const id = character.charactersId;
    return `${this.starWars.imageBaseUrl}${id}.jpg`;
  }
}
