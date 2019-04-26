import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'regions', loadChildren: './regions/regions.module#RegionsPageModule' },
  { path: 'villes', loadChildren: './villes/villes.module#VillesPageModule' },
  { path: 'communues', loadChildren: './communues/communues.module#CommunuesPageModule' },
  { path: 'quartier', loadChildren: './quartier/quartier.module#QuartierPageModule' },
  { path: 'list-pdv', loadChildren: './list-pdv/list-pdv.module#ListPDVPageModule' },
  { path: 'pdvdetails', loadChildren: './pdvdetails/pdvdetails.module#PDVDetailsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
