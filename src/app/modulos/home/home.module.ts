import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './componentes/home/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
