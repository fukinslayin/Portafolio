import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { Character, CharacterUrl } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { StarWarsApiService } from '../../services/starwars.api.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-custom-overlay',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './custom-overlay.component.html',
  styleUrl: './custom-overlay.component.scss',
})
export class CustomOverlayComponent {
  @Input() character: Character | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private starWars: StarWarsApiService) {}

  public get isVisible(): boolean {
    return !!this.character;
  }

  public closeOverlay() {
    this.character = null;
    this.close.emit();
  }

  public getImageUrl(character: CharacterUrl) {
    const id = this.idCharacter(character.url);
    return `${this.starWars.imageBaseUrl}${id}.jpg`;
  }

  public idCharacter(url: string): string {
    const part = url.split('/');
    return part[part.length - 2];
  }
}
