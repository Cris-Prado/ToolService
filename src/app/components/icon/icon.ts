import { Component, computed, signal } from '@angular/core';
import { LucideDynamicIcon, LucideCircleCheck, LucideCircleX } from '@lucide/angular';
import { icons, IconName } from '../../shared/icons/icons';
import { input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [LucideDynamicIcon],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly icon = computed(() => icons[this.name()]);
}
