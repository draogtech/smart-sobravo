import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DataService } from '../data.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingControlService } from '../loading-control.service';

@Component({
  selector: 'app-pdvdetails',
  templateUrl: './pdvdetails.page.html',
  styleUrls: ['./pdvdetails.page.scss'],
})
export class PDVDetailsPage implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(public  loadingSerice: LoadingControlService, private storage: Storage, public toastCtrl: ToastController, private geolocation: Geolocation, public dataService: DataService, private http: Http, public activeRoute: ActivatedRoute, public router: Router, public camera: Camera, private transfer: FileTransfer,) { }

  quartierID;
  pdvList;
  pdvDetails;
  telephone1;
  lat;
  lng;
  pdvID;
  imgData;



  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 8000
    });
    toast.present();
  }


  // GPS Location
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('lat: ' + resp.coords.latitude + '- long: ' + resp.coords.longitude);

       // Get numero from storage
      const key = 'number';
      this.storage.get(key).then((val) => {
        console.log('your numero is:', val);
        this.loadingSerice.showLoader('Updating GPS Location');
        // Updating GPS Location
        const gpsURL = 'https://sobravo.ga/index.php/api/point/update_coord';
        // tslint:disable-next-line:max-line-length
        this.http.get(encodeURI(gpsURL + '/' + this.pdvID + '/' + val + '/' + resp.coords.latitude + '/' + resp.coords.longitude)).subscribe(res => {
          this.presentToast('GPS Updated');
          console.log(res);
        },
        err => {
          this.presentToast('GPS not updated');
          console.log(err);
        });

    });

     }).catch((error) => {
       this.presentToast(error);
       console.log('Error getting location', error);
     });
  }


  // Upload Photo
  getPhoto() {
     const options = {
         quality: 100
      };

     this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:

            // const fileTransfer: FileTransferObject = this.transfer.create();

            // const options1: FileUploadOptions = {
            //       fileKey: 'file',
            //       fileName: 'name.jpg',
            //       headers: {}
            // };

            const key = 'number';
            this.storage.get(key).then((val) => {
            console.log('your numero is:', val);

            // Uploading image
            const uploadDetails = new FormData();
            uploadDetails.append('pdvFile', imageData);
            uploadDetails.append('updated_by', val);
            uploadDetails.append('pdv_id', this.pdvID);
            this.loadingSerice.showLoader('Uploading photo');
            const uploadURL = 'https://sobravo.ga/index.php/api/point/upload_file';
            this.http.post(uploadURL, uploadDetails).subscribe(res => {
                this.presentToast('Image upload successful');
                console.log(res);
            }, err => {
                this.presentToast('Image upload unsuccessful');
                console.log(err);
            });
            });
      });
  }


  branding() {

    // Get numero from storage
    const key = 'number';
    this.storage.get(key).then((val) => {
      console.log('your numero is:', val);

       // Updating Brand Status
      this.loadingSerice.showLoader('Updating branding status');
      const brandURL = 'https://sobravo.ga/index.php/api/point/change_brand';
      // tslint:disable-next-line:max-line-length
      this.http.put(encodeURI(brandURL + '/' + this.pdvID + '/' + val), null).subscribe(res => {
        this.presentToast('Brand Updated');
        console.log(res);
      },
      err => {
        this.presentToast('Brand not updated');
        console.log(err);
      });

    });
  }

  pdvStatus() {

      // Get numero from storage
      const key = 'number';
      this.storage.get(key).then((val) => {
        console.log('your numero is:', val);

        // Updating PDV Status
        this.loadingSerice.showLoader('Updating PDV status');
        const brandURL = 'https://sobravo.ga/index.php/api/point/change_status';
        // tslint:disable-next-line:max-line-length
        this.http.put(encodeURI(brandURL + '/' + this.pdvID + '/' + val), null).subscribe(res => {
          this.presentToast('Brand Updated');
          console.log(res);
        },
        err => {
          this.presentToast('Brand not updated');
          console.log(err);
        });
      });

  }


  ngOnInit() {
    // Receive QuartierID parameters
    this.quartierID = this.activeRoute.snapshot.paramMap.get('id');
    console.log('received', this.quartierID);


    // Getting PDV List
    const PDVURL = 'https://sobravo.ga/index.php/api/commune/quartier_pdv/';
    console.log(this.http.get(encodeURI(PDVURL + '/' + this.quartierID)));
    this.http.get(encodeURI(PDVURL + '/' + this.quartierID)).subscribe(res => {
        this.pdvList = res.json();

        console.log(this.pdvList);
          // tslint:disable-next-line:prefer-for-of
        for (const key of this.dataService.pdvList) {
          // console.log(key);
          if (key.id === this.dataService.pdvID) {
                this.pdvDetails = key;
                this.pdvID = this.pdvDetails.id;
                this.telephone1 = this.pdvDetails.telephone1;
                console.log(this.pdvDetails);
                break;
            }
        }
    });
  }

}
