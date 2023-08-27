import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-field.component.html',
  styleUrls: ['./info-field.component.scss'],
})
export class InfoFieldComponent {
  @Input() label: string = '';
  @Input() value: string = '';
}
