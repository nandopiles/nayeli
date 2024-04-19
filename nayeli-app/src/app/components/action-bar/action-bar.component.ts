import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/nayeli.interface';
import { CategoryApiService } from '../../services/category-api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css'
})
export class ActionBarComponent implements OnInit {
  categories: Category[] = [];
  filterForm = new FormGroup({
    category: new FormControl('all'),
    name: new FormControl('')
  });

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

  onSubmit() {
    // Handle form submission logic here
    // Access filtered data using this.filterForm.value
    console.log('Filtered by:', this.filterForm.value);
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
