import {SpyObject} from "@ngneat/spectator";
import {AppComponent} from "./app.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator/jest";

describe("App component",()=>{
  let spectator:Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component:AppComponent
  })

  beforeEach(()=>{
    spectator = createComponent();
  })

  it("Should create component (smoke)",()=>{
    expect(spectator.component).toBeDefined();
  })
})
