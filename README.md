import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

interface Blog {
  id: string;
  title: string;
  image: string;
  description: string;
  publishedDate: string;
  type?: string;
}

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  availableYears: string[] = [];
  selectedYear: string = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
    
    // Listen for route parameter changes
    this.route.paramMap.subscribe(params => {
      const year = params.get('year');
      if (year) {
        this.selectedYear = year;
        this.filterBlogsByYear(year);
      }
    });
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        
        // Extract unique years from blog publish dates
        this.availableYears = Array.from(new Set(
          this.blogs.map(blog => new Date(blog.publishedDate).getFullYear().toString())
        )).sort((a, b) => parseInt(b) - parseInt(a));

        // If no year in route, default to the first available year
        if (!this.selectedYear && this.availableYears.length > 0) {
          this.router.navigate(['/allblogs', this.availableYears[0]]);
        }
      },
      error: (err) => {
        console.error('Error loading blogs', err);
      }
    });
  }

  filterBlogsByYear(year: string): void {
    this.filteredBlogs = this.blogs.filter(blog => 
      new Date(blog.publishedDate).getFullYear().toString() === year
    );
  }

  navigateToYear(year: string): void {
    this.router.navigate(['/allblogs', year]);
  }
}
