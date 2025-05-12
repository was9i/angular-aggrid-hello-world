// main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridModule } from '@ag-grid-community/angular';
import { HelloWorldComponent } from './app/hello-world/hello-world.component';

// сразу включаем продакшн-режим
enableProdMode();

// регистрируем клиент-сайд row-model
ModuleRegistry.registerModules([
  ClientSideRowModelModule
]);

bootstrapApplication(HelloWorldComponent, {
  providers: [
    provideRouter([]),
    importProvidersFrom(AgGridModule)  // все провайдеры AgGridModule
  ]
})
.catch(err => console.error(err));
