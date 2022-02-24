import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Account } from "../models/account.model";

@Injectable({
    providedIn: 'root'
})
export class AccountService{
    constructor(private http:HttpClient){}

    postAccountsData(acounts: Account[]){
        return this.http.put('https://clients-service-app-default-rtdb.firebaseio.com/acounts.json', acounts);
    };

    fetchAccountsData(){
        return this.http.get('https://clients-service-app-default-rtdb.firebaseio.com/acounts.json')
        .pipe(map( request => {
            const acountArray = [];
            const values = Object.values(request);
            for(let i = 0; i < values.length; i++){
                acountArray.push({...values[i]});
            };
            return acountArray;
        }))
    };

}