import { ListserviceService } from './../../services/listservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  Records: any[] = [];
  showData = false;

  constructor(private listService: ListserviceService){

  }

  getRecords() {

    this.listService.getRecords().subscribe(
      (response: any) => {
        this.Records = response; // Asigna los datos recibidos al array de registros
        this.showData = true; // Mostras datos
      },
      (error: any) => {
        console.error(error); // Maneja el error en caso de que ocurra
      }
    );
  }






}

