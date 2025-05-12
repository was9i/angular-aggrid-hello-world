// hello-world.component.ts
import { Component } from '@angular/core';
import { AgGridModule } from '@ag-grid-community/angular';
import { ColDef } from '@ag-grid-community/core';

interface Car {
  make: string;
  model: string;
  price: number;
}

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [
    AgGridModule   // <-- импортируем модуль, а не только директиву
  ],
  template: `
    <h1>Hello World</h1>
    <ag-grid-angular
      class="ag-theme-alpine"
      style="width: 600px; height: 300px;"
      [columnDefs]="columnDefs"
      [rowData]="rowData">
    </ag-grid-angular>
  `,
  styles: [`
    h1 { text-align: center; margin-bottom: 1rem; }
  `]
})
export class HelloWorldComponent {
  columnDefs: ColDef<Car>[] = [
    { field: 'make', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
  ];

  rowData: Car[] = [
    { make: 'Toyota', model: 'Camry', price: 35000 },
    { make: 'Ford',   model: 'Mustang', price: 45000 },
    { make: 'Chevrolet', model: 'Corvette', price: 60000 },
  ];
}
