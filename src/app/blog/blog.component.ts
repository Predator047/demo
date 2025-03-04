import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  providers: [DatePipe],
})
export class BlogComponent {
  @Input() image: string = '';
  @Input() publishedDate: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

  constructor(private datePipe: DatePipe) {}

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
}
