import { TestBed } from '@angular/core/testing';

import { GameStateService } from './game-state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameStateService', () => {
  let service: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
