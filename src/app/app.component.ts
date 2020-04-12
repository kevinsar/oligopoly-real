import { Component } from '@angular/core';
import { deck } from '../app/data/deck';

@Component({
  selector: 'or-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'oligopoly-real';
  cards = deck;
  constructor() {
    console.log(this.cards);
    console.log(this.cards.length);
  }
}
