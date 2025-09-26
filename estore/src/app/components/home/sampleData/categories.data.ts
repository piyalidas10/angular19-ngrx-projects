import { Category } from '../types/category';

export const categories: Category[] = [
  {
    id: 1,
    category: 'Men',
  },
  {
    id: 2,
    category: 'Women',
  },
  {
    id: 3,
    category: 'Kids',
  },
  {
    id: 4,
    category: 'Casual Wear',
    parent_category_id: 1,
  },
  {
    id: 5,
    category: 'Party Wear',
    parent_category_id: 2,
  },
  {
    id: 6,
    category: 'Foot Wear',
    parent_category_id: 2,
  },
  {
    id: 7,
    category: 'Accessories',
    parent_category_id: 3,
  },
];
