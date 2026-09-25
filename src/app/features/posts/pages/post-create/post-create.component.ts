import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../../interface/IPost';
import { PostService } from '../../services/post.service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../../../../services/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  
  postService: PostService = inject(PostService);
  router: Router = inject(Router);
  messageService: MessageService = inject(MessageService);
  private fb: FormBuilder = inject(FormBuilder);

  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    tags: this.fb.array([this.fb.control('', Validators.required)])
  });

  tags: FormArray = this.postForm.get('tags') as FormArray;

  addTag(): void {
    this.tags.push(this.fb.control('', Validators.required));
  }

  removeTag(control: AbstractControl): void {
    if (this.tags.length > 1) {
      const index: number = this.tags.controls.indexOf(control);
      this.tags.removeAt(index);
    }
  }

  cansel(): void {
    this.router.navigate(['/posts']);
  }

  submit(): void {
    if (this.postForm.valid) {
      const newPost: IPost = {
        ...this.postForm.value,
        id: Date.now(),
        userId: 2,
        reactions: {
          likes: 0,
          dislikes: 0
        }
      };

      this.postService
        .createPost(newPost)
        .pipe(
          tap(() => {
            this.messageService.showSuccess('Пост создан успешно');
          }),
          catchError((error: HttpErrorResponse) => {
            this.messageService.showError(error.error.message);
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }

}
