import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'regions', loadChildren: './regions/regions.module#RegionsPageModule' },
  { path: 'villes/:region', loadChildren: './villes/villes.module#VillesPageModule' },
  { path: 'communues/:ville', loadChildren: './communues/communues.module#CommunuesPageModule' },
  { path: 'quartiers/:id', loadChildren: './quartier/quartier.module#QuartierPageModule' },
  { path: 'list-pdv/:id', loadChildren: './list-pdv/list-pdv.module#ListPDVPageModule' },
  { path: 'pdvdetails/:id', loadChildren: './pdvdetails/pdvdetails.module#PDVDetailsPageModule' },
  { path: 'add-pdv', loadChildren: './add-pdv/add-pdv.module#AddPDVPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
