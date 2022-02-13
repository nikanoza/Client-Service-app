import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageSnippet } from 'src/app/models/image.model';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  client!: FormGroup;
  selectedFile!: ImageSnippet;
  clicked = false;

  constructor() { }

  ngOnInit(): void {
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
    })
  }

  onAddClient(){
    this.clicked = true;
    console.log(this.client.get('name')?.valid)
  }

  onUploadImage(event: any){
    console.log(event)
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
    if((/^[0-9]{11}$/).test(control.value)){
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

}
