import { Injectable } from '@angular/core';
// import { StateService } from 'my-lib-js'; // Large bundle size
import { StateService } from 'my-lib-angular'; // Normal bundle size


@Injectable({
  providedIn: 'root'
})
export class AppStateService extends StateService<any>{

  constructor() {
    super({})
  }
}
