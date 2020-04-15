import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'or-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() description: string;

  constructor() {}

  ngOnInit(): void {}
}
