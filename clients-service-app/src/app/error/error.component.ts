import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorMessage!: string;

  constructor(private rote: ActivatedRoute) { }

  ngOnInit(): void {
      this.errorMessage = this.rote.snapshot.data['message'];
  }

}
