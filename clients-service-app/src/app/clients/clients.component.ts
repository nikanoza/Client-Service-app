import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { faPlusCircle, faPenToSquare, faTrashCan, faMagnifyingGlass, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { localService } from '../services/localStorage.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  animations: [  //ანიმაცია სიიდან კლიენტის წაშლისას
    trigger('clientState', [
      transition('* => void', animate(800, style({
        opacity: 0,
        transform: 'translateX(-150px)'
      })))
    ])
  ]
})
export class ClientsComponent implements OnInit, OnDestroy {
  //აიკონების ცვლადები
  faPlusCircle = faPlusCircle;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faMagnifyingGlass = faMagnifyingGlass;
  faExclamation = faExclamation;

  error = null;//ერორის მესიჯი
  searchedPersonId = '';//აიდის ცვლადი საძიებო ველისთვის
  filterForm: FormGroup = new FormGroup({ //ფილტრაციის ფორმა
    'name': new FormControl(''),
    'surname': new FormControl(''),
    'country': new FormControl(''),
    'city': new FormControl('')
  });
  sortValue = 'namesUp'; // სორტირებისას სელექთის მნიშვნელობის შესანახად

  clients: Client[] = []; //მასივი კლიენტთა სიის შესანახად
  

  constructor(private route: Router, private clientService: ClientService,
              private localSorageService: localService) {}

  ngOnInit(): void {
    this.onFetchClientsData();
  }

  onCreatClient(){//ნავიგაცია ახალი კლიენტის შექმნის გვერდზე
    this.route.navigate(['new-client']);
  }

  onDeleteClient(index: number){ //კლიენტის წაშლა
    const check = confirm("ნამდვილად გსურთ კლიენტის წაშლა?");
    if(check){
      const client = this.clients[index];
      this.clientService.deleteClient(client);
      this.clientService.postClientsData(this.clientService.clients)
      .subscribe(
      postData=> {

      },
      error => {
        this.error = error.message;
      }
      );
    };
    this.clients.splice(index,1);
  }

  onFetchClientsData(){ // კლიენტთა სიის მონაცემების წამოღება ბაზიდან
    this.clientService.fetchClientsData()
    .subscribe(
      (data) => {
        this.clientService.updateClients(data);
        this.clients = this.clientService.clients;
        this.getFiltervalues();
        this.onFilterClients();
        this.sortation(this.sortValue);
      },
      (error) => {
        this.error = error.message
      }
    );
  }

  getSearchPersonId(event: any){ // change ივენთი ჩაწერილი აიდის შესანახად
    this.searchedPersonId = event.target.value;
  }

  onSearchByPersonId(){// სერჩის აიკონზე დაჭერისას კლიენტის მოძებნის ფუნქცია
    const client = this.clientService.clients.find( client => client.person_id === this.searchedPersonId);
    if(client){
      this.clients = [client];
    }else{
      this.clients = [];
    }

    if(this.searchedPersonId.length < 1){ // თუ იუზერმა წაშალა ჩაწერილი აიდი, ცარიელზე გამოიტანოს ისევ მთლიანი სია
      this.clients = this.clientService.clients;
    }
  }

  onFilterClients(){ // ფილტრაციის ფუნქცია
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
      this.saveFilterValues();// ფილტრაციის მონაცემების შენახვა ბრაუზერის ისტორიაში
  }

  changeSort(event:any){ // სორტირება სელექთის ცვლილებისას
    this.sortation(event.target.value);
    this.sortValue = event.target.value;
    this.saveFilterValues();
  };

  sortation(string: string){ // სორტაციის ფუნქცია
    if(string == 'namesUp'){
      this.clients.sort( 
        (clientA: any, clientB: any) =>  
        (clientA.name > clientB.name)? 1 :
        (clientA.name < clientB.name)? -1 : 0
      );
    };

    if(string == 'namesDown'){
      this.clients.sort( 
        (clientA: any, clientB: any) =>  
        (clientA.name > clientB.name)? -1 :
        (clientA.name < clientB.name)? 1 : 0
      );
    };

    if(string == 'surnamesUp'){
      this.clients.sort( 
        (clientA: any, clientB: any) =>  
        (clientA.surname > clientB.surname)? 1 :
        (clientA.surname < clientB.surname)? -1 : 0
      );
    };

    if(string == 'surnamesDown'){
      this.clients.sort( 
        (clientA: any, clientB: any) =>  
        (clientA.surname > clientB.surname)? -1 :
        (clientA.surname < clientB.surname)? 1 : 0
      );
    };  
  }

  onEditClient(index: number){ // კლიენტის რედაქტირების გვერდზე გადასვლა
    const clientId = this.clients[index].id;
    this.route.navigate(['client', clientId, 'edit']);
  }

  onSingleClientPage(index: number){ // კლიენტის ნახვა
    const clientId = this.clients[index].id;
    this.route.navigate(['client', clientId]);
  };

  ngOnDestroy(): void { // კომპონენტის დატოვებისას ფილტრაციის და სორტირების მონაცემების შენახვა ბრაუზერის ისტორიაში
    this.saveFilterValues();
  }

  saveFilterValues(){
    const obj ={
      ...this.filterForm.value,
      'sort': this.sortValue
    }

    this.localSorageService.saveFilterProperties(obj);
  }

  getFiltervalues(){ // ფილტრაციის და სორტირების მონაცემების წამოღება 
    const obj = this.localSorageService.getFilterProperties();
    this.filterForm.get('name')?.setValue(obj.name);
    this.filterForm.get('surname')?.setValue(obj.surname);
    this.filterForm.get('country')?.setValue(obj.country);
    this.filterForm.get('city')?.setValue(obj.city);
    this.sortValue = obj.sort;
  }
}
