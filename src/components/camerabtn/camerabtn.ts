import { Component } from '@angular/core';

/**
 * Generated class for the CamerabtnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'camerabtn',
  templateUrl: 'camerabtn.html'
})
export class CamerabtnComponent {

  text: string;

  constructor() {
    console.log('Hello CamerabtnComponent Component');
    this.text = 'Hello World';
  }

}
