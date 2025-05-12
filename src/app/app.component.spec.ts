import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule }   from '@angular/router/testing';
import { AppComponent }          from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // для <router-outlet>
        AppComponent         // standalone-компонент
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'angular-aggrid-hello-world'`, () => {
    expect(component.title).toEqual('angular-aggrid-hello-world');
  });

  it('should render title in an <h1> tag', () => {
    const h1 = nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1!.textContent).toContain('angular-aggrid-hello-world');
  });
});
