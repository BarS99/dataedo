import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionComponent } from '../../shared/components/section/section.component';
import { SanitizeHtmlPipe } from '../../shared/pipes/sanitize-html.pipe';
import { ContainerComponent } from '../../shared/components/container/container.component';

const MOCK_ABOUT_PAGE_TITLE = 'Recruitment Task';
const MOCK_ABOUT_PAGE_TEXT = `
  <p>
  Write application in Angular. The People and About tabs are separated
  pages (router outlets):
  </p>
  <br />
  <ul>
  <li>
    <span
      >The people tab should display a random user from randomuser.me API
      (photo and name). If a user clicks the “New” button the data should be
      reloaded with new data from the API. Also, every 5 seconds data should
      be reloaded, but the timer should reset every time the user clicks the
      “New” button and the timer should stop counting if the user’s cursor
      is under photo, name, or button (prevents from reloading data when for
      example user trying to copy name).
    </span>
  </li>
  <li>
    <span
      >About is a static page with a text description of the recruitment
      task (you're currently reading it).</span
    >
  </li>
  </ul>
  <br />
  <p>
  Both pages should look similar to the attached graphics. Please focus on
  code readability and application performance (imagine that these are only
  2 subpages of a huge application).
  </p>
`;
const MOCK_ABOUT_PAGE_TEXT_BOTTOM = `
  <p>
  The application should use the randomuser.me API.
  <br/ >
  See <a href="https://randomuser.me/documentation">https://randomuser.me/documentation</a> for more information.
  </p>
`;

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [ContainerComponent, SectionComponent, SanitizeHtmlPipe],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  public title: string = MOCK_ABOUT_PAGE_TITLE;
  public text: string = MOCK_ABOUT_PAGE_TEXT;
  public textBottom: string = MOCK_ABOUT_PAGE_TEXT_BOTTOM;
}
