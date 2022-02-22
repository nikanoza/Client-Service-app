import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { faPlusCircle, faPenToSquare, faTrashCan, faMagnifyingGlass, faExclamation } from '@fortawesome/free-solid-svg-icons';
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
  faMagnifyingGlass = faMagnifyingGlass;
  faExclamation = faExclamation;

  error = null;
  searchedPersonId = '';
  filterForm!: FormGroup;

  clients: Client[] = [];
  

  constructor(private route: Router, private clientService: ClientService) {}

  ngOnInit(): void {
    this.onFetchClientsData();

    this.filterForm = new FormGroup({
      'name': new FormControl(''),
      'surname': new FormControl(''),
      'country': new FormControl(''),
      'city': new FormControl('')
    })
  }

  onCreatClient(){//navigate to new client page for create 
    this.route.navigate(['new-client']);
  }

  onDeleteClient(index: number){
    const check = confirm("ნამდვილად გსურთ კლიენტის წაშლა?");
    if(check){
      const client = this.clients[index];
      this.clientService.deleteClient(client);
      this.clientService.postClientsData(this.clientService.clients)
      .subscribe(
      postData=> {

      },
      error => {
        
      }
      );
    };
    this.clients.splice(index,1);
  }

  onFetchClientsData(){
    this.clientService.fetchClientsData()
    .subscribe(
      (data) => {
        this.clientService.updateClients(data);
        this.clients = this.clientService.clients;
      },
      (error) => {
        this.error = error.message
      }
    );
  }

  getSearchPersonId(event: any){
    this.searchedPersonId = event.target.value;
  }

  onSearchByPersonId(){
    const client = this.clientService.clients.find( client => client.person_id === this.searchedPersonId);
    if(client){
      this.clients = [client];
    }else{
      this.clients = [];
    }

    if(this.searchedPersonId.length < 1){
      this.clients = this.clientService.clients;
    }
  }

  onFilterClients(){
    const filterObj = this.filterForm.value;
    this.clients = this.clientService.clients;
    this.clients = this.clients.filter( 
      (client:any) => {
        
        const nameBoolean = filterObj.name.length > 0 ? filterObj.name == client.name : true;
        const surnameBoolean = filterObj.surname.length > 0 ? filterObj.surname == client.surname : true;
        const countryBoolean = filterObj.country.length > 0 ? filterObj.country == client.actual_address.actual_country : true;
        const cityBoolean = filterObj.city.length > 0 ? filterObj.city == client.actual_address.actual_city : true;

        if(nameBoolean && surnameBoolean && countryBoolean && cityBoolean) return client;
      }
    );
  }

  changeSort(event:any){
    if(event.target.value == 'namesUp'){
      this.clients.sort( 
        (clientA: any, clientB: any) =>  
        (clientA.name > clientB.name)? 1 :
        (clientA.name < clientB.name)? -1 : 0
      );
    };

    if(event.target.value == 'namesDown'){
      this.clients.sort( 
        (clientA: any, clientB: any) =>  
        (clientA.name > clientB.name)? -1 :
        (clientA.name < clientB.name)? 1 : 0
      );
    };

    if(event.target.value == 'surnamesUp'){
      this.clients.sort( 
        (clientA: any, clientB: any) =>  
        (clientA.surname > clientB.surname)? 1 :
        (clientA.surname < clientB.surname)? -1 : 0
      );
    };

    if(event.target.value == 'surnamesDown'){
      this.clients.sort( 
        (clientA: any, clientB: any) =>  
        (clientA.surname > clientB.surname)? -1 :
        (clientA.surname < clientB.surname)? 1 : 0
      );
    };
  };

  onEditClient(index: number){
    const clientId = this.clients[index].id;
    this.route.navigate(['client', clientId, 'edit']);
  }

  onSingleClientPage(index: number){
    const clientId = this.clients[index].id;
    this.route.navigate(['client', clientId]);
  }
}
