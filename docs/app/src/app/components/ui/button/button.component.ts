import { Component } from '@angular/core';
import { CounterService } from '../../../services/counter.service';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class Button {
  constructor(protected readonly counterService: CounterService) {}

  showAlert() {
    window.alert('Clicked');
  }

  inc() {
    this.counterService.increment();
  }
}
