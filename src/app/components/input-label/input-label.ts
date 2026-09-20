import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-label',
  imports: [],
  templateUrl: './input-label.html',
  styleUrl: './input-label.css',
})
export class InputLabel {
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() inputName: string = '';  
  @Input() type: string = 'text';
}
