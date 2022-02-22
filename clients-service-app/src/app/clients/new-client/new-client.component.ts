import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate-guard.service';

import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit, CanComponentDeactivate {

  clients: Client[] = [];
  client!: FormGroup;
  clicked = false;
  clientIsUniq = true;
  clientSaved = true;
  editClient = false;
  editClientId = 0;
  postClient = false;
  buttonText = 'კლიენტის დამატება';

  constructor(private clientService: ClientService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onFetchClientsdata();

    this.client = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.checkNameValidity.bind(this)]),
      'surname': new FormControl(null, [Validators.required, this.checkNameValidity.bind(this)]),
      'person_id': new FormControl(null, [Validators.required, this.checkPersonIdValidity.bind(this)]),
      'mobile': new FormControl(5, [Validators.required, this.checkMobileValidity.bind(this)]),
      'legal_address': new FormGroup({
        'legal_country': new FormControl(null, Validators.required),
        'legal_city': new FormControl(null, Validators.required),
        'legal_address': new FormControl(null, Validators.required),
      }),
      'actual_address': new FormGroup({
        'actual_country': new FormControl(null, Validators.required),
        'actual_city': new FormControl(null, Validators.required),
        'actual_address': new FormControl(null, Validators.required),
      }),
      'gender': new FormControl("female", Validators.required)
    });
    this.getEditRoute();
    this.enterValuesForEdit();
    this.changesStatus();
  }

  onSubmitForm(){
    this.clicked = true;
    this.postClient = false;
    if(!this.editClient){
      if(this.client.valid){
        const newClient = {
          ...this.client.value,
          id: this.clients.length + 1
        }
      this.clients.push(newClient);
       this.clientService.postClientsData(this.clients).subscribe(
          request => {
            this.client.reset();
            this.client.get('mobile')?.setValue(5);
            this.client.get('gender')?.setValue("female");
            this.postClient = true;
            this.clientSaved = true;
            setTimeout( ()=>{
              this.postClient = false;
            }, 3000);
          }
        );
      };
    }else{
      if(this.client.valid){
        const newClient = {
          ...this.client.value,
          id: this.editClientId
        };

        this.clientService.updateClient(newClient);
        const newClients = this.clientService.clients;
        this.clientService.postClientsData(newClients).subscribe(
          request => {
            this.postClient = true;
            this.clientSaved = true;
            setTimeout( ()=>{
              this.postClient = false;
            }, 3000);
          },
          (error) => {

          }
        );
      }  
    }
  }

  onFetchClientsdata(){
    this.clientService.fetchClientsData()
    .subscribe(
      data => {
        this.clientService.updateClients(data);
        this.clients = this.clientService.clients;
      }
    );
  }

  checkNameValidity(control: FormControl): {[k: string]: boolean} | null {
    const eng = (/^[a-zA-z]{2,50}$/).test(control.value);
    const geo = (/^[ა-ჰ]{2,50}$/).test(control.value)
    if(eng || geo){
      return null;
    };
    return {'chackNameValidity': true}
  }

  checkPersonIdValidity(control: FormControl): {[k: string]: boolean} | null {
    this.clientIsUniq = true;
    const combination = (/^[0-9]{11}$/).test(control.value);
    const findSameId = this.clients.find( client => client.person_id == control.value);
    if(findSameId){ 
      this.clientIsUniq = false;
    }
    if(combination && !findSameId){
      return null;
    }
    return { 'checkPersonIdValidity': true}
  }

  checkMobileValidity(control: FormControl): {[k: string]: boolean} | null {
    if(control.value > 5 * 10**8 - 1 && control.value < 6*10**8){
      return null;
    }
    return {'checkMobileValidity': true};
  }

  changesStatus(){
    this.client.valueChanges.subscribe(
      value => {
        if(this.clientSaved){
          this.clientSaved = false;
        }
      }
    )
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean>{
    if(this.clientSaved){
      return true;
    }else{
      return confirm('გვერდის დატოვების შემთხვევაში შევსებული მონაცემები დაიკარგება. გსურთ გვერდის დატოვება?');
    }
  };

  getEditRoute(){
    this.editClient = this.route.snapshot.data['edit'];
  }

  enterValuesForEdit(){
    if(this.editClient){
      this.route.data.subscribe(
        (data: Data) =>{
          const obj = data['client'];
          this.client.get('name')?.setValue(obj.name);
          this.client.get('surname')?.setValue(obj.surname);
          this.client.get('person_id')?.setValue(obj.person_id);
          this.client.get('mobile')?.setValue(obj.mobile);
          this.client.get('legal_address')?.setValue(obj.legal_address);
          this.client.get('actual_address')?.setValue(obj.actual_address);
          this.client.get('gender')?.setValue(obj.gender);
          this.editClientId = obj.id;
        }
      );

      this.buttonText = 'ცვლილებების შენახვა';
    }
  }
}
