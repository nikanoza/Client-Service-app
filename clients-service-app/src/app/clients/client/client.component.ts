import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { Client } from 'src/app/models/client.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  animations: [ //ანიმაცია ანგარიშების გამოჩენისას
    trigger('itemIn', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(150px)'
        }),
        animate(800)
      ])
    ])
  ]
})
export class ClientComponent implements OnInit {

  client!: Client; //კლიენტი
  getClientData = false; // დასრულდა ბაზიდან კლიენტის ინფორმაციის წამორება
  account!: FormGroup; // ანგარიშის დამატების ფორმა
  accounts: Account[] = []; // ანგარიშების სია
  client_accounts: Account[] = []; // აღნიშნული კლიენტის ანგარიშები
  getAccountsData = false; // დასრულდა ბაზიდან ანგარიშებზე ინფორმაციის წამოღება
  error = null; // ერორის მესიჯი

  constructor(private route: ActivatedRoute,
              private accountService:AccountService) { }

  ngOnInit(): void {
    this.fetchAccountsData(); // ანგარიშების წამოღება
    this.route.data.subscribe( // resolver-ის გამოყენება
      (data: Data) => {
        this.client = data['client'];
        this.getClientData = true;
      }
    );

    this.account = new FormGroup({
      'type': new FormControl('dagrovebiti', Validators.required),
      'currency': new FormControl('USD', Validators.required),
      'status': new FormControl('passive', Validators.required)
    })
  }

  onAddAccount(){ // ახალი ანგარიშის დამატება
    const obj = this.account.value;
    const newAccount = {
      ...obj,
      'client_id': this.client.id,
      'account_id': this.accounts.length+1
    }

    this.accounts.push(newAccount);
    this.accountService.postAccountsData(this.accounts)
    .subscribe(
      request => {
        this.fetchAccountsData();
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

  fetchAccountsData(){
    this.accountService.fetchAccountsData()
    .subscribe(
      data => {
        this.accounts = data;
        this.getClientAccounts();
        this.getAccountsData = true;
      }
    );
  }

  getClientAccounts(){
    this.client_accounts = this.accounts.filter( account => account.client_id === this.client.id);
  }

  onCloseAccount(account: Account){ // ანგარიშის დახურვა თუ აქტიურია
    if(account.status == 'active'){
      account.status = 'passive';
      this.accountService.postAccountsData(this.accounts)
      .subscribe(
        request => {
          
        },
        (error) => {
          this.error = error.message;
        }
      );
    }
  }
}
