import { Component } from '@angular/core';

@Component({
  selector: 'app-input-label',
  imports: [],
  templateUrl: './input-label.html',
  styleUrl: './input-label.css',
})
export class InputLabel {
  label: string = '';
  icon: string = '';
  type: string = 'text';
  name: string = '';
  id: string = '';
  placeholder: string = '';
}
