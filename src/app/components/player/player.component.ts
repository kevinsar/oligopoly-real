import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ViewEncapsulation, TemplateRef } from '@angular/core';
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
  trash: Card[] = [];

  constructor(private gameStateService: GameStateService, private dialog: MatDialog) {
    this.gameStateService.startGame();
    this.gameStateService.addPlayer(this.player);
    this.gameStateService.getGameState().subscribe((state: GameState) => {
      console.log(state);
      this.player = state.players.find((player: Player) => {
        return player.id === this.player.id;
      });

      this.trash = state.trash;
    });
  }

  ngOnInit(): void {}

  drawTwoCards() {
    this.handCardOffset = 0;
    this.gameStateService.drawCards(this.player.id, 2);

    this.spreadHand(false);
    window.setTimeout(() => {
      this.spreadHand();
    }, 500);
  }

  drawFiveCards() {
    this.handCardOffset = 0;
    this.gameStateService.drawCards(this.player.id, 5);

    this.spreadHand(false);
    window.setTimeout(() => {
      this.spreadHand();
    }, 500);
  }

  cardActionHandler(card: Card, action: CardAction) {
    switch (action) {
      case CardAction.PLAY:
        this.playCard(card);
        break;
      case CardAction.BANK:
        this.addToBank(card);
        break;
      case CardAction.BUILD:
        this.buildLand(card, 0);
        break;
      case CardAction.TRASH:
        this.addToTrash(card);
        break;
      case CardAction.PAY:
        // code block
        break;
      case CardAction.MOVE:
        // code block
        break;
      default:
    }
  }

  buildLand(card: Card, lot?: number) {
    this.gameStateService.buildProperty(this.player.id, card, lot);
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
  }

  payPlayer() {}

  spreadHand(spreadHand?: boolean) {
    this.isHandSpread = spreadHand || !this.isHandSpread;

    if (this.isHandSpread) {
      this.handCardOffset = 0;
      this.raisedCardIndex = -1;
    } else {
      this.setHandOffset();
    }
  }

  setHandOffset() {
    this.raisedCardIndex = -1;

    window.setTimeout(() => {
      const handWidth = this.handContainer.nativeElement.getBoundingClientRect().width;
      const scrollerWidth = this.handContainer.nativeElement.querySelector('.hand-container-scroller').scrollWidth;
      const offset = (scrollerWidth - handWidth) / (this.player.hand.length - 1);

      if (offset > 0) {
        this.handCardOffset = offset;
      } else {
        this.handCardOffset = 0;
      }
    }, 100);
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
