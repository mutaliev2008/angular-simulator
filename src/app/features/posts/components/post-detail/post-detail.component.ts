import { Component, inject, OnInit } from '@angular/core';
import { IPost } from '../../interface/IPost';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit{

  private activatedRoute = inject(ActivatedRoute);
  post!: IPost;

  ngOnInit(): void {
    this.post = this.activatedRoute.snapshot.data['post'];
  }

}
