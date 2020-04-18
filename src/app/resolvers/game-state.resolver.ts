import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GameStateService } from '../services/game-state.service';

@Injectable()
export class GameStateResolver implements Resolve<Observable<any>> {
  constructor(private gameStateService: GameStateService) {}

  resolve(route: ActivatedRouteSnapshot) {
    window.localStorage.setItem('gameId', route.paramMap.get('gameId'));
    return this.gameStateService.getInitialGameState(route.paramMap.get('gameId'));
  }
}
