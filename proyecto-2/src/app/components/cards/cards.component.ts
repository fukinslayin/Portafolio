import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../interfaces/character.interface';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, CardComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() items: Character[] = [];
  @Input() getImageUrl: (item: Character) => string = () => '';
}
