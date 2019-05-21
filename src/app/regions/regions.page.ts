import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
// import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {

  regions;
  subscription: import('/home/draogtech/Smart-GN/client-app/node_modules/rxjs/internal/Subscription').Subscription;
  // tslint:disable-next-line:max-line-length
  constructor(private platform: Platform, public toastCtrl: ToastController, private dataService: DataService, public router: Router) {
  }

  ionViewDidEnter() {
      this.subscription = this.platform.backButton.subscribe(() => {
          navigator['app'].exitApp();
      });
  }

  ionViewWillLeave() {
      this.subscription.unsubscribe();
  }

  async successToast() {
    const toast = await this.toastCtrl.create({
      message: 'Your point have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async failureToast() {
    const toast = await this.toastCtrl.create({
      message: 'A server connection error has occurred. Please check your internet connection',
      duration: 2000
    });
    toast.present();
  }

  // Sending region filter parameters
  clickRegion(region) {
    console.log('region clicked');
    this.router.navigate(['/villes', region]);
  }

  ngOnInit() {
      // Call our service function which returns an Observable
      this.dataService.setRegions().subscribe(res => {
        this.regions = res.json();
      }, err => {
        this.failureToast();
      });
  }
}
