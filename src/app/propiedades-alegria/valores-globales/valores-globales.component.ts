import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-valores-globales',
  standalone: true,
  imports: [RouterOutlet],
  template: ` 
  <router-outlet></router-outlet>
`
})
export class ValoresGlobalesComponent {

}
