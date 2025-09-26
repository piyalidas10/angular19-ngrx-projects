import { Component, inject, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { CategoriesStoreItem } from '../services/category/categories.storeItem';

@Component({
  selector: 'app-sidenavigation',
  imports: [FontAwesomeModule],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.css',
})
export class SidenavigationComponent {
  faAngleDown = faAngleDown;
  private categoryStore = inject(CategoriesStoreItem);

  readonly categories = this.categoryStore.categories;
  readonly subCategoryClicked = output<number>();

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories().filter((category) =>
      parentCategoryId
        ? category.parent_category_id === parentCategoryId
        : category.parent_category_id === null
    );
  }
  onSubCategoryClick(subCategory: Category): void {
    this.subCategoryClicked.emit(subCategory.id);
  }
}
