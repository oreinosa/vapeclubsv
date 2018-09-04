import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-profile-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  @Input() user: User;
  constructor(
  ) { }

  ngOnInit() {
  }

}
