import { Component } from '@angular/core';
import { AppStateService } from './app-state.service';

@Component({
  selector: 'nx-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-app';

  constructor(private appStateService: AppStateService) {
  }
}
