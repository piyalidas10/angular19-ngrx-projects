import { Injectable } from '@angular/core';
import { Category } from '../../types/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    const url = '/mockdata/categories.json';
    return this.http.get<Category[]>(url);
    // return this.http.get<Category[]>('http://localhost:5001/productcategories');
  }
}
