import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-quartier',
  templateUrl: './quartier.page.html',
  styleUrls: ['./quartier.page.scss'],
})
export class QuartierPage implements OnInit {

  quartiers;
  communueID;
  // tslint:disable-next-line:max-line-length
  constructor(public toastCtrl: ToastController, private http: Http, public activeRoute: ActivatedRoute, public router: Router, public dataService: DataService) { }

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

   // Get quartier ID
   getQuartierID(quartierID) {
    console.log('Quartier clicked');
    this.router.navigate(['/list-pdv', quartierID]);
    return this.dataService.setQuartierID(quartierID);
  }

  ngOnInit() {
      // Receive villes parameters
      this.communueID = this.activeRoute.snapshot.paramMap.get('id');
      console.log('received', this.communueID);

      // sending villes to view
      const quartierURL = 'https://sobravo.ga/index.php/api/commune/commune_quartier/';
      console.log(this.http.get(encodeURI(quartierURL + '/' + this.communueID)));
      this.http.get(encodeURI(quartierURL + '/' + this.communueID)).subscribe(res => {
          this.quartiers = res.json();
          console.log(this.quartiers);
      }, err => {
        this.failureToast();
      });
  }

}
