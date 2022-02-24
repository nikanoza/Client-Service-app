import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Client } from "../models/client.model";
import { ClientService } from "../services/client.service";


@Injectable({
    providedIn: 'root'
})
export class ClientsResolver implements Resolve<Client>{

    constructor(private clientService: ClientService){}
   
    //კლიენტის მონაცემების გადაცემა კომპონენტისთვის რედაქტირებისას ან პერსონალურ ფეიჯზე გადასვლისას
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<Client> | Promise<Client> { 
        
        return this.clientService.getClient(+route.params['id']);
    }
}