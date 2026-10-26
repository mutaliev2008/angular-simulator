import { Component, inject, OnInit } from '@angular/core';
import { quotesStore } from '../../qoutes.store';
import { QuotesCardComponent } from '../../component/quotes-card/quotes-card.component';
import { QuotesFilter } from '../../enum/QuotesFilter';

@Component({
  selector: 'app-quote-list',
  imports: [QuotesCardComponent],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss',
})
export class QuoteListComponent implements OnInit{

  store = inject(quotesStore);
  quoteFilter: typeof QuotesFilter = QuotesFilter;

  ngOnInit(): void {
    this.uploadQuotes();
  }

  uploadQuotes(): void {
    this.store.loadQuotes();
  }

}
