import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../../../interface/IUser';
import { UpperCasePipe } from '@angular/common';
import { FormatPhonePipe } from '../../../../shared/pipes/format-phone.pipe';
import { PhoneFormat } from '../../../../../enum/PhoneFormat';
import { BoldOnHoverDirective } from '../../../../shared/derectives/bold-on-hover.directive';
import { GradientBorderDirective } from '../../../../shared/derectives/gradient-border.directive';
@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, FormatPhonePipe, BoldOnHoverDirective, GradientBorderDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() removeUser: EventEmitter<number> = new EventEmitter<number>();

  phoneFormat: typeof PhoneFormat = PhoneFormat;

  onDelete(): void {
    this.removeUser.emit(this.user.id);
  }

}
