import { Component, Inject } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'counter',
  template: ` <p>{{ counterService.count }}</p> `,
  styles: `
    p {
      font-size: 48px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 3rem;
    }
  `,
})
export class Counter {
  constructor(readonly counterService: CounterService) {}
}
