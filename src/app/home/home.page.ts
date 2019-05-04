import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inputNumber: string;
  key: string = 'number';

  constructor(private storage: Storage){}
  saveNumero() {
    // set a key/value
    this.storage.set(this.key, this.inputNumber);
  }
}
