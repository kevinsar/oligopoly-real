import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { WindowService } from 'src/app/services/window.service';
import { OpponentsViewComponent } from '../opponents-view/opponents-view.component';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GameStateService } from 'src/app/services/game-state.service';
import { SocketService } from 'src/app/services/socket.service';
import { CardComponent } from '../card/card.component';
import { CardActionsComponent } from '../card-actions/card-actions.component';
import { CardAction } from 'src/app/enums/card-action.enum';
import { Color } from 'src/app/enums/color.enum';
import { CardLocation } from 'src/app/enums/card-location.enum';

const gamesStateResolver = {
  data: of({ gamesState: { id: 'M12345', players: [{ id: 1 }] } })
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerComponent, OpponentsViewComponent, CardComponent, CardActionsComponent],
      providers: [
        WindowService,
        GameStateService,
        SocketService,
        { provide: ActivatedRoute, useValue: gamesStateResolver },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule, FormsModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call enableNoSleep', () => {
      spyOn(component, 'enableNoSleep');
      component.ngOnInit();
      expect(component.enableNoSleep).toHaveBeenCalledWith(true);
    });

    it('should call gameStateService and set the game state', () => {
      const gameState = {} as any;
      spyOn(component['gameStateService'], 'getGameState').and.returnValue(of(gameState));
      spyOn(component, 'setGameState');
      component.ngOnInit();
      expect(component.setGameState).toHaveBeenCalledWith(gameState);
    });
  });

  describe('ngOnDestroy', () => {
    it('should diable nosleep and close socket', () => {
      spyOn(component, 'enableNoSleep');
      spyOn(component['socketService'], 'close');
      component.ngOnDestroy();
      expect(component.enableNoSleep).toHaveBeenCalledWith(false);
      expect(component['socketService'].close).toHaveBeenCalled();
    });
  });

  describe('startNewGame', () => {
    it('should call gameStateService startNewGame', () => {
      spyOn(component['gameStateService'], 'startNewGame');
      component.startNewGame();
      expect(component['gameStateService'].startNewGame).toHaveBeenCalled();
    });
  });

  describe('setGameState', () => {
    it('should navigate back to home page if gameState service returns false', () => {
      component.setGameState({ success: false } as any);
      expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
    });

    it('should set gameState if gameState exists and success is true', () => {
      component.gameState = null;
      component.setGameState({ success: true, players: [], trash: [], deck: [], id: 'M12345' } as any);
      expect(component.gameState.players).toBeTruthy();
      expect(component.gameState.trash).toBeTruthy();
      expect(component.gameState.deck).toBeTruthy();
    });

    it('should set the active player and connect to socket if not already connected', () => {
      spyOn(component['windowService'], 'getItem').and.returnValue('12345');
      spyOn(component, 'connectToSocket');
      component.isConnectedToSocket = false;
      const gameState = {
        success: true,
        players: [
          { id: 12345, unAssigned: [], bank: [], hand: [] },
          { id: 23456, unAssigned: [], bank: [], hand: [] }
        ],
        trash: [],
        deck: [],
        id: 'M12345'
      } as any;
      component.setGameState(gameState);
      expect(component.player.id).toBe(12345);
      expect(component.connectToSocket).toHaveBeenCalled();
    });

    it('should set the active player and not connect to socket if already connected', () => {
      spyOn(component['windowService'], 'getItem').and.returnValue('12345');
      spyOn(component, 'connectToSocket');
      component.isConnectedToSocket = true;
      const gameState = {
        success: true,
        players: [
          { id: 12345, bank: [], hand: [] },
          { id: 23456, unAssigned: [], bank: [], hand: [] }
        ],
        trash: [],
        deck: [],
        id: 'M12345'
      } as any;
      component.setGameState(gameState);
      expect(component.player.id).toBe(12345);
      expect(component.connectToSocket).not.toHaveBeenCalled();
    });

    it('should call handClickHandler, detect changes and call getDropIds and open dialog if unAssigned has cards', () => {
      spyOn(component['windowService'], 'getItem').and.returnValue('12345');
      spyOn(component, 'getDropIds');
      spyOn(component['cdr'], 'detectChanges');
      spyOn(component, 'handClickHandler');
      spyOn(component, 'openDialog');
      component.isConnectedToSocket = true;
      const gameState = {
        success: true,
        players: [
          { id: 12345, unAssigned: [{ id: 1 }], bank: [], hand: [] },
          { id: 23456, unAssigned: [], bank: [], hand: [] }
        ],
        trash: [],
        deck: [],
        id: 'M12345'
      } as any;
      component.setGameState(gameState);
      expect(component.player.id).toBe(12345);
      expect(component.handClickHandler).toHaveBeenCalled();
      expect(component['cdr'].detectChanges).toHaveBeenCalled();
      expect(component.getDropIds).toHaveBeenCalled();
      expect(component.openDialog).toHaveBeenCalled();
    });
  });

  describe('handClickHandler', () => {
    it('should call compactHand if isHandSpread is true and then set isHandSpread to false', () => {
      spyOn(component, 'compactHand');
      component.isHandSpread = true;
      component.handClickHandler();
      expect(component.compactHand).toHaveBeenCalled();
      expect(component.isHandSpread).toBeFalse();
    });

    it('should call compactHand if force compact is intended and then set isHandSpread to false', () => {
      spyOn(component, 'compactHand');
      component.isHandSpread = false;
      component.handClickHandler(true);
      expect(component.compactHand).toHaveBeenCalled();
      expect(component.isHandSpread).toBeFalse();
    });

    it('should call spreadHand if isHandSpread is false and then set isHandSpread to true', () => {
      spyOn(component, 'spreadHand');
      component.isHandSpread = false;
      component.handClickHandler();
      expect(component.spreadHand).toHaveBeenCalled();
      expect(component.isHandSpread).toBeTrue();
    });
  });

  describe('drawCards', () => {
    it('should call gameStateService drawCards with default of 2', () => {
      spyOn(component['gameStateService'], 'drawCards');
      component.player = { id: 1 } as any;
      component.drawCards();
      expect(component['gameStateService'].drawCards).toHaveBeenCalledWith(1, 2);
    });

    it('should call gameStateService drawCards with default of provided parameter', () => {
      spyOn(component['gameStateService'], 'drawCards');
      component.player = { id: 1 } as any;
      component.drawCards(5);
      expect(component['gameStateService'].drawCards).toHaveBeenCalledWith(1, 5);
    });
  });

  describe('cardActionHandler', () => {
    const card = { id: 123 } as any;

    it('should call playCard when action is play', () => {
      spyOn(component, 'playCard');
      component.cardActionHandler(card, CardAction.PLAY);
      expect(component.playCard).toHaveBeenCalledWith(card);
    });

    it('should call addToBank when action is bank', () => {
      spyOn(component, 'addToBank');
      component.cardActionHandler(card, CardAction.BANK);
      expect(component.addToBank).toHaveBeenCalledWith(card);
    });

    it('should call addToTrash when action is trash', () => {
      spyOn(component, 'addToTrash');
      component.cardActionHandler(card, CardAction.TRASH);
      expect(component.addToTrash).toHaveBeenCalledWith(card);
    });
  });

  describe('buildLand', () => {
    it('should call gameStateService buildProperty', () => {
      spyOn(component['gameStateService'], 'buildProperty');
      component.player = { id: 123 } as any;
      const card = { id: 123 } as any;
      const lot = 1;
      component.buildLand(card, lot);
      expect(component['gameStateService'].buildProperty).toHaveBeenCalledWith(123, card, 1);
    });
  });

  describe('addToBank', () => {
    it('should call gameStateService addToBank', () => {
      spyOn(component['gameStateService'], 'addToBank');
      component.player = { id: 123 } as any;
      const card = { id: 123 } as any;
      component.addToBank(card);
      expect(component['gameStateService'].addToBank).toHaveBeenCalledWith(123, card);
    });
  });

  describe('playCard', () => {
    it('should call gameStateService addToPlayed', () => {
      spyOn(component['gameStateService'], 'addToPlayed');
      component.player = { id: 123 } as any;
      const card = { id: 123 } as any;
      component.playCard(card);
      expect(component['gameStateService'].addToPlayed).toHaveBeenCalledWith(123, card);
    });
  });

  describe('addToTrash', () => {
    it('should call gameStateService addToTrash', () => {
      spyOn(component['gameStateService'], 'addToTrash');
      component.player = { id: 123 } as any;
      const card = { id: 123 } as any;
      component.addToTrash(card);
      expect(component['gameStateService'].addToTrash).toHaveBeenCalledWith(123, card);
    });
  });

  describe('sortWildCardProperty', () => {
    it('should call gameStateService setWildCardColor', () => {
      spyOn(component['gameStateService'], 'setWildCardColor');
      component.player = { id: 123 } as any;
      const property = { color: Color.BLUE, rents: [] };
      const card = { id: 123 } as any;
      component.sortWildCardProperty(card, property);
      expect(component['gameStateService'].setWildCardColor).toHaveBeenCalledWith(123, card, property);
    });
  });

  describe('spreadHand', () => {
    it('should set raisedCardIndex to be -1 and handCardOffset to be 0', () => {
      component.raisedCardIndex = null;
      component.handCardOffset = null;
      component.spreadHand();
      expect(component.raisedCardIndex).toBe(-1);
      expect(component.handCardOffset).toBe(0);
    });
  });

  describe('compactHand', () => {
    it('should set handOffset to allow all cards to fit on page', () => {
      component.player = {
        hand: new Array(10)
      } as any;

      spyOn(component.handContainer.nativeElement, 'querySelector').and.returnValue({
        getBoundingClientRect: () => {
          return { width: 800 };
        }
      });

      component.compactHand();
      expect(component.handCardOffset).toBe(191 + 1 / 9);
    });

    it('should set handCardOffset to 0 if amount of cards already fits in handContainer', () => {
      component.player = {
        hand: new Array(2)
      } as any;

      spyOn(component.handContainer.nativeElement, 'querySelector').and.returnValue({
        getBoundingClientRect: () => {
          return { width: 800 };
        }
      });

      component.compactHand();
      expect(component.handCardOffset).toBe(0);
    });

    it('should do nothing if player does not exist', () => {
      component.player = null;
      component.handCardOffset = 10;

      spyOn(component.handContainer.nativeElement, 'querySelector').and.returnValue({
        getBoundingClientRect: () => {
          return { width: 800 };
        }
      });

      component.compactHand();
      expect(component.handCardOffset).toBe(10);
    });

    it('should do nothing if handContainer does not exist', () => {
      component.player = {
        hand: new Array(2)
      } as any;
      component.handCardOffset = 10;
      component.handContainer = null;

      component.compactHand();
      expect(component.handCardOffset).toBe(10);
    });
  });

  describe('setRaisedCard', () => {
    it('should do nothing if event is the card action button', () => {
      component.raisedCardIndex = 10;
      component.setRaisedCard(7, {
        target: {
          classList: {
            contains: () => {
              return true;
            }
          }
        }
      });
      expect(component.raisedCardIndex).toBe(10);
    });

    it('should do nothing if hand is not spread', () => {
      component.raisedCardIndex = 10;
      component.isHandSpread = true;
      component.setRaisedCard(7, {
        target: {
          classList: {
            contains: () => {
              return false;
            }
          }
        }
      });
      expect(component.raisedCardIndex).toBe(10);
    });

    it('should set raisedCardIndex to -1 if same card is being clicked', () => {
      component.raisedCardIndex = 10;
      component.isHandSpread = false;
      component.setRaisedCard(10, {
        target: {
          classList: {
            contains: () => {
              return false;
            }
          }
        }
      });
      expect(component.raisedCardIndex).toBe(-1);
    });

    it('should set raisedCardIndex to new if different card is being clicked', () => {
      component.raisedCardIndex = 10;
      component.isHandSpread = false;
      component.setRaisedCard(7, {
        target: {
          classList: {
            contains: () => {
              return false;
            }
          }
        }
      });
      expect(component.raisedCardIndex).toBe(7);
    });
  });

  describe('viewTrash', () => {
    it('should call openDialog with trashContainer', () => {
      const trashContainer = {} as any;
      spyOn(component, 'openDialog');
      component.viewTrash(trashContainer);
      expect(component.openDialog).toHaveBeenCalledWith(trashContainer);
    });
  });

  describe('openDialog', () => {
    it('should call dialog open', () => {
      spyOn(component['dialog'], 'open');
      component.openDialog({} as any);
      expect(component['dialog'].open).toHaveBeenCalled();
    });
  });

  describe('payPlayerHandler', () => {
    it('should call gameStateService payPlayer', () => {
      spyOn(component['gameStateService'], 'payPlayer');
      component.player = {
        id: 2
      } as any;
      const payEvent = {
        player: { id: 1 } as any,
        cardLocation: CardLocation.BANK
      } as any;
      const card = { id: 123 } as any;
      component.payPlayerHandler(payEvent, card);
      expect(component['gameStateService'].payPlayer).toHaveBeenCalledWith(2, payEvent.player, card, CardLocation.BANK);
    });
  });

  describe('endTurn', () => {
    it('should send chat message to end turn and say who is next, then clear chat message box', () => {
      component.chatMessage = 'test';
      component.gameState = {
        players: [
          { id: 1, name: 'Kevin' },
          { id: 2, name: 'Helen' },
          { id: 3, name: 'Ben' }
        ]
      } as any;
      component.player = { id: 1, name: 'Kevin' } as any;

      const expectedMessage = `has ended their turn.\nIt is now Helen's turn`;
      spyOn(component['gameStateService'], 'sendChat');
      component.endTurn();
      expect(component['gameStateService'].sendChat).toHaveBeenCalledWith(component.player, expectedMessage);
      expect(component.chatMessage).toBe('');
    });

    it('should send chat message to end turn and say who is next if current player was last player, then clear chat message box', () => {
      component.chatMessage = 'test';
      component.gameState = {
        players: [
          { id: 1, name: 'Kevin' },
          { id: 2, name: 'Helen' },
          { id: 3, name: 'Ben' }
        ]
      } as any;
      component.player = { id: 3, name: 'Ben' } as any;

      const expectedMessage = `has ended their turn.\nIt is now Kevin's turn`;
      spyOn(component['gameStateService'], 'sendChat');
      component.endTurn();
      expect(component['gameStateService'].sendChat).toHaveBeenCalledWith(component.player, expectedMessage);
      expect(component.chatMessage).toBe('');
    });
  });

  describe('bankBalance', () => {
    it('should return user bank balance', () => {
      component.player = {
        bank: [{ value: 1 }, { value: 2 }, { value: 3 }]
      } as any;

      expect(component.bankBalance).toBe(6);
    });

    it('should return 0 if no cards are in bank', () => {
      component.player = null;
      expect(component.bankBalance).toBe(0);

      component.player = { bank: [] } as any;
      expect(component.bankBalance).toBe(0);
    });
  });
});
