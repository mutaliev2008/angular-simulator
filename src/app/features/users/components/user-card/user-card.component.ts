import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IUser } from '../../../../../interface/IUser';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser; 
  @Output() removeUser = new EventEmitter<string>();


  onDelete() {
    this.removeUser.emit()
  }

}
