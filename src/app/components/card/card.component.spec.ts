import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { CardAction } from 'src/app/enums/card-action.enum';
import { CardLocation } from 'src/app/enums/card-location.enum';
import { CardActionsComponent } from '../card-actions/card-actions.component';
import { MaterialModule } from 'src/app/material.module';
import { CardType } from 'src/app/enums/card-type.enum';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent, CardActionsComponent],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.players = [
      {
        id: 0,
        name: 'New User',
        hand: [],
        land: [[]],
        bank: [],
        unAssigned: []
      }
    ];

    component.activePlayer = {
      id: 0,
      name: 'New User',
      hand: [],
      land: [[]],
      bank: [],
      unAssigned: []
    };
    component.cardLocation = CardLocation.HAND;
    component.card = {
      id: 1,
      name: 'Pass Go',
      value: 1,
      type: CardType.ACTION,
      description: 'Draw 2 extra cards.'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {});

  describe('emitCardAction', () => {
    it('should emit cardAction', () => {
      spyOn(component.cardAction, 'emit');
      component.emitCardAction(CardAction.PAY);
      expect(component.cardAction.emit).toHaveBeenCalledWith(CardAction.PAY);
    });
  });

  describe('setPropertyHandler', () => {
    it('should emit setProperty with lot #', () => {
      spyOn(component.setProperty, 'emit');
      component.setPropertyHandler(2);
      expect(component.setProperty.emit).toHaveBeenCalledWith(2);
    });
  });

  describe('setPrimaryProperty', () => {
    it('should emit updatePropertyOrder with property', () => {
      spyOn(component.updatePropertyOrder, 'emit');
      component.setPrimaryProperty({} as any);
      expect(component.updatePropertyOrder.emit).toHaveBeenCalled();
    });
  });

  describe('payPlayerHandler', () => {
    it('should emit payPlayerHandler with player and card location', () => {
      spyOn(component.payPlayer, 'emit');
      const payEvent = { player: {} as any, cardLocation: CardLocation.HAND };
      component.payPlayerHandler(payEvent);
      expect(component.payPlayer.emit).toHaveBeenCalledWith(payEvent);
    });
  });
});
