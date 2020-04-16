import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/models/card.model';

@Component({
  selector: 'or-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() name: string;
  @Input() value: number;
  @Input() properties: Property[] = [];

  constructor() {}

  ngOnInit(): void {}

  get propertyClass(): string {
    let propertyClass = '';

    if (this.properties[0] && this.properties[0].color) {
      propertyClass = `property-title-container-${this.properties[0].color} card-bg-${this.properties[0].color}`;
    }
    return propertyClass;
  }
}
