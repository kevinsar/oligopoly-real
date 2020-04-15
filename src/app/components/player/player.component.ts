import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Card, Property } from 'src/app/models/card.model';
import { GameStateService } from 'src/app/services/game-state.service';
import { GameState } from 'src/app/models/game-state.model';
import { Player } from 'src/app/models/player.model';
import { CardAction } from 'src/app/enums/card-action.enum';
import { MatDialog } from '@angular/material/dialog';
import { CardLocation } from 'src/app/enums/card-location.enum';

@Component({
  selector: 'or-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerComponent implements OnInit {
  @ViewChild('handContainer') handContainer: ElementRef;
  CardLocation = CardLocation;
  gameState: GameState;
  player: Player = {
    id: 0,
    name: 'Kevin',
    hand: [],
    land: [[], [], [], [], []],
    bank: []
  };
  handCardOffset = 0;
  raisedCardIndex = -1;
  isHandSpread = false;

  constructor(private gameStateService: GameStateService, private dialog: MatDialog) {
    this.gameStateService.startGame();
    this.gameStateService.addPlayer(this.player);
    this.gameStateService.getGameState().subscribe((state: GameState) => {
      console.clear();
      console.log(JSON.stringify(state));
      this.gameState = state;
      this.player = this.gameState.players.find((player: Player) => {
        return player.id === this.player.id;
      });
    });
  }

  addFakePlayer() {
    this.player = {
      id: new Date().getTime(),
      name: new Date().getTime() + '',
      hand: [],
      land: [[], [], [], [], []],
      bank: []
    };

    this.gameStateService.addPlayer(this.player);
  }

  ngOnInit(): void {}

  handClickHandler(forceCompactHand?: boolean) {
    if (forceCompactHand || this.isHandSpread) {
      this.compactHand();
      this.isHandSpread = false;
    } else {
      this.spreadHand();
      this.isHandSpread = true;
    }
  }

  drawTwoCards() {
    this.handCardOffset = 0;
    this.gameStateService.drawCards(this.player.id, 2);

    this.handClickHandler(true);
  }

  drawFiveCards() {
    this.handCardOffset = 0;
    this.gameStateService.drawCards(this.player.id, 5);

    this.handClickHandler(true);
  }

  cardActionHandler(card: Card, action: CardAction) {
    switch (action) {
      case CardAction.PLAY:
        this.playCard(card);
        break;
      case CardAction.BANK:
        this.addToBank(card);
        break;
      case CardAction.TRASH:
        this.addToTrash(card);
        break;
      case CardAction.PAY:
        // code block
        break;
      default:
    }

    this.handClickHandler(true);
  }

  buildLand(card: Card, lot?: number) {
    this.gameStateService.buildProperty(this.player.id, card, lot);
    this.handClickHandler(true);
  }

  addToBank(card: Card) {
    this.gameStateService.addToBank(this.player.id, card);
  }

  playCard(card: Card) {
    this.gameStateService.addToPlayed(this.player.id, card);
  }

  addToTrash(card: Card) {
    this.gameStateService.addToTrash(this.player.id, card);
  }

  sortWildCardProperty(card: Card, property: Property) {
    this.gameStateService.setWildCardColor(this.player.id, card, property);
    this.handClickHandler(true);
  }

  payPlayer() {}

  spreadHand() {
    this.raisedCardIndex = -1;
    this.handCardOffset = 0;
  }

  compactHand() {
    this.raisedCardIndex = -1;

    const handWidth = this.player.hand.length * 252;
    const scrollerWidth = this.handContainer.nativeElement.querySelector('.hand-container-scroller').getBoundingClientRect().width;
    const offset = (handWidth - scrollerWidth) / (this.player.hand.length - 1);

    if (offset > 0) {
      this.handCardOffset = offset;
    } else {
      this.handCardOffset = 0;
    }
  }

  setRaisedCard(cardIndex: number, event) {
    if (!event.target.classList.contains('mat-icon')) {
      if (this.raisedCardIndex === cardIndex) {
        this.raisedCardIndex = -1;
      } else {
        this.raisedCardIndex = cardIndex;
      }
    }
  }

  viewTrash(trashContainer: TemplateRef<any>) {
    this.viewBank(trashContainer);
  }

  viewBank(bankContainer: TemplateRef<any>) {
    this.dialog.open(bankContainer, {});
  }

  get bankBalance() {
    let bankBalance = 0;
    this.player.bank.forEach((card: Card) => {
      bankBalance += card.value;
    });

    return bankBalance;
  }
}
