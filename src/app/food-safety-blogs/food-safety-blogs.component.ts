import { Component, OnInit } from '@angular/core';
import { Blog, BlogService } from '../services/blog.service';
import { BlogComponent } from "../blog/blog.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-safety-blogs',
  imports: [CommonModule, BlogComponent],
  templateUrl: './food-safety-blogs.component.html',
  styleUrl: './food-safety-blogs.component.css',
})
export class FoodSafetyBlogsComponent implements OnInit{
  blogs: Blog[] = [];
  displayedBlogs: Blog[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.isLoading = true;
    this.blogService.getBlogs().subscribe(
      response => {
        this.blogs = response.blogs;

        this.displayedBlogs = this.blogs.slice(0, 2);
        this.isLoading = false;
      },
      error=> {
        this.error = 'Failed to load blogs';
        this.isLoading = false;
        console.error('Error loading blogs:', error);
      }
    );
  }
}
