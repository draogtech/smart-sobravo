import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {

  regions;
  constructor(public toastCtrl: ToastController, private dataService: DataService, public router: Router) {
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
      message: 'A server error has occurred.',
      duration: 2000
    });
    toast.present();
  }

  // Sending region filter parameters
  clickRegion(region){
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
