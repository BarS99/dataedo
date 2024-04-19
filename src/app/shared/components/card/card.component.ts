import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @ContentChild('image', { read: TemplateRef })
  public image?: TemplateRef<any>;

  @ContentChild('subtitle', { read: TemplateRef })
  public subtitle?: TemplateRef<any>;

  @ContentChild('title', { read: TemplateRef })
  public title?: TemplateRef<any>;

  @ContentChild('content', { read: TemplateRef })
  public content?: TemplateRef<any>;
}
