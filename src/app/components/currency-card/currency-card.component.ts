import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'or-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
})
export class CurrencyCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;

  constructor() {}

  ngOnInit(): void {}
}
