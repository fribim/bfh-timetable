import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private courses;
  private weekdays;

  constructor(
      private navParams: NavParams
  ) {
    this.courses = navParams.get('courses');
    this.weekdays = navParams.get('weekdays');
  }
}
