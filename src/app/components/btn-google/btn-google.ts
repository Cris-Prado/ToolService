import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-btn-google',
  imports: [],
  templateUrl: './btn-google.html',
  styleUrl: './btn-google.css',
})
export class BtnGoogle {
   @Input() loading = false;

  @Output() googleClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.loading) {
      this.googleClick.emit();
    }
  }
}
