import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  Inject,
  ComponentFactoryResolver
} from "@angular/core";

@Component({
  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"]
})
export class ActionComponent implements OnInit {
  @Input()
  action: any;

  @ViewChild("componentTemplate", {
    read: ViewContainerRef
  })
  viewContainerRef: ViewContainerRef;
  rootViewContainer: any;
  factoryResolver: any;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  ngOnInit() {
    if (this.action.component) {
      this.setRootViewContainerRef(this.viewContainerRef);
      this.addDynamicComponent();
    }
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(
      this.action.component
    );
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }
}
