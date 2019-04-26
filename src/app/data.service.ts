import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://sobravo.ga/index.php/api/commune/regions';

  constructor(private http: Http) {
  }

  getRegions() {
        this.http.get(this.url, {})
      .subscribe(data => {

        console.log(data.status);
        console.log(data); // data received by server

      });
      // .tap(error => {

      //   console.log(error.status);
      //   console.log(error.error); // error message as string

      // });
  }
}
