import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RandomUserService } from '../../services/random-user.service';
import { BaseRandomUserRepositoryService } from '../../repositories/random-user-respository/base-random-user-repository.service';
import { RandomUserRepositoryService } from '../../repositories/random-user-respository/random-user-repository.service';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgOptimizedImage } from '@angular/common';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  concat,
  filter,
  map,
  of,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs';
import { User } from '../../models/user.model';
import { DetectMouseDirective } from '../../shared/directives/detect-mouse.directive';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [
    ContainerComponent,
    SpinnerComponent,
    CardComponent,
    NgOptimizedImage,
    ButtonDirective,
    DetectMouseDirective,
  ],
  providers: [
    RandomUserService,
    {
      provide: BaseRandomUserRepositoryService,
      useExisting: RandomUserRepositoryService,
    },
  ],
  templateUrl: './people-page.component.html',
  styleUrl: './people-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeoplePageComponent implements OnDestroy {
  private cdRef = inject(ChangeDetectorRef);
  private randomUserService = inject(RandomUserService);

  private destroy$: Subject<void> = new Subject<void>();
  private user$: Observable<User | null> =
    this.randomUserService.getRandomUser();
  private nextUserSender$: Subject<User | null> = new Subject<User | null>();
  private isTimerActive$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  private timerStartTimestamp: number = 0;
  private timerElapsedTime: number = 0;
  private timerDelay: number = 5000;

  public userResponse = toSignal(
    concat(this.user$, this.nextUserSender$).pipe(
      map((result) => ({
        value: result,
        hasError: false,
      })),
      catchError(() => of({ value: null, hasError: true })),
    ),
  );
  public userError = computed(() => this.userResponse()?.hasError ?? false);
  public user = computed(() => this.userResponse()?.value ?? null);

  public buttonDisabled = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      this.startUserTimer();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setTimerState(isTimerActive: boolean): void {
    if (!isTimerActive) {
      this.timerElapsedTime = this.getTimerElapsedTime();
    }
    this.isTimerActive$.next(isTimerActive);
  }

  public loadNextUser(disableButton: boolean = false): void {
    if (disableButton) {
      this.buttonDisabled.set(true);
    }
    this.resetTimer();
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.nextUserSender$.next(user);
      this.buttonDisabled.set(false);
      this.cdRef.detectChanges();
    });
  }

  private startUserTimer(): void {
    this.isTimerActive$
      .pipe(
        filter((isTimerActive) => isTimerActive),
        switchMap(() => {
          this.timerStartTimestamp = Date.now();
          return timer(
            this.timerDelay - this.timerElapsedTime,
            this.timerDelay,
          ).pipe(
            takeUntil(
              this.isTimerActive$.pipe(filter((isActive) => !isActive)),
            ),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.loadNextUser());
  }

  private getTimerElapsedTime(): number {
    return this.timerElapsedTime === 0
      ? Date.now() - this.timerStartTimestamp
      : Date.now() - this.timerStartTimestamp + this.timerElapsedTime;
  }

  private resetTimer(): void {
    this.timerElapsedTime = 0;
    this.setTimerState(true);
  }
}
