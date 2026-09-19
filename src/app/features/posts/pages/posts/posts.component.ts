import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { TableModule, TablePageEvent } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { IPost } from '../../interface/IPost';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { MessageService } from '../../../../../services/message.service';

@Component({
  selector: 'app-posts',
  imports: [TableModule, AsyncPipe, SkeletonModule, TagModule, ContextMenuModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService],
})
export class PostsComponent implements OnInit {
  postService: PostService = inject(PostService);
  messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);

  ref: DynamicDialogRef<PostEditDialogComponent> | null = null;
  items: MenuItem[] = [
    {
      label: 'View',
      icon: 'pi pi-fw pi-search',
      command: () => this.goDetailInfoPage(this.selectedPost?.id!),
    },
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.openEditDialog() },
    {
      label: 'Delete',
      icon: 'pi pi-fw pi-times',
      command: () => this.deletePost(this.selectedPost?.id!),
    },
  ];
  selectedPost!: IPost | null;
  skipData: number = 0;
  limitData: number = 10;
  quantitySkeleton: string[] = Array.from({ length: this.limitData }).map((_, i) => `Item #${i}`);

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  ngOnInit(): void {
    this.getPosts(this.skipData, this.limitData);
  }

  changePage(event: TablePageEvent): void {
    this.getPosts(event.first, event.rows);
  }

  goDetailInfoPage(id: number): void {
    this.router.navigate([`posts/`, id]);
  }

  getPosts(skip: number, limit: number): void {
    this.isLoadingSubject.next(true);
    this.postService
      .loadPosts(skip, limit)
      .pipe(
        finalize(() => {
          this.isLoadingSubject.next(false);
        }),
      )
      .subscribe();
  }

  openEditDialog(): void {
    this.ref = this.dialogService.open(PostEditDialogComponent, {
      data: this.selectedPost,
    });
    this.ref?.onClose.subscribe();
  }

  deletePost(id: number): void {
    this.postService
      .deletePost(id)
      .pipe(
        tap(() => {
          this.messageService.showSuccess('Пост удален успешно');
        }),
      )
      .subscribe();
  }
}
