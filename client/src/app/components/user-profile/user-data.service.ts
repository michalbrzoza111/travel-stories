import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserDataService {
  private userData = new BehaviorSubject({});
  currentUserData = this.userData.asObservable();

  constructor() { }

  setCurrentUserData(data) {
    this.userData.next(data)
  }
}
