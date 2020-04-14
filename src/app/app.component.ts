import { Component } from '@angular/core';
import { Card } from './models/card.model';
import { Player } from './models/player.model';

@Component({
  selector: 'or-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'oligopoly-real';
  deck: Card[] = [];
  player: Player;
}
