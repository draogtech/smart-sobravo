import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-villes',
  templateUrl: './villes.page.html',
  styleUrls: ['./villes.page.scss'],
})
export class VillesPage implements OnInit {

  villes;
  region;
  constructor(public toastCtrl: ToastController, private http: Http, public activeRoute: ActivatedRoute, public router: Router) {}

  clickVille(ville) {
    console.log('ville clicked');
    this.router.navigate(['/communues', ville]);
  }

  ngOnInit() {
      // Receive villes parameters
      this.activeRoute.params.subscribe(params => {
        this.region = params['region'];
        console.log('received', this.region);
    });

    // sending villes to view
      const villeURL = 'https://sobravo.ga/index.php/api/commune/ville_of_region';
      console.log(this.http.get(encodeURI( villeURL + '/' + this.region)));
      this.http.get(encodeURI( villeURL + '/' + this.region)).subscribe(res => {
        this.villes = res.json();
        console.log(this.villes);
    });

  }

}
