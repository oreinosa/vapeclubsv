import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ComponentLoaderService {
  rootViewContainer: any;
  factoryResolver: any;

  constructor(
    @Inject(ComponentFactoryResolver) factoryResolver,
    public component: any
  ) {
    this.factoryResolver = factoryResolver;
  }
  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }
  addDynamicComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(
      this.component
    );
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }
}
