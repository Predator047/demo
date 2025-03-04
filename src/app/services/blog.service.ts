import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  publishedDate: string;
}

export interface BlogsResponse {
  blogs: Blog[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsUrl = 'assets/blogs.json';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<BlogsResponse> {
    return this.http.get<BlogsResponse>(this.blogsUrl);
  }
}
