// File: hello-world.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HelloWorldComponent } from './hello-world.component';

// Register AG Grid modules for the tests
ModuleRegistry.registerModules([ClientSideRowModelModule]);

describe('HelloWorldComponent', () => {
  let fixture: ComponentFixture<HelloWorldComponent>;
  let component: HelloWorldComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HelloWorldComponent,
        AgGridAngular,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HelloWorldComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Hello World heading', () => {
    const heading = nativeElement.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading!.textContent).toContain('Hello World');
  });

  it('should render AG Grid header columns', () => {
    const headerCells = Array.from(
      nativeElement.querySelectorAll('.ag-header-cell-text')
    ).map(el => el.textContent?.trim());

    expect(headerCells).toEqual(
      jasmine.arrayContaining(['Make', 'Model', 'Price'])
    );
  });

  it('should render correct number of rows', (done) => {
    // Wait for grid to finish initialising rows
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const rowElements = nativeElement.querySelectorAll(
        '.ag-center-cols-container .ag-row'
      );
      expect(rowElements.length).toBe(3);

      const firstRowCells = Array.from(
        rowElements[0].querySelectorAll('.ag-cell')
      ).map(cell => cell.textContent?.trim());
      expect(firstRowCells).toEqual(['Toyota', 'Camry', '35000']);
      done();
    });
  });

  it('should support sorting on a column', (done) => {
    // Simulate clicking on the Price header to sort ascending
    const priceHeader = nativeElement.querySelector(
      '.ag-header-cell[col-id="price"] .ag-header-cell-text'
    ) as HTMLElement;
    priceHeader.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const values = Array.from(
        nativeElement.querySelectorAll(
          '.ag-center-cols-container .ag-row .ag-cell[col-id="price"]'
        )
      ).map(el => el.textContent?.trim());
      // Prices should be in ascending order: 35000, 45000, 60000
      expect(values).toEqual(['35000', '45000', '60000']);
      done();
    });
  });
});
