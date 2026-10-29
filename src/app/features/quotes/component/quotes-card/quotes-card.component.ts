import { Component, inject, input, InputSignal } from '@angular/core';
import { IQuote } from '../../interface/IQuote';
import { quotesStore } from '../../store/qoutes.store';

@Component({
  selector: 'app-quotes-card',
  imports: [],
  templateUrl: './quotes-card.component.html',
  styleUrl: './quotes-card.component.scss'
})
export class QuotesCardComponent {

  quote: InputSignal<IQuote> = input.required<IQuote>();
  store: InstanceType<typeof quotesStore> = inject(quotesStore);

}
