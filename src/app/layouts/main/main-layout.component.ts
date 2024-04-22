import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContainerComponent } from '@app/shared/components/container/container.component';
import { ButtonDirective } from '@app/shared/directives/button.directive';

interface HeaderItem {
  text: string;
  href: string;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonDirective,
    ContainerComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  public headerItems: HeaderItem[] = [
    {
      text: 'People',
      href: '/people',
    },
    {
      text: 'About',
      href: '/about',
    },
  ];
}
