import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GameStateService } from '../services/game-state.service';
import { WindowService } from '../services/window.service';

@Injectable()
export class GameStateResolver implements Resolve<Observable<any>> {
  constructor(private gameStateService: GameStateService, private windowService: WindowService) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.windowService.setItem('gameId', route.paramMap.get('gameId'));
    return this.gameStateService.getInitialGameState(route.paramMap.get('gameId'));
  }
}
