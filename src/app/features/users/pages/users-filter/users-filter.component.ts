import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  destroyRef: DestroyRef = inject(DestroyRef);

  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();

  name: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  ngOnInit(): void {
    this.name.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((value: string) => this.searchTerm.emit(value.toLocaleLowerCase().trim())),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
  
}
