import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Client } from "../models/client.model";

@Injectable({
    providedIn: 'root'
})
export class ClientService{
    constructor(private http: HttpClient){}

    addClient(client: Client){
        return this.http.post('https://clients-service-app-default-rtdb.firebaseio.com/clients.json', client);
    }

    fetchClientsData(){
        return this.http.get('https://clients-service-app-default-rtdb.firebaseio.com/clients.json')
        .pipe(map( request => {
            const clientArray = [];
            const values = Object.values(request);
            const keys = Object.keys(request);
            for(let i = 0; i < values.length; i++){
                clientArray.push({...values[i], encryption_key: keys[i]});
            };
            return clientArray;
        }))
    }
}