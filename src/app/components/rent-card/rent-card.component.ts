import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'src/app/enums/color.enum';

@Component({
  selector: 'or-rent-card',
  templateUrl: './rent-card.component.html',
  styleUrls: ['./rent-card.component.scss'],
})
export class RentCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() rentColors: Color[];

  constructor() {}

  ngOnInit(): void {}
}
