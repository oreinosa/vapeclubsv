import { Component, OnInit, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-crud-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  @Input()
  className: string;
  @Input()
  objects: any[];
  @Input()
  templateRef;

  constructor() {}

  ngOnInit() {
    // console.log(this.templateRef);
  }
}
