import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/nayeli.interface';
import { CategoryApiService } from '../../services/category-api.service';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css'
})
export class ActionBarComponent implements OnInit {
  categories: Category[] = [];

  public constructor(public service: CategoryApiService) { }

  /**
   * Gets all the categories.
   * @returns {void}
   */
  getCategories(): void {
    this.service.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(this.categories);
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
