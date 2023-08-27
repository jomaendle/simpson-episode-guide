import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-section.component.html',
  styleUrls: ['./tag-section.component.scss'],
  host: {
    class: 'flex flex-col gap-4 my-2 bg-slate-800 p-4 rounded-md',
  },
})
export class TagSectionComponent {
  @Input() title: string = '';
  @Input() tags: string[] = [];

  private _isExpanded: boolean = false;

  get isExpanded(): boolean {
    return this._isExpanded;
  }

  onCollapse() {
    this._isExpanded = !this._isExpanded;
  }
}
