import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, TemplateRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Card, Property } from 'src/app/models/card.model';
import { GameStateService } from 'src/app/services/game-state.service';
import { GameState } from 'src/app/models/game-state.model';
import { Player } from 'src/app/models/player.model';
import { CardAction } from 'src/app/enums/card-action.enum';
import { MatDialog } from '@angular/material/dialog';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'or-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('handContainer') handContainer: ElementRef;
  @ViewChild('unassignedContainer') unassignedContainer: TemplateRef<any>;
  CardLocation = CardLocation;
  gameState: GameState;
  player: Player = {
    id: 0,
    name: 'Kevin',
    hand: [],
    land: [[], [], [], [], []],
    bank: [],
    unAssigned: []
  };
  handCardOffset = 0;
  raisedCardIndex = -1;
  isHandSpread = false;

  constructor(private gameStateService: GameStateService, private dialog: MatDialog, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.player.id = parseInt(window.localStorage.getItem('userId'), 10);
    this.route.data.subscribe((params: any) => {
      this.gameStateService.setGameState(params.gameState);
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.handContainer);
    this.gameStateService.getGameState().subscribe((state: GameState) => {
      console.log(state);
      this.gameState = state;
      this.player = this.gameState.players.find((player: Player) => {
        return player.id === this.player.id;
      });

      console.log(this.player);
      if (this.player.unAssigned.length > 0) {
        this.openDialog(this.unassignedContainer);
      } else {
        this.dialog.closeAll();
      }
      this.handClickHandler(true);
      this.cdr.detectChanges();
    });
  }

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

  spreadHand() {
    this.raisedCardIndex = -1;
    this.handCardOffset = 0;
  }

  compactHand() {
    console.log(this.player?.hand.length > 0, this.handContainer.nativeElement.querySelector('.hand-container-scroller'));
    if (this.player?.hand.length > 0 && this.handContainer?.nativeElement.querySelector('.hand-container-scroller')) {
      console.log(this.handContainer.nativeElement.querySelector('.hand-container-scroller').getBoundingClientRect().width);
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
  }

  setRaisedCard(cardIndex: number, event) {
    if (!event.target.classList.contains('mat-icon') && !this.isHandSpread) {
      if (this.raisedCardIndex === cardIndex) {
        this.raisedCardIndex = -1;
      } else {
        this.raisedCardIndex = cardIndex;
      }
    }
  }

  viewTrash(trashContainer: TemplateRef<any>) {
    this.openDialog(trashContainer);
  }

  openDialog(dialogContainer: TemplateRef<any>) {
    this.dialog.open(dialogContainer, {});
  }

  payPlayerHandler(payEvent: { player: Player; cardLocation: CardLocation }, card: Card) {
    this.gameStateService.payPlayer(this.player.id, payEvent.player, card, payEvent.cardLocation);
  }

  get bankBalance() {
    let bankBalance = 0;
    this.player?.bank.forEach((card: Card) => {
      bankBalance += card.value;
    });

    return bankBalance;
  }
}
