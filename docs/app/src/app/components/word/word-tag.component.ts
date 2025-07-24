import { Component, input } from '@angular/core';

@Component({
  selector: 'word-tag',
  template: ` <span class="word-tag">{{ word() }}</span> `,
  styles: `
    .word-tag {
      display: inline-flex;
      padding: 6px 10px;
      font-weight: 500;
    }
  `,
})
export class WordTag {
  word = input.required<string>();
}
