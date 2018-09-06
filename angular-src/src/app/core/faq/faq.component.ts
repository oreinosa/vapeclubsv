import { Component, OnInit } from '@angular/core';
import { FAQ } from '../../shared/models/faq';
import { Observable } from 'rxjs';
import { FAQsService } from '../../admin/faqs/faqs.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs: Observable<FAQ[]>;
  constructor(
    private faqsService: FAQsService
  ) { }

  ngOnInit() {
    this.faqs = this.faqsService.allPublic().pipe(tap(data => console.log(data)));
  }

}
