import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/models/card.model';

@Component({
  selector: 'or-wild-card',
  templateUrl: './wild-card.component.html',
  styleUrls: ['./wild-card.component.scss'],
})
export class WildCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() properties: Property[] = [];

  constructor() {}

  ngOnInit(): void {}

  flipCard() {
    this.properties.reverse();
  }

  get propertyClass(): string {
    let propertyClass = '';

    if (this.properties.length > 2) {
      propertyClass = `property-title-container-rainbow`;
    } else if (this.properties[0] && this.properties[0].color) {
      propertyClass = `property-title-container-${this.properties[0].color}`;
    }
    return propertyClass;
  }

  get propertyClassReverse(): string {
    let propertyClass = '';

    if (this.properties[1] && this.properties[1].color) {
      propertyClass = `property-title-container-${this.properties[1].color}`;
    }
    return propertyClass;
  }
}
