import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-link',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './sidebar-link.component.html',
  styleUrl: './sidebar-link.component.scss',
})
export class SidebarLinkComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) link!: string;
  @Input() icon?: string;
  @Input() iconClasses?: string;

  private _linkClasses: string = 'sidebar__link ';
  @Input() set linkClasses(value: string) {
    this._linkClasses += value;
  }
  public get linkClasses(): string {
    return this._linkClasses;
  }
}
