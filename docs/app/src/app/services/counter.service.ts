import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  count: number = 0;

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  reset() {
    this.count = 0;
  }

  setCount(value: number) {
    this.count = value;
  }
}
