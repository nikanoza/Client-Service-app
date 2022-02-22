
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Client } from "../models/client.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService{
    constructor(private http: HttpClient){}

    clients: Client[] = [];

    postClientsData(clients: Client[]){
        return this.http.put('https://clients-service-app-default-rtdb.firebaseio.com/clients.json', clients);
    }

    fetchClientsData(){
        return this.http.get('https://clients-service-app-default-rtdb.firebaseio.com/clients.json')
        .pipe(map( request => {
            const clientArray = [];
            const values = Object.values(request);
            for(let i = 0; i < values.length; i++){
                clientArray.push({...values[i]});
            };
            return clientArray;
        }))
    }

    updateClients(array: Client[]){
        this.clients = array;
    }

    updateClient(client:Client){
        const index = this.clients.findIndex( obj => obj.id === client.id);
        this.clients[index] = client;
        console.log(this.clients);
    };

    deleteClient(client:Client){
        const index = this.clients.findIndex( obj => obj.id === client.id);
        this.clients.splice(index,1);
    }

    getClient(id:number){
        return this.clients.find( client => client.id === id);
    }
}