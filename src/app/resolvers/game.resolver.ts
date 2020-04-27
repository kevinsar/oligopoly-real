import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { GameStateService } from '../services/game-state.service';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class GameResolver implements Resolve<Observable<any>> {
  constructor(private gameStateService: GameStateService, private spinnerService: SpinnerService) {}

  resolve() {
    this.spinnerService.showSpinner();
    return this.gameStateService.getActiveGames();
  }
}
