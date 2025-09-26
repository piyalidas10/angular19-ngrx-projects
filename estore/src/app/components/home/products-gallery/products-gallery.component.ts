import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../../products/products.component';
import { SidenavigationComponent } from '../sidenavigation/sidenavigation.component';
import { ProductsStoreItem } from '../services/product/products.storeItem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-gallery',
  imports: [ProductsComponent, SidenavigationComponent],
  templateUrl: './products-gallery.component.html',
  styleUrl: './products-gallery.component.css',
})
export class ProductsGalleryComponent implements OnInit {
  constructor(
    private productsStoreItem: ProductsStoreItem,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const filters: {
        maincategoryid?: number;
        keyword?: string;
        subcategoryid?: number;
      } = {};

      if (params['maincategoryid']) {
        filters.maincategoryid = parseInt(params['maincategoryid'], 10);
      }
      if (params['keyword']) {
        filters.keyword = params['keyword'];
      }
      if (params['subcategoryid']) {
        filters.subcategoryid = parseInt(params['subcategoryid'], 10);
      }
      this.productsStoreItem.loadProducts(filters);
    });
  }

  onSelectSubCategory(subCategoryId: number): void {
    this.productsStoreItem.loadProducts({ subcategoryid: subCategoryId });
  }
}
