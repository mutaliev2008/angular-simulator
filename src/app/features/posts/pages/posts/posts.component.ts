import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { TableModule, TablePageEvent } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [TableModule, AsyncPipe, SkeletonModule, TagModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  postService: PostService = inject(PostService);
  private skipDataSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  skipData$: Observable<number> = this.skipDataSubject.asObservable();
  private limitDataSubject: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  limitData$: Observable<number> = this.limitDataSubject.asObservable();
  quantitySkeleton: string[] = Array.from({ length: this.limitDataSubject.value }).map((_, i) => `Item #${i}`);

 

  ngOnInit(): void {
    this.postService.getPosts(this.skipDataSubject.value, this.limitDataSubject.value).subscribe();
    this.postService.postResponse$.subscribe(console.log)
  }

  changePage(event: TablePageEvent): void {
    this.postService.getPosts(event.first, event.rows).subscribe();
  }
}
