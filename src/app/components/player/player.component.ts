import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { GameStateService } from 'src/app/services/game-state.service';
import { GameState } from 'src/app/models/game-state.model';
import { Player } from 'src/app/models/player.model';
import { CardAction } from 'src/app/enums/card-action.enum';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'or-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerComponent implements OnInit {
  @ViewChild('handContainer') handContainer: ElementRef;
  player: Player = {
    id: 0,
    name: 'Kevin',
    hand: [],
    land: [[], [], [], [], []],
    bank: []
  };
  handCardOffset = 0;
  raisedCardIndex = -1;
  isHandSpread = true;
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

  ngOnInit(): void {
  }

  drawTwoCards() {
    this.handCardOffset = 0;
    this.gameStateService.drawCards(this.player.id, 2);

    this.setHandOffset();
  }

  drawFiveCards() {
    this.handCardOffset = 0;
    this.gameStateService.drawCards(this.player.id, 5);

    this.setHandOffset();
  }
  
  cardActionHandler(card: Card, action: CardAction) {
    console.log(action, card);
    switch(action) {
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
      case CardAction.FLIP:
        this.flipCard(card);
        break;
      default:
    }
  }

  buildLand(card: Card, lot?: number) {
    this.gameStateService.buildProperty(this.player.id, card, lot);
  }

  flipCard(card: Card) {
    this.gameStateService.flipWildCard(this.player.id, card);
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

  payPlayer() {
    
  }

  spreadHand(spreadHand?: boolean) {
    this.isHandSpread = spreadHand || !this.isHandSpread;

    if (this.isHandSpread) {
      this.setHandOffset();
    } else {
      this.handCardOffset = 0;
      this.raisedCardIndex = -1;
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
    this.dialog.open(bankContainer, {

    });
  }

  get bankBalance() {
    let bankBalance = 0;
    this.player.bank.forEach((card: Card) => {
      bankBalance += card.value;
    });

    return bankBalance;
  }
}
