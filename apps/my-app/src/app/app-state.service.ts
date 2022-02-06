import { Injectable } from '@angular/core';
import { StateService } from '@nx-test/my-lib-js';

@Injectable({
  providedIn: 'root'
})
export class AppStateService extends StateService<any>{

  constructor() {
    super({})
  }
}
