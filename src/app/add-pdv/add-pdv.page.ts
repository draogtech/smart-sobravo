import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Http, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingControlService } from '../loading-control.service';


@Component({
  selector: 'app-add-pdv',
  templateUrl: './add-pdv.page.html',
  styleUrls: ['./add-pdv.page.scss'],
})
export class AddPDVPage implements OnInit {

  quartierID;
  // tslint:disable-next-line:max-line-length
  constructor(public route: Router , public loadingService: LoadingControlService, public toastCtrl: ToastController, public activeRoute: ActivatedRoute, private http: Http, private router: Router, public dataService: DataService) { }

  async presentToast(toastMsg) {
    const toast = await this.toastCtrl.create({
      message: toastMsg,
      duration: 8000
    });
    toast.present();
  }


  addPoint(formValue: any) {

    console.log('form data', formValue);

    const body = new FormData();
    body.append('telephone1', formValue.telephone1);
    body.append('phone_client', formValue.phone_client);
    body.append('nom_gerant', formValue.nom_gerant);
    body.append('nom_point_vente', formValue.nom_point_vente);
    body.append('quartier_id', this.dataService.quartierID);

    this.loadingService.showLoader('Adding PDV Point');

    const addPointURL = 'https://sobravo.ga/index.php/api/point/add_new_point';
    this.http.post(addPointURL, body).subscribe(res => {
        console.log(res);
        this.presentToast('PDV Point added successfully');
        this.route.navigateByUrl('/list-pdv/:id');
    },
    err => {
      this.presentToast('Failed to add PDV point, please try again or contact administrator');
      console.log(err);
    });
  }


  ngOnInit() {
    // Receive Quartier ID
    console.log('receingg g gg');
    this.quartierID = this.dataService.quartierID;
    console.log('received', this.quartierID);
  }

}
