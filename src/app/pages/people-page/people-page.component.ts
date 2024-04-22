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
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { User } from '@app/models/user.model';
import { RandomUserService } from '@app/services/random-user.service';
import { BaseRandomUserRepositoryService } from '@app/repositories/random-user-respository/base-random-user-repository.service';
import { RandomUserRepositoryService } from '@app/repositories/random-user-respository/random-user-repository.service';
import { CardComponent } from '@app/shared/components/card/card.component';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { ContainerComponent } from '@app/shared/components/container/container.component';
import { ButtonDirective } from '@app/shared/directives/button.directive';
import { DetectMouseDirective } from '@app/shared/directives/detect-mouse.directive';

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

  private isMouseInElement: boolean = false;
  private isUserLoading: boolean = false;

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
    afterNextRender(() => this.startUserTimer());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setTimerState(isTimerActive: boolean): void {
    if (!isTimerActive) {
      this.timerElapsedTime =
        Date.now() - this.timerStartTimestamp + this.timerElapsedTime;
    }
    this.isMouseInElement = !isTimerActive;
    this.isTimerActive$.next(isTimerActive);
  }

  public loadNextUser(): void {
    if (!this.isUserLoading) {
      this.user$
        .pipe(
          takeUntil(this.destroy$),
          catchError(() => of(null)),
        )
        .subscribe({
          next: (user) => this.nextUserSender$.next(user),
          complete: () => {
            this.isUserLoading = false;
            this.buttonDisabled.set(false);
            this.timerStartTimestamp = Date.now();
            this.timerElapsedTime = 0;
            this.setTimerState(!this.isMouseInElement);
            this.cdRef.detectChanges();
          },
        });
    }
    this.isUserLoading = true;
  }

  public buttonClick(): void {
    this.buttonDisabled.set(true);
    this.loadNextUser();
  }

  private startUserTimer(): void {
    this.isTimerActive$
      .pipe(
        filter((isTimerActive) => isTimerActive),
        switchMap(() => {
          this.timerStartTimestamp = Date.now();
          const delay = this.timerDelay - this.timerElapsedTime;
          return timer(delay <= 0 ? 0 : delay, this.timerDelay).pipe(
            takeUntil(
              this.isTimerActive$.pipe(filter((isActive) => !isActive)),
            ),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.loadNextUser());
  }
}
