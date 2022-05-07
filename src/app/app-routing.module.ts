import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MatchsComponent } from './match/match.component';
import { ArbitresComponent } from './arbitres/arbitres.component';
import { ArbitragesComponent } from './arbitrage/arbitrage.component';

const routes: Routes = [
 
  {
    path: 'matchs',
    component: MatchsComponent,
    data: {
      title: 'matchs'
    }
  },
  {
    path: 'arbitres',
    component: ArbitresComponent,
    data: {
      title: 'arbitres'
    }
  },
  {
    path: 'arbitrages',
    component: ArbitragesComponent,
    data: {
      title: 'arbitrages'
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
