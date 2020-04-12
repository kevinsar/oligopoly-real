import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardType } from 'src/app/enums/card-type.enum';
import { CardLocation } from 'src/app/enums/card-location.enum';

@Component({
  selector: 'or-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss'],
})
export class CardActionsComponent implements OnInit {
  @Input() cardType: CardType;
  @Input() cardLocation: CardLocation;
  @Output() cardAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
