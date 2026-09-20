import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../../interface/IPost';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { MessageService } from '../../../../../services/message.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [FormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  messageService: MessageService = inject(MessageService);

  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private postService: PostService = inject(PostService);

  post: IPost = { ...this.config.data };

  onSubmit(): void {
    const updatedPost: IPost = { ...this.post };
    this.postService
      .updatePost(this.post.id, updatedPost)
      .pipe(
        tap(() => {
          this.messageService.showSuccess('Пост обновлен успешно');
        }),
      ).subscribe();
      
    this.ref.close(updatedPost);
  }

  cansel(): void {
    this.ref.close();
  }
  
}
