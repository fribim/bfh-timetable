import { Component } from '@angular/core';
import { RestService } from '../../service/rest.service';
import * as _ from "lodash";
import { LoadingController, ToastController } from 'ionic-angular';


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
      private service: RestService,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController
  ) {

  }

  ionViewDidLoad () {

    let loader = this.loadingCtrl.create({
      content: "Lade Stundenplan",
      spinner: "crescent"
    });

    loader.present();

    this.service.getTimeTable().then((data) => {
      loader.dismiss();
      this.courses = _.filter(data.json().data, { classname: 'I1a' });
    }).catch((ex) => {
      loader.dismiss();
      this.couldNotLoadData();
    });
  }

  private couldNotLoadData() {
    var toast = this.toastCtrl.create({
      message: 'Stundenplan konnte nicht geladen werden',
      duration: 5000,
      position: "top"
    });
    toast.present();
  }
}
