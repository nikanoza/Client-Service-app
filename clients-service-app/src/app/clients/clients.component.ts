import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faPlusCircle, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  error = null;

  clients: Client[] = [];

  constructor(private route: Router, private clientService: ClientService) {}

  ngOnInit(): void {
    this.onFetchClientsData();
  }

  onCreatClient(){//navigate to new client page for create 
    this.route.navigate(['new-client'], );
  }

  onDeleteClient(index: number){
    this.clients.splice(index,1)
    this.clientService.postClientsData(this.clients)
    .subscribe(
      postData=> {

      },
      error => {
        
      }
    )
  }

  onFetchClientsData(){
    this.clientService.fetchClientsData()
    .subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        this.error = error.message
      }
    )
   
  }

}
