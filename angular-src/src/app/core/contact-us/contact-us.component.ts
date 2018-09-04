import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  lat: number = 13.681335;
  lng: number = -89.274182;
  zoom: number = 16; 
  constructor() { }

  ngOnInit() {
  }

  onSubmit(contact: any) {
    console.log(contact);
  }

}
