import { Component, OnInit, Input } from '@angular/core';
import { Presentation } from '../../../shared/models/presentation';

@Component({
  selector: 'app-welcome-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  @Input() presentation: Presentation;
  constructor() { }

  ngOnInit() {
  }

}
