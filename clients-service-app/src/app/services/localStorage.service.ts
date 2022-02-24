import { JsonPipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class localService {
    saveFilterProperties(object: object){
        const obj = JSON.stringify(object);
        localStorage.setItem('filterObj', obj);
    }

    getFilterProperties(){
        const data = localStorage.getItem('filterObj');
        return JSON.parse(data || '{}');
    }
}