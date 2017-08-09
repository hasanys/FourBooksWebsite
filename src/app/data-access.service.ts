import { Injectable } from '@angular/core';

@Injectable()
export class DataAccessService {

  constructor() { }
  
  myData() { return 'Test Data!'; }
  
}
