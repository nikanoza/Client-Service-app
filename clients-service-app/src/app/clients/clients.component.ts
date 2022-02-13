import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  faPlusCircle = faPlusCircle;

  constructor(private route: Router) {}

  ngOnInit(): void {

  }

  onCreatClient(){//navigate to new client page for create 
    this.route.navigate(['new-client'], );
  }

}
