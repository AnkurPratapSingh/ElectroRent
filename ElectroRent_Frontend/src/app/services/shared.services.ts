// shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private roleSubject = new BehaviorSubject<string>(''); // Default value can be an empty string or any other default role you want
  public role$ = this.roleSubject.asObservable();

  constructor() {
    // Get the role from local storage when the service is created
    const role = localStorage.getItem('role');
    if (role) {
      this.roleSubject.next(role);
    }
  }

  setRole(role: string) {
    this.roleSubject.next(role);
    // Save the role to local storage
    localStorage.setItem('role', role);
  }

  getRole(): string {
    return this.roleSubject.getValue();
  }
}
