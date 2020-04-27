import { Injectable } from '@angular/core';
import { Card, Property } from '../models/card.model';
import { Player } from '../models/player.model';
import { GameState } from '../models/game-state.model';
import { BehaviorSubject } from 'rxjs';
import { CardLocation } from '../enums/card-location.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CardAction } from '../enums/card-action.enum';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  gameState: GameState = {
    deck: [],
    players: [],
    trash: []
  };
  gameStateSubject = new BehaviorSubject<GameState>(this.gameState);
  gameStateObserver = this.gameStateSubject.asObservable();
  gameId: string;

  constructor(private http: HttpClient) {}

  getInitialGameState(gameId: string) {
    const body = {
      gameId
    };

    this.setGameId(gameId);
    return this.http.post(`${environment.gameUrl}/get-game-state`, body);
  }

  setGameState(gameState: GameState) {
    this.gameState = gameState;
    this.gameStateSubject.next(this.gameState);
  }

  getGameState() {
    return this.gameStateObserver;
  }

  setGameId(gameId: string) {
    this.gameId = gameId;
  }

  getGameId() {
    if (!this.gameId) {
      this.setGameId(window.localStorage.getItem('gameId'));
    }

    return this.gameId;
  }

  sendChat(player: Player, message: string) {
    this.gameId = this.gameId?.toUpperCase() || null;
    const serverUrl = environment.gameUrl;
    const url = `${serverUrl}/chat`;

    console.log(serverUrl);

    const body = {
      player,
      message,
      gameId: this.gameId
    };

    this.http.request('post', url, { body }).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      error => {
        console.log(error);
      }
    );
  }

  actionHandler(action: CardAction, actionParams: any) {
    this.gameId = this.gameId?.toUpperCase() || null;
    const serverUrl = environment.gameUrl;
    const url = `${serverUrl}/player-action`;

    console.log(serverUrl);

    const body = {
      action,
      params: actionParams,
      gameId: this.gameId
    };

    this.http.request('post', url, { body }).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.success) {
          this.gameState = resp;

          this.gameStateSubject.next(this.gameState);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  startNewGame() {
    this.gameId = this.gameId?.toUpperCase() || null;
    const serverUrl = environment.gameUrl;
    const url = `${serverUrl}/new-game`;

    const body = {
      gameId: this.gameId
    };

    this.http.request('post', url, { body }).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.success) {
          this.gameState = resp;
          this.gameStateSubject.next(this.gameState);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addToBank(playerId: number, card: Card) {
    this.actionHandler(CardAction.BANK, { playerId, card });
  }

  payPlayer(playerId: number, playerToPay: Player, card: Card, cardLocation: CardLocation) {
    this.actionHandler(CardAction.PAY, { playerId, playerToPay, card, cardLocation });
  }

  addToPlayed(playerId: number, card: Card) {
    this.actionHandler(CardAction.PLAY, { playerId, card });
  }

  addToTrash(playerId: number, card: Card) {
    this.actionHandler(CardAction.TRASH, { playerId, card });
  }

  buildProperty(playerId: number, card: Card, lot = 0) {
    this.actionHandler(CardAction.BUILD, { playerId, card, lot });
  }

  drawCards(playerId: number, amount = 2) {
    this.actionHandler(CardAction.DRAW, { playerId, amount });
  }

  setWildCardColor(playerId: number, card: Card, property: Property) {
    const currentPlayer = this.gameState.players.find((player: Player) => {
      return player.id === playerId;
    });

    let cardToUpdate = currentPlayer.hand.find((handCard: Card) => {
      return handCard.id === card.id;
    });

    if (!cardToUpdate) {
      currentPlayer.land.forEach((plot: Card[]) => {
        plot.forEach((plotCard: Card) => {
          if (plotCard.id === card.id) {
            cardToUpdate = plotCard;
          }
        });
      });
    }

    cardToUpdate.property.sort((a: Property, b: Property) => {
      if (a.color === property.color) {
        return -1;
      }

      return 1;
    });
    this.gameStateSubject.next(this.gameState);
  }

  getActiveGames() {
    return this.http.get(`${environment.gameUrl}/get-active-games`);
  }
}
