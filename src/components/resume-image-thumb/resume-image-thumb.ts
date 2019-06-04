import { Component, Input } from '@angular/core';

/**
 * Generated class for the ResumeImageThumbComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resume-image-thumb',
  templateUrl: 'resume-image-thumb.html'
})
export class ResumeImageThumbComponent {

  text: string;
  @Input() img: string;

  constructor() {
    console.log('Hello ResumeImageThumbComponent Component');
    this.text = 'Hello World';
  }

  removeImage() {
    alert("Remove Image");
  }

}
