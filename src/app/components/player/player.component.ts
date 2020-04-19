import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, TemplateRef, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Card, Property } from 'src/app/models/card.model';
import { GameStateService } from 'src/app/services/game-state.service';
import { GameState } from 'src/app/models/game-state.model';
import { Player } from 'src/app/models/player.model';
import { CardAction } from 'src/app/enums/card-action.enum';
import { MatDialog } from '@angular/material/dialog';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import * as NoSleep from 'nosleep.js';
import { MessageType } from 'src/app/enums/message-type.enum';
import { Message } from 'src/app/models/message.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'or-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('handContainer') handContainer: ElementRef;
  @ViewChild('unassignedContainer') unassignedContainer: TemplateRef<any>;
  @ViewChild('gameLogContainer') gameLogContainer: ElementRef;
  CardLocation = CardLocation;
  gameState: GameState;
  player: Player = {
    id: 0,
    name: 'New User',
    hand: [],
    land: [[]],
    bank: [],
    unAssigned: []
  };
  handCardOffset = 0;
  raisedCardIndex = -1;
  isHandSpread = false;

  /* Socket Connection */
  ioConnection: any;
  showReady = false;
  showWaiting = false;
  waitMode = false;
  gameId = '';
  randomId = '';
  startingScore = 0;
  noSleep: any;
  disconnected = false;
  gameLog = '';
  chatMessage = '';

  constructor(
    private socketService: SocketService,
    private router: Router,
    private gameStateService: GameStateService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    try {
      this.noSleep = new NoSleep();
    } catch (e) {
      console.log(e);
    }

    this.route.data.subscribe((params: any) => {
      this.gameStateService.setGameState(params.gameState);
      this.gameId = params.gameState.id;
      if (!params.gameState) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    this.initIoConnection();
    let message: Message;

    message = {
      from: this.player,
      content: this.gameId,
      messageType: MessageType.CONNECTED,
      gameId: this.gameId
    };

    this.gameLog = `Room Code: ${this.gameId}\n`;

    this.socketService.send(message);
  }

  ngAfterViewInit() {
    this.gameStateService.getGameState().subscribe((state: GameState) => {
      if (!state['success']) {
        this.router.navigate(['/']);
        return;
      }

      this.gameState = state;

      const playerId = parseInt(window.localStorage.getItem('userId'), 10);
      this.player = this.gameState.players.find((player: Player) => {
        return player.id === playerId;
      });

      if (this.player?.unAssigned.length > 0) {
        this.openDialog(this.unassignedContainer);
      } else {
        this.dialog.closeAll();
      }
      this.handClickHandler(true);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    try {
      this.allowSleep(false);
      this.socketService.close();
    } catch (e) {
      // There is no socket to close.
    }
  }

  startNewGame() {
    this.gameStateService.startNewGame();
  }

  allowSleep(allow = false) {
    try {
      if (allow) {
        this.noSleep.enable();
      } else {
        this.noSleep.disable();
      }
    } catch (e) {
      console.log(e);
    }
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
    if (this.player?.hand.length > 0 && this.handContainer?.nativeElement.querySelector('.hand-container-scroller')) {
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

  endTurn() {
    this.gameStateService.sendChat(this.player, 'has ended their turn.');
    this.chatMessage = '';
  }

  sendChat() {
    this.gameStateService.sendChat(this.player, this.chatMessage);
    this.chatMessage = '';
  }

  get bankBalance() {
    let bankBalance = 0;
    this.player?.bank.forEach((card: Card) => {
      bankBalance += card.value;
    });

    return bankBalance;
  }

  /* Socket Connections */

  initIoConnection(): void {
    this.socketService.initSocket(environment.gameUrl);

    this.ioConnection = this.socketService.onMessage().subscribe((message: any) => {
      console.log('Message being received is...');
      console.log(message);
      if (message) {
        this.gameStateService.setGameState(message);
      }
      console.log(' ------ ');
    });

    this.ioConnection = this.socketService.onPlayerAction().subscribe((message: any) => {
      console.log('Message being received is...');
      console.log(message);
      if (message) {
        this.gameLog += `${message}\n`;
        this.gameLogContainer.nativeElement.scrollTo(0, 5000);
      }
      console.log(' ------ ');
    });

    this.socketService.onDisconnect().subscribe(status => {
      this.disconnected = status ? status.disconnected : false;
    });

    this.socketService.onReconnect().subscribe(status => {
      if (this.disconnected && typeof status !== undefined && !status.disconnected) {
        console.log('Internet connection reestablished, reconnecting to server...');
        this.socketService.close();
        window.location.reload();
        this.disconnected = false;
      }
    });

    this.socketService.onEvent(MessageType.CONNECTED).subscribe(() => {
      console.log('connected');
    });

    this.socketService.onEvent(MessageType.DISCONNECTED).subscribe(() => {
      console.log('disconnected');
    });
  }

  sendMessage(messageType: MessageType): void {
    let message: Message;

    message = {
      from: this.player,
      content: {},
      messageType,
      gameId: this.gameId
    };

    this.socketService.send(message);
  }
}
