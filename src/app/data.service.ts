import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  regions: any;
  villes: any;
  region;
  quartierID;
  pdvID;
  pdvList;
  numero;

  constructor(private storage: Storage, private http: Http, public activeRoute: ActivatedRoute, public router: Router) {
  }


  public getNumero() {
    // Get numero from storage
    const key = 'number';
    this.storage.get(key).then((val) => {
      console.log('your numero is:', val);
      this.numero = val;
    });
  }

  public setRegions() {
    const url = 'https://sobravo.ga/index.php/api/commune/regions';
    return this.http.get(url);
  }

  setQuartierID(id) {
    this.quartierID = id;
    console.log('setting quartier id', this.quartierID);
  }

  getQuartierID() {
    console.log('getting quartier id', this.quartierID);
    return this.quartierID;
  }

  setPDVID(id) {
    this.pdvID = id;
    console.log('setting PDV id', this.pdvID);
  }

  getPDVID() {
    console.log('getting PDV id', this.pdvID);
    return this.pdvID;
  }

  getPDVList(pdvList) {
    console.log('getting PDV List', pdvList);
    this.pdvList = pdvList;
  }


//   // Get quartier ID
//   public getQuartierID(quartierID) {
//    console.log('Quartier clicked');
//    this.quartierID = quartierID;
//    this.router.navigate(['/list-pdv', quartierID]);
//    console.log(quartierID);
//  }

}
