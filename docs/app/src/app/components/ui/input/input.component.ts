import { Component } from '@angular/core';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class Input {
  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
