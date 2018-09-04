import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-crud-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  @Input()
  className: string;
  @Input()
  templateRef;
  constructor() {}

  ngOnInit() {}
}
