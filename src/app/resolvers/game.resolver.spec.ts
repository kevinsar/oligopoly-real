import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { GameStateService } from '../services/game-state.service';
import { GameStateResolver } from './game-state.resolver';

describe('LocationsResolver', () => {
  let resolver: GameStateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameStateService, GameStateResolver]
    });
    resolver = TestBed.inject(GameStateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  describe('resolve', () => {
    it('should get provider details in resolver before the page loads', () => {
      spyOn(resolver['gameStateService'], 'getInitialGameState').and.returnValue(of([]) as any);
      resolver.resolve({
        paramMap: {
          get: gameId => {
            return '123';
          }
        }
      } as any);
      expect(resolver['gameStateService'].getInitialGameState).toHaveBeenCalledWith('123');
    });
  });
});
