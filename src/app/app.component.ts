import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FoodSafetyBlogsComponent } from "./food-safety-blogs/food-safety-blogs.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FoodSafetyBlogsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo1';
}
