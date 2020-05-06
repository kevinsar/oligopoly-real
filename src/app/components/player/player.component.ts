import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  TemplateRef,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  QueryList
} from '@angular/core';
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
import { WindowService } from 'src/app/services/window.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { CardType } from 'src/app/enums/card-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'or-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('handContainer') handContainer: ElementRef;
  @ViewChild('handList') handList: ElementRef;
  @ViewChildren('lotsList') lotsList: QueryList<ElementRef>;
  @ViewChild('unassignedContainer') unassignedContainer: TemplateRef<any>;
  @ViewChild('gameLogContainer') gameLogContainer: ElementRef;
  CardLocation = CardLocation;
  gameState: GameState;
  player: Player;
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
  isConnectedToSocket = false;

  dropIds = {
    lots: [],
    opponents: [],
    hand: [],
    trash: [],
    bank: []
  };

  constructor(
    private socketService: SocketService,
    private router: Router,
    private gameStateService: GameStateService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private windowService: WindowService,
    private snackBar: MatSnackBar
  ) {
    this.route.data.subscribe((params: any) => {
      const playerId = this.player?.id || parseInt(this.windowService.getItem('userId'), 10);

      if (!params.gameState || !playerId) {
        this.router.navigate(['/']);
      } else {
        this.gameStateService.setGameState(params.gameState);
        this.gameId = params.gameState.id;
        this.enableNoSleep(true);
      }
    });
  }

  ngOnInit(): void {
    this.gameStateService.getGameState().subscribe((state: GameState) => {
      this.setGameState(state);
    });
  }

  ngAfterViewInit() {
    if ((this.player.unAssigned || []).length > 0 && this.unassignedContainer) {
      this.dialog.closeAll();
      this.openDialog(this.unassignedContainer);
    }
  }

  ngOnDestroy() {
    try {
      this.enableNoSleep(false);
      this.socketService.close();
    } catch (e) {
      // There is no socket to close.
    }
  }

  startNewGame() {
    this.gameStateService.startNewGame();
  }

  setGameState(state: GameState) {
    if (!state['success']) {
      this.router.navigate(['/']);
      return;
    }

    this.gameState = state;

    const playerId = this.player?.id || parseInt(this.windowService.getItem('userId'), 10);

    const newPlayerData = this.gameState.players.find((player: Player) => {
      return player.id === playerId;
    });

    if (newPlayerData) {
      this.player = newPlayerData;

      if ((this.player.unAssigned || []).length > 0 && this.unassignedContainer) {
        this.dialog.closeAll();
        this.openDialog(this.unassignedContainer);
      }

      if (!this.isConnectedToSocket) {
        this.connectToSocket();
      }
    }

    this.handClickHandler(true);
    this.cdr.detectChanges();
    this.getDropIds();
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

  drawCards(amount: number = 2) {
    this.gameStateService.drawCards(this.player.id, amount);
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
      default:
        break;
    }

    this.handClickHandler(true);
  }

  playAgainstHandler(card: Card, playEvent: { player: Player; cardAction: CardAction }) {
    this.gameStateService.addToPlayed(this.player.id, card, playEvent.player);
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
    let message = 'has ended their turn.\n';

    const currentPlayerIndex = this.gameState.players.findIndex((player: Player) => {
      return this.player.id === player.id;
    });

    let nextPlayerIndex = 0;
    if (currentPlayerIndex < this.gameState.players.length - 1) {
      nextPlayerIndex = currentPlayerIndex + 1;
    }

    message += `It is now ${this.gameState.players[nextPlayerIndex].name}'s turn`;
    this.gameStateService.sendChat(this.player, message);
    this.chatMessage = '';
  }

  unAssignedLandHandler() {
    if (this.player.unAssigned.length <= 1) {
      this.dialog.closeAll();
    }
  }

  bankPayHandler() {
    if (this.player.bank.length <= 1) {
      this.dialog.closeAll();
    }
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

    this.socketService.onMessage().subscribe((message: any) => {
      if (message) {
        this.gameStateService.setGameState(message);
      }
    });

    this.socketService.onNotificationAction().subscribe((message: { userId: number | string; message: string }) => {
      const ownMessage = message?.message?.split(' ')[0] === this.player.name;
      if ((message.userId === 'all' || message.userId === this.player.id) && !ownMessage && message.message) {
        this.snackBar.open(message.message, 'Close', {
          duration: 5000
        });
      }
    });

    this.socketService.onPlayerAction().subscribe((message: any) => {
      if (message) {
        this.gameLog += `${message}\n`;
        const scrollHeight = this.gameLogContainer.nativeElement.scrollHeight;
        window.setTimeout(() => {
          this.gameLogContainer.nativeElement.scrollTo(0, scrollHeight > 5000 ? scrollHeight : 5000);
        }, 100);
      }
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

  sendChat() {
    this.gameStateService.sendChat(this.player, this.chatMessage);
    this.chatMessage = '';
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

  connectToSocket() {
    this.isConnectedToSocket = true;
    this.initIoConnection();
    let message: Message;

    message = {
      from: this.player,
      content: this.gameId,
      messageType: MessageType.CONNECTED,
      gameId: this.gameId
    };

    this.gameLog = `Whoever created the game goes first.\nUse Chat Box to communicate moves!\n`;

    window.setTimeout(() => {
      this.handClickHandler(true);
    }, 1000);
    this.socketService.send(message);
  }

  /* Utiltities */

  enableNoSleep(allow = false) {
    if (!this.noSleep && allow) {
      try {
        this.noSleep = new NoSleep();
      } catch (e) {
        console.log(e);
      }
    }

    try {
      if (this.noSleep) {
        if (allow) {
          this.noSleep.enable();
        } else {
          this.noSleep.disable();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  getDropIds() {
    this.lotsList.forEach((lot: ElementRef) => {
      this.dropIds.lots.push(lot.nativeElement.getAttribute('id'));
    });
  }

  /* Drop Handlers */
  dropAnimator(dropEvent: CdkDragDrop<string[]>) {
    if (dropEvent.previousContainer === dropEvent.container) {
      moveItemInArray(dropEvent.container.data, dropEvent.previousIndex, dropEvent.currentIndex);
    } else {
      transferArrayItem(dropEvent.previousContainer.data, dropEvent.container.data, dropEvent.previousIndex, dropEvent.currentIndex);
    }
  }

  dropIntoLand(dropEvent: CdkDragDrop<string[]>, lotNumber: number) {
    this.dropAnimator(dropEvent);

    if (dropEvent.item.data?.card) {
      this.buildLand(dropEvent.item.data.card, lotNumber);
    }
  }

  isLandOrHouse(item: CdkDrag<number>) {
    let card: Card;
    if (item && item.data && item.data['card']) {
      card = item.data['card'];
    }

    return (
      card &&
      (item.data['location'] === CardLocation.LAND || item.data['location'] === CardLocation.HAND) &&
      (card.type === CardType.WILD || card.type === CardType.PROPERTY || card.name === 'House' || card.name === 'Hotel')
    );
  }
}
