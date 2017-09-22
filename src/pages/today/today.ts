import { Component } from '@angular/core';
import { LoadingController, ToastController, NavController } from 'ionic-angular';
import { RestService } from '../../service/rest.service';
import { HomePage } from '../home/home';
import * as _ from "lodash";

@Component({
  selector: 'page-today',
  templateUrl: 'today.html',
})
export class TodayPage {

  private courses;
  private today;
  private dayNumber: number = 1;

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
      private service: RestService,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private navCtrl: NavController
  ) {
    var day = new Date();
    this.dayNumber = day.getDay();
    console.log(this.dayNumber);
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "Lade Stundenplan",
      spinner: "crescent"
    });

    loader.present();

    this.service.getTimeTable().then((data) => {
      loader.dismiss();
      this.courses = _.filter(data.json().data, { classname: 'I1a' });
      this.today = _.filter(data.json().data, { classname: 'I1a', dayofweek: this.dayNumber });
    }).catch((ex) => {
      loader.dismiss();
      this.couldNotLoadData();
    });
  }

  private couldNotLoadData() {
    var toast = this.toastCtrl.create({
      message: 'Stundenplan konnte nicht geladen werden',
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  openWeekView() {
    this.navCtrl.push(HomePage, {
      courses: this.courses,
      weekdays: this.weekdays
    });
  }
}
