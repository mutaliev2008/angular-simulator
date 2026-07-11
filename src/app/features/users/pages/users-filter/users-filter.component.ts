import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { debounceTime, distinctUntilChanged, Observable, tap } from 'rxjs';
import { IUser } from '../../../../../interface/IUser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  destroyRef = inject(DestroyRef)

  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();

  name: FormControl<string> = new FormControl<string>('', {nonNullable: true} );

  ngOnInit() {
    this.name.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((value: string) => {this.searchTerm.emit(value), console.log(value)}),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }

}
