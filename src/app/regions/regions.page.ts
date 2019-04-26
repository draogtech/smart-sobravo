import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {

  constructor(private dataService: DataService) {
  }

  regions;


  ngOnInit() {
    this.regions = this.dataService.getRegions();
    // this.regions.subscribe(res => {
    //   console.log(res);
    // });
  }
}
