import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './components/ui/button/button.component';
import { WordTag } from './components/word/word-tag.component';
import { CounterService } from './services/counter.service';
import { Counter } from './components/count.component';
import { Input } from './components/ui/input/input.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, WordTag, Counter, Input],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CounterService],
})
export class AppComponent {
  title = 'app';
}
