import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,              // <— делаем standalone 
  imports: [RouterOutlet],        // <— подключаем RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // <— styleUrls, не styleUrl
})
export class AppComponent {
  title = 'angular-aggrid-hello-world';
}
