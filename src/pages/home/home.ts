import { Component } from '@angular/core';
import { RestService } from '../../service/rest.service';
import * as _ from "lodash";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private courses;

  private weekdays = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag'
  ];

  constructor(
      private service: RestService
  ) {

  }

  ionViewDidLoad () {
    this.service.getTimeTable().then((data) => {
      this.courses = _.filter(data.json().data, { classname: 'I1a' });
    }).catch((ex) => {
      console.error('failed loading');
    });
  }

}
