import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})


export class HelpComponent implements OnInit {
  questions = [
    'როგორ დავამატოთ კლიენტი?',
    'როგორ მოვძებნოთ კლიენტი სიაში?',
    'როგორ მოვახდინნოთ სიის დალაგება(სორტირება)?',
    'როგორ შევცვალოთ რომელიმე კლიენტის მონაცემები?',
    'როგორ ვნახოთ კლიენტზე დეტალური ინფორმაცია?',
    'როგორ დავამატოთ'
  ];

  answer = `Lorem Ipsum საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. 
            იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ 
            დაზგაზე წიგნის საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი არამარტო 5 საუკუნის 
            მანძილზე შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია.`;

  faPlusCircle = faPlusCircle;
  showState = 'none';          
  constructor() { }

  ngOnInit(): void {

  }

}
