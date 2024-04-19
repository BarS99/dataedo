import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePageComponent } from './people-page.component';
import { RandomUserService } from '../../services/random-user.service';
import { User } from '../../models/user.model';
import { Observable, of, tap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

const userMock = {
  id: {
    name: 'name',
    value: 'value',
  },
  name: {
    first: 'first',
    last: 'last',
  },
  picture: {
    large: 'https://www.example.com/large-image-path',
  },
} as User;

describe('PeoplePageComponent', () => {
  let component: PeoplePageComponent;
  let fixture: ComponentFixture<PeoplePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeoplePageComponent],
    })
      .overrideComponent(PeoplePageComponent, {
        set: {
          providers: [
            {
              provide: RandomUserService,
              useValue: {
                getRandomUser: (): Observable<User | null> => of(null),
              },
            },
            {
              provide: ChangeDetectorRef,
              useValue: {},
            },
          ],
        },
      })
      .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(PeoplePageComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  describe('rendered content', () => {
    it('should display a user card if user is defined', () => {
      TestBed.overrideProvider(RandomUserService, {
        useValue: {
          getRandomUser: (): Observable<User | null> => of(userMock),
        },
      });
      fixture = TestBed.createComponent(PeoplePageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const image = fixture.debugElement.nativeElement.querySelector(
        '[data-test="image"]',
      ) as HTMLImageElement | null;
      const subtitle = fixture.debugElement.nativeElement.querySelector(
        '[data-test="subtitle"]',
      ) as HTMLParagraphElement | null;
      const title = fixture.debugElement.nativeElement.querySelector(
        '[data-test="title"]',
      ) as HTMLTitleElement | null;
      const button = fixture.debugElement.nativeElement.querySelector(
        '[data-test="button"]',
      ) as HTMLButtonElement | null;
      const error = fixture.debugElement.nativeElement.querySelector(
        '[data-test="spinner"]',
      ) as HTMLParagraphElement | null;
      const spinner = fixture.debugElement.nativeElement.querySelector(
        '[data-test="spinner"]',
      ) as HTMLElement | null;

      expect(image).toBeTruthy();
      expect(subtitle).toBeTruthy();
      expect(title).toBeTruthy();
      expect(button).toBeTruthy();
      expect(error).toBeFalsy();
      expect(spinner).toBeFalsy();
      expect(image?.src).toBe(userMock.picture.large);
      expect(subtitle?.textContent?.trim()).toBe('Hi, My name is');
      expect(title?.textContent?.trim()).toBe(
        `${userMock.name.first} ${userMock.name.last}`,
      );
      expect(button?.textContent?.trim()).toBe('New');
    });
  });

  it('should render a spinner if user is not defined and there is no error', () => {
    TestBed.overrideProvider(RandomUserService, {
      useValue: {
        getRandomUser: (): Observable<User | null> => of(null),
      },
    });
    fixture = TestBed.createComponent(PeoplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const card = fixture.debugElement.nativeElement.querySelector(
      '[data-test="card"]',
    ) as HTMLElement | null;
    const error = fixture.debugElement.nativeElement.querySelector(
      '[data-test="error"]',
    ) as HTMLParagraphElement | null;
    const spinner = fixture.debugElement.nativeElement.querySelector(
      '[data-test="spinner"]',
    ) as HTMLElement | null;

    expect(card).toBeFalsy();
    expect(error).toBeFalsy();
    expect(spinner).toBeTruthy();
  });

  it('should render a spinner and an error message if user is not defined and there is an error', () => {
    TestBed.overrideProvider(RandomUserService, {
      useValue: {
        getRandomUser: (): Observable<User | null> =>
          of(null).pipe(
            tap(() => {
              throw new Error('');
            }),
          ),
      },
    });
    fixture = TestBed.createComponent(PeoplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const card = fixture.debugElement.nativeElement.querySelector(
      '[data-test="card"]',
    ) as HTMLElement | null;
    const error = fixture.debugElement.nativeElement.querySelector(
      '[data-test="error"]',
    ) as HTMLParagraphElement | null;
    const spinner = fixture.debugElement.nativeElement.querySelector(
      '[data-test="spinner"]',
    ) as HTMLElement | null;

    expect(card).toBeFalsy();
    expect(error).toBeTruthy();
    expect(spinner).toBeTruthy();
  });

  describe('UI Interaction', () => {
    beforeEach(() => {
      TestBed.overrideProvider(RandomUserService, {
        useValue: {
          getRandomUser: (): Observable<User | null> => of(userMock),
        },
      });
      fixture = TestBed.createComponent(PeoplePageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load the next user when the button is clicked', () => {
      const loadNextUserSpy = spyOn(component, 'loadNextUser');
      const button = fixture.debugElement.nativeElement.querySelector(
        '[data-test="button"]',
      ) as HTMLButtonElement | null;

      button?.click();

      expect(loadNextUserSpy).toHaveBeenCalled();
    });

    describe('appDetectMouse', () => {
      let setTimerStateSpy: jasmine.Spy;

      beforeEach(() => {
        setTimerStateSpy = spyOn(component, 'setTimerState');
      });

      describe('image', () => {
        let image: HTMLImageElement | null;

        beforeEach(() => {
          image = fixture.debugElement.nativeElement.querySelector(
            '[data-test="image"]',
          ) as HTMLImageElement | null;
        });

        it('should send false on mouseenter', () => {
          image?.dispatchEvent(new Event('mouseenter'));

          expect(setTimerStateSpy).toHaveBeenCalledWith(false);
        });

        it('should send true on mouseleave', () => {
          image?.dispatchEvent(new Event('mouseleave'));

          expect(setTimerStateSpy).toHaveBeenCalledWith(true);
        });
      });

      describe('subtitle', () => {
        let subtitle: HTMLParagraphElement | null;

        beforeEach(() => {
          subtitle = fixture.debugElement.nativeElement.querySelector(
            '[data-test="subtitle"]',
          ) as HTMLParagraphElement | null;
        });

        it('should send false on mouseenter', () => {
          subtitle?.dispatchEvent(new Event('mouseenter'));

          expect(setTimerStateSpy).toHaveBeenCalledWith(false);
        });

        it('should send true on mouseleave', () => {
          subtitle?.dispatchEvent(new Event('mouseleave'));

          expect(setTimerStateSpy).toHaveBeenCalledWith(true);
        });
      });

      describe('title', () => {
        let title: HTMLTitleElement | null;

        beforeEach(() => {
          title = fixture.debugElement.nativeElement.querySelector(
            '[data-test="title"]',
          ) as HTMLTitleElement | null;
        });

        it('should send false on mouseenter', () => {
          title?.dispatchEvent(new Event('mouseenter'));

          expect(setTimerStateSpy).toHaveBeenCalledWith(false);
        });

        it('should send true on mouseleave', () => {
          title?.dispatchEvent(new Event('mouseleave'));

          expect(setTimerStateSpy).toHaveBeenCalledWith(true);
        });
      });

      describe('button', () => {
        let button: HTMLButtonElement | null;

        beforeEach(() => {
          button = fixture.debugElement.nativeElement.querySelector(
            '[data-test="title"]',
          ) as HTMLButtonElement | null;
        });

        it('should send false on mouseenter', () => {
          button?.dispatchEvent(new Event('mouseenter'));

          expect(setTimerStateSpy).toHaveBeenCalledWith(false);
        });

        it('should send true on mouseleave', () => {
          button?.dispatchEvent(new Event('mouseleave'));

          expect(setTimerStateSpy).toHaveBeenCalledWith(true);
        });
      });
    });
  });
});
