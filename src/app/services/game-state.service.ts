import { Injectable } from '@angular/core';
import { deck } from '../data/deck';
import { Card, Property } from '../models/card.model';
import { Player } from '../models/player.model';
import { GameState } from '../models/game-state.model';
import { BehaviorSubject } from 'rxjs';

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
    this.gameState.deck = deck;
    this.gameState.deck.forEach((card: Card, index: number) => {
      card.id = index;
    });
    this.gameState.deck.sort((a: Card, b: Card) => {
      const first = Math.random() * 10;
      const second = Math.random() * 10;

      return first > second ? 1 : -1;
    });
  }

  addPlayer(player: Player) {
    this.gameState.players.push(player);
  }

  addToBank(playerId: number, card: Card) {
    const currentPlayer = this.gameState.players.find((player: Player) => {
      return player.id === playerId;
    });

    currentPlayer.bank.push(card);

    currentPlayer.hand = currentPlayer.hand.filter((handCard: Card) => {
      return handCard.id !== card.id;
    });
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
  }

  buildProperty(playerId: number, card: Card, lot = 0) {
    console.log(playerId, card, lot);
    debugger;
    const currentPlayer = this.gameState.players.find((player: Player) => {
      return player.id === playerId;
    });

    currentPlayer.land[lot].push(card);

    currentPlayer.hand = currentPlayer.hand.filter((handCard: Card) => {
      return handCard.id !== card.id;
    });

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
    console.log(playerId, amount);
  }

  setWildCardColor(playerId: number, card: Card, property: Property) {
    const currentPlayer = this.gameState.players.find((player: Player) => {
      return player.id === playerId;
    });

    const cardToUpdate = currentPlayer.hand.find((handCard: Card) => {
      return handCard.id === card.id;
    });

    cardToUpdate.property.sort((a: Property, b: Property) => {
      if (a.color === property.color) {
        return -1;
      }

      return 1;
    });
    this.gameStateSubject.next(this.gameState);
  }
}
