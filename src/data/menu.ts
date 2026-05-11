export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'bakery' | 'restaurant' | 'cakes' | 'sweets';
  image: string;
  options?: {
    size: string;
    price: number;
  }[];
  price?: number; // fallback if no options
  popular?: boolean;
}

export const menuData: MenuItem[] = [
  // RESTAURANT - PIZZA
  {
    id: 'p1',
    name: 'Ajwa Special Pizza',
    description: 'Our signature pizza topped with chicken chunks, mushrooms, olives, peppers, and extra cheese.',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    popular: true,
    options: [
      { size: 'Small', price: 650 },
      { size: 'Medium', price: 1350 },
      { size: 'Large', price: 1950 },
      { size: 'Family', price: 2550 }
    ]
  },
  {
    id: 'p2',
    name: 'Chicken Tikka Pizza',
    description: 'Traditional tikka chunks with onions and mozzarella cheese.',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    options: [
      { size: 'Small', price: 550 },
      { size: 'Medium', price: 1150 },
      { size: 'Large', price: 1750 },
      { size: 'Family', price: 2250 }
    ]
  },
  {
    id: 'p3',
    name: 'Veggie Supreme Pizza',
    description: 'Fresh vegetables, olives, and premium mozzarella.',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    options: [
      { size: 'Small', price: 450 },
      { size: 'Medium', price: 950 },
      { size: 'Large', price: 1450 }
    ]
  },
  // RESTAURANT - BURGERS
  {
    id: 'b1',
    name: 'Zinger Burger',
    description: 'Crispy fried chicken breast with lettuce and mayo in a soft bun.',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    price: 490
  },
  {
    id: 'b2',
    name: 'Beef Grill Burger',
    description: 'Juicy beef patty with cheese, pickles, and signature sauce.',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    price: 650
  },
  // RESTAURANT - BBQ
  {
    id: 'bbq1',
    name: 'Chicken Seekh Kabab',
    description: '4 pieces of flavorful minced chicken kababs grilled to perfection.',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1628294895950-983383298aee?auto=format&fit=crop&w=800&q=80',
    price: 750
  },
  {
    id: 'bbq2',
    name: 'Malai Boti',
    description: 'Creamy and tender chicken boneless pieces grilled on charcoal.',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1532636875304-1c89119d9b4f?auto=format&fit=crop&w=800&q=80',
    price: 850
  },
  // CAKES
  {
    id: 'c1',
    name: 'Chocolate Fudge Cake',
    description: 'Rich dark chocolate layers with decadent fudge frosting.',
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    popular: true,
    options: [
      { size: '2 Lbs', price: 1800 },
      { size: '4 Lbs', price: 3400 }
    ]
  },
  {
    id: 'c2',
    name: 'Red Velvet Cake',
    description: 'Velvety smooth red layers with cream cheese frosting.',
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=800&q=80',
    options: [
      { size: '2 Lbs', price: 2200 },
      { size: '4 Lbs', price: 4200 }
    ]
  },
  {
    id: 'c3',
    name: 'Ice Cream Cake',
    description: 'Vanilla and chocolate ice cream layers with biscuit base.',
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    options: [
      { size: 'Small', price: 1500 },
      { size: 'Large', price: 2800 }
    ]
  },
  // BAKERY
  {
    id: 'bk1',
    name: 'Assorted Biscuits',
    description: 'A mix of almond, pistachio, and chocolate biscuits.',
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    price: 950
  },
  {
    id: 'bk2',
    name: 'Chicken Patties',
    description: 'Flaky pastry filled with seasoned shredded chicken (dozen).',
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    price: 840
  },
  {
    id: 'bk3',
    name: 'Fresh Milky Bread',
    description: 'Soft and fluffy milky bread baked fresh daily.',
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    price: 180
  },
  // SWEETS
  {
    id: 's1',
    name: 'Gulab Jamun',
    description: 'Soft milk-based balls soaked in sweet sugar syrup.',
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1605192554106-9549b15a3095?auto=format&fit=crop&w=800&q=80',
    price: 1200
  },
  {
    id: 's2',
    name: 'Mixed Mithai',
    description: 'A selection of traditional sweets including barfi, laddoo, and more.',
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1589119908639-4988bd773c1d?auto=format&fit=crop&w=800&q=80',
    popular: true,
    price: 1400
  }
];

