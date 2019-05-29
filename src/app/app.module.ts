import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions  } from '@ionic-native/camera/ngx';
import { HTTP } from '@ionic-native/http/ngx';

import { IonicStorageModule } from '@ionic/storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { File } from '@ionic-native/file/ngx';

import { FilePath } from '@ionic-native/file-path/ngx';

import {WebView} from '@ionic-native/ionic-webview/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  // tslint:disable-next-line:max-line-length
  imports: [FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule, MatFormFieldModule,
     BrowserAnimationsModule, MatButtonModule, BrowserModule,
      IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [
    Camera,
    WebView,
    HTTP,
    File,
    FilePath,
    FileTransfer,
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}