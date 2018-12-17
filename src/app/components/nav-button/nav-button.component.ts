import { Component, OnInit } from '@angular/core';
// @TODO think about this component.
@Component({
  selector: 'nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss']
})
export class NavButtonComponent implements OnInit {

  constructor() { }

  isShown = false;

  ngOnInit() {
  }

  onOpen(): void {
    this.isShown = !this.isShown;
  }

}
