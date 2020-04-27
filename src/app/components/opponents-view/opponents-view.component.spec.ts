import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentsViewComponent } from './opponents-view.component';
import { MaterialModule } from 'src/app/material.module';

describe('OpponentsViewComponent', () => {
  let component: OpponentsViewComponent;
  let fixture: ComponentFixture<OpponentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpponentsViewComponent],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {});

  describe('ngOnChanges', () => {
    it('should call getOpponentStates when there is a gameState change', () => {
      spyOn(component, 'getOpponentStates');
      component.ngOnChanges({ gameState: {} as any });
      expect(component.getOpponentStates).toHaveBeenCalled();
    });

    it('should do nothing when there is not a gameState change', () => {
      spyOn(component, 'getOpponentStates');
      component.ngOnChanges({ activePlayer: {} as any });
      expect(component.getOpponentStates).not.toHaveBeenCalled();
    });
  });

  describe('getOpponentStates', () => {
    it('should set array of opponents without active player', () => {
      component.activePlayer = { id: 1 } as any;
      component.gameState = {
        players: [{ id: 2 }, { id: 3 }, { id: 1 }]
      } as any;
      component.getOpponentStates();
      expect(component.opponents.length).toBe(2);
      expect(component.opponents[0].id).toBe(2);
      expect(component.opponents[1].id).toBe(3);
    });

    it('should not set opponents if gamestate has not loaded yet', () => {
      component.gameState = null;
      component.getOpponentStates();
      expect(component.opponents.length).toBe(0);
    });
  });

  describe('setBankToView', () => {
    it('should set bank to view to list of provided cards', () => {
      component.bankToView = [];
      component.setBankToView([{ id: 1 }] as any);
      expect(component.bankToView.length).toBe(1);
    });
  });

  describe('setLandToView', () => {
    it('should set bank to view to list of provided cards', () => {
      component.landToView = [];
      component.setLandToView([{ id: 1 }] as any);
      expect(component.landToView.length).toBe(1);
    });
  });

  describe('openDialog', () => {
    it('should open a dialog', () => {
      spyOn(component['dialog'], 'open');
      component.openDialog({} as any);
      expect(component['dialog'].open).toHaveBeenCalled();
    });
  });

  describe('getBankBalance', () => {
    it('should add all bank values up and return bank balance', () => {
      const bankCards = [{ value: 1 }, { value: 2 }, { value: 3 }];
      expect(component.getBankBalance(bankCards as any)).toBe('$6');
    });
  });
});
