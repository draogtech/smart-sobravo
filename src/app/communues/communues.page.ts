import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-communues',
  templateUrl: './communues.page.html',
  styleUrls: ['./communues.page.scss'],
})
export class CommunuesPage implements OnInit {

  communues;
  ville;
  constructor(public toastCtrl: ToastController, private http: Http, public activeRoute: ActivatedRoute, public router: Router) { }

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

  // Get communue ID
  getCommunueID(communueID){
    console.log('communue clicked');
    this.router.navigate(['/quartiers', communueID]);
  }

  ngOnInit() {
       // Receive villes parameters
       this.activeRoute.params.subscribe(params => {
        this.ville = params['ville'];
        console.log('received', this.ville);
    });

      // sending villes to view
       const communueURL = 'https://sobravo.ga/index.php/api/commune/commune_of_ville/';
       console.log(this.http.get(encodeURI(communueURL + '/' + this.ville)));
       this.http.get(encodeURI(communueURL + '/' + this.ville)).subscribe(res => {
          this.communues = res.json();
          console.log(this.communues);
      }, err => {
        console.log(err);
        this.failureToast();
      });
  }

}
