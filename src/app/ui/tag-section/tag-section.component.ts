import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-section.component.html',
  styleUrls: ['./tag-section.component.scss'],
  host: {
    class:
      'flex flex-col gap-4 my-2 bg-slate-800 p-4 rounded-md cursor-pointer',
  },
})
export class TagSectionComponent {
  @Input() title: string = '';
  @Input() tags: string[] = [];

  @HostListener('click')
  onClick() {
    this._isExpanded = !this._isExpanded;
  }

  private _isExpanded: boolean = false;

  get isExpanded(): boolean {
    return this._isExpanded;
  }
}
