import { Component, OnInit, Input, SimpleChanges, OnChanges, TemplateRef } from '@angular/core';
import { GameState } from 'src/app/models/game-state.model';
import { Player } from 'src/app/models/player.model';
import { Card } from 'src/app/models/card.model';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'or-opponents-view',
  templateUrl: './opponents-view.component.html',
  styleUrls: ['./opponents-view.component.scss']
})
export class OpponentsViewComponent implements OnInit, OnChanges {
  CardLocation = CardLocation;
  @Input() activePlayer: Player;
  @Input() gameState: GameState;
  opponents: Player[];
  bankToView: Card[] = [];
  landToView: Card[][] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getOpponentStates();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    // if (changes.gameState) {
    this.getOpponentStates();
    // }
  }

  getOpponentStates() {
    this.opponents = this.gameState.players.filter((player: Player) => {
      return player.id !== this.activePlayer.id;
    });
  }

  setBankToView(cards: Card[]) {
    this.bankToView = cards;
  }

  setLandToView(land: Card[][]) {
    this.landToView = land;
  }

  openDialog(cardContainer: TemplateRef<any>) {
    this.dialog.open(cardContainer, {
      maxHeight: '80%'
    });
  }

  getBankBalance(cards: Card[]) {
    let amount = 0;

    cards.forEach((card: Card) => {
      amount += card.value;
    });

    return `$${amount}`;
  }
}
