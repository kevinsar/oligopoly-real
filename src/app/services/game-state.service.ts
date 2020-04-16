import { Injectable } from '@angular/core';
import { deck } from '../data/deck';
import { Card, Property } from '../models/card.model';
import { Player } from '../models/player.model';
import { GameState } from '../models/game-state.model';
import { BehaviorSubject } from 'rxjs';
import { mockGameState } from 'src/assets/mocks';

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

  constructor() {}

  getGameState() {
    return this.gameStateObserver;
  }

  startGame() {
    // this.gameState.deck = deck;
    // this.gameState.deck.forEach((card: Card, index: number) => {
    //   card.id = index;
    // });
    // this.gameState.deck.sort((a: Card, b: Card) => {
    //   const first = Math.random() * 10;
    //   const second = Math.random() * 10;

    //   return first > second ? 1 : -1;
    // });

    this.gameState = mockGameState;
    this.gameStateSubject.next(this.gameState);
  }

  addPlayer(player: Player) {
    const playerExists = this.gameState.players.find(existingPlayer => {
      return existingPlayer.id === player.id;
    });

    if (!playerExists) {
      this.gameState.players.push(player);
    }

    this.gameStateSubject.next(this.gameState);
  }

  addToBank(playerId: number, card: Card) {
    const currentPlayer = this.gameState.players.find((player: Player) => {
      return player.id === playerId;
    });

    currentPlayer.bank.push(card);

    currentPlayer.hand = currentPlayer.hand.filter((handCard: Card) => {
      return handCard.id !== card.id;
    });
    this.gameStateSubject.next(this.gameState);
  }

  addToPlayed(playerId: number, card: Card) {
    this.addToTrash(playerId, card);
  }

  addToTrash(playerId: number, card: Card) {
    const currentPlayer = this.gameState.players.find((player: Player) => {
      return player.id === playerId;
    });

    this.gameState.trash.push(card);

    currentPlayer.hand = currentPlayer.hand.filter((handCard: Card) => {
      return handCard.id !== card.id;
    });
    this.gameStateSubject.next(this.gameState);
  }

  buildProperty(playerId: number, card: Card, lot = 0) {
    const currentPlayer = this.gameState.players.find((player: Player) => {
      return player.id === playerId;
    });

    currentPlayer.land = currentPlayer.land.map((plot: Card[]) => {
      return [...plot].filter((plotCard: Card) => {
        return plotCard.id !== card.id;
      });
    });

    currentPlayer.hand = currentPlayer.hand.filter((handCard: Card) => {
      return handCard.id !== card.id;
    });

    currentPlayer.land[lot].push(card);

    const addNewLot =
      currentPlayer.land.filter((currentLot: Card[]) => {
        return currentLot.length === 0;
      }).length === 0;

    if (addNewLot) {
      currentPlayer.land.push([]);
    }
    this.gameStateSubject.next(this.gameState);
  }

  drawCards(playerId: number, amount = 2) {
    const currentPlayer = this.gameState.players.find((player: Player) => {
      return player.id === playerId;
    });

    for (let i = 0; i < amount; i++) {
      currentPlayer.hand.push(this.gameState.deck.pop());
    }

    this.gameStateSubject.next(this.gameState);
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
}
