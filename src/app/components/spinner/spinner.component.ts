import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'or-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() showSpinner: boolean;
  @Input() message: string;
  constructor() {}

  ngOnInit(): void {}
}
