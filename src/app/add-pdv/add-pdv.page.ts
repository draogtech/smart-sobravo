import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Http, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingControlService } from '../loading-control.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pdv',
  templateUrl: './add-pdv.page.html',
  styleUrls: ['./add-pdv.page.scss'],
})
export class AddPDVPage implements OnInit {
  public addPointForm: FormGroup;
  isSubmitted  =  false;

  quartierID;
  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder, public route: Router , public loadingService: LoadingControlService, public toastCtrl: ToastController, public activeRoute: ActivatedRoute, private http: Http, private router: Router, public dataService: DataService) {
   }

  async presentToast(toastMsg) {
    const toast = await this.toastCtrl.create({
      message: toastMsg,
      duration: 8000
    });
    toast.present();
  }

  get formControls() { return this.addPointForm.controls; }


  addPoint() {
    this.isSubmitted = true;
    if (this.addPointForm.invalid) {
      return;
    } else {
      console.log('form data', this.addPointForm.value);

      const body = new FormData();
      body.append('telephone1', this.addPointForm.value.telephone1);
      body.append('phone_client', this.addPointForm.value.phone_client);
      body.append('nom_gerant', this.addPointForm.value.nom_gerant);
      body.append('nom_point_vente', this.addPointForm.value.nom_point_vente);
      body.append('adresse', this.addPointForm.value.adresse);
      body.append('type', this.addPointForm.value.type);
      body.append('quartier_id', this.dataService.quartierID);

      const addPointURL = 'https://sobravo.ga/index.php/api/point/add_new_point';
      this.http.post(addPointURL, body).subscribe(res => {
        this.loadingService.showLoader('Adding PDV Point');
        console.log(res);
        this.presentToast('Successfully added');
        this.route.navigateByUrl('/list-pdv/:id');
      },
      err => {
        this.presentToast(err);
        console.log(err);
      });
    }
  }


  ngOnInit() {
    // Receive Quartier ID
    console.log('receingg g gg');
    this.quartierID = this.dataService.quartierID;
    console.log('received', this.quartierID);

    this.addPointForm = this.formBuilder.group({
      telephone1: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
      phone_client: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
      nom_gerant: ['', Validators.required],
      nom_point_vente: ['', Validators.required],
      adresse: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

}
