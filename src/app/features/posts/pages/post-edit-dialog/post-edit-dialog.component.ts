import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../../interface/IPost';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { MessageService } from '../../../../../services/message.service';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [FormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss'
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
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError(error.error.message);
          return throwError(() => error);
        })
      ).subscribe();
      
    this.ref.close(updatedPost);
  }

  cansel(): void {
    this.ref.close();
  }
  
}
