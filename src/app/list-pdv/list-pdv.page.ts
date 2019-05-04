import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list-pdv',
  templateUrl: './list-pdv.page.html',
  styleUrls: ['./list-pdv.page.scss'],
})
export class ListPDVPage implements OnInit {
  listPDV;
  quartierID;
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

  // Get PDV ID
   getPDVID(pdvID) {
    console.log('pdv list clicked', pdvID);
    this.router.navigate(['/pdvdetails', pdvID]);
    return this.dataService.setPDVID(pdvID);
  }

  // Load Add Point Page
  gotoAddPointPage() {
    console.log('add point button clicked');
    this.router.navigate(['/add-pdv']);
  }

  ngOnInit() {

      // Receive communues parameters
      // this.quartierID = this.activeRoute.snapshot.paramMap.get('id');
      this.quartierID = this.dataService.quartierID;
      console.log('received', this.quartierID);

      // sending communues to view
      const listPDVURL = 'https://sobravo.ga/index.php/api/commune/quartier_pdv/';
      console.log(this.http.get(encodeURI(listPDVURL + '/' + this.quartierID)));
      this.http.get(encodeURI(listPDVURL + '/' + this.quartierID)).subscribe(res => {
          this.listPDV = res.json();
          console.log(this.listPDV);
          this.dataService.getPDVList(this.listPDV);
      }, err => {
        this.failureToast();
      });
  }

}
