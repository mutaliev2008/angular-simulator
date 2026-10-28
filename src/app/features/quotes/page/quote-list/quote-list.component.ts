import { Component, inject, OnInit } from '@angular/core';
import { quotesStore } from '../../store/qoutes.store';
import { QuotesCardComponent } from '../../component/quotes-card/quotes-card.component';
import { QuotesFilter } from '../../enum/QuotesFilter';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-quote-list',
  imports: [QuotesCardComponent, FontAwesomeModule],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss',
})
export class QuoteListComponent implements OnInit {

  store: InstanceType<typeof quotesStore> = inject(quotesStore);
  quoteFilter: typeof QuotesFilter = QuotesFilter;
  faRotateRight: IconDefinition = faRotateRight;
  ngOnInit(): void {
    this.uploadQuotes();
  }

  uploadQuotes(): void {
    this.store.loadQuotes();
  }

}
