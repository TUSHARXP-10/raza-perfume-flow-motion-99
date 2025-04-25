
export interface Product {
  id: string;
  name: string;
  arabicName?: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  new: boolean;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  size: string;
  rating: number;
  reviews: number;
  stock: number;
}

const products: Product[] = [
  {
    id: "1",
    name: "Amber Nights",
    arabicName: "ليالي العنبر",
    description: "A deep, sensual fragrance with rich amber, vanilla, and sandalwood notes that evoke the mystery of Arabian nights.",
    price: 299,
    imageUrl: "/placeholder.svg", 
    category: "oriental",
    featured: true,
    new: false,
    topNotes: ["Bergamot", "Cardamom", "Saffron"],
    middleNotes: ["Rose", "Amber", "Oudh"],
    baseNotes: ["Vanilla", "Sandalwood", "Musk"],
    size: "100ml",
    rating: 4.9,
    reviews: 156,
    stock: 25
  },
  {
    id: "2",
    name: "Royal Oud",
    arabicName: "العود الملكي",
    description: "An opulent blend featuring the cherished oud wood, enriched with exotic spices and floral notes.",
    price: 399,
    imageUrl: "/placeholder.svg",
    category: "woody",
    featured: true,
    new: true,
    topNotes: ["Black Pepper", "Cardamom", "Lemon"],
    middleNotes: ["Oud", "Rose", "Geranium"],
    baseNotes: ["Cedarwood", "Sandalwood", "Musk"],
    size: "100ml",
    rating: 5.0,
    reviews: 89,
    stock: 15
  },
  {
    id: "3",
    name: "Desert Bloom",
    arabicName: "زهرة الصحراء",
    description: "A fresh and vibrant fragrance inspired by rare desert flowers that bloom after rainfall.",
    price: 249,
    imageUrl: "/placeholder.svg",
    category: "floral",
    featured: false,
    new: true,
    topNotes: ["Orange Blossom", "Bergamot", "Pink Pepper"],
    middleNotes: ["Jasmine", "Violet", "Rose"],
    baseNotes: ["White Musk", "Amber", "Vanilla"],
    size: "75ml",
    rating: 4.7,
    reviews: 63,
    stock: 30
  },
  {
    id: "4",
    name: "Silk Road",
    arabicName: "طريق الحرير",
    description: "A journey through exotic spices and precious woods, inspired by the ancient trade routes.",
    price: 349,
    imageUrl: "/placeholder.svg",
    category: "spicy",
    featured: true,
    new: false,
    topNotes: ["Cinnamon", "Cardamom", "Clove"],
    middleNotes: ["Rose", "Orris", "Incense"],
    baseNotes: ["Patchouli", "Sandalwood", "Vanilla"],
    size: "100ml",
    rating: 4.8,
    reviews: 112,
    stock: 18
  },
  {
    id: "5",
    name: "Midnight Saffron",
    arabicName: "زعفران منتصف الليل",
    description: "A luxurious blend of precious saffron, warm amber, and rich vanilla for an enchanting evening scent.",
    price: 379,
    imageUrl: "/placeholder.svg",
    category: "oriental",
    featured: false,
    new: true,
    topNotes: ["Saffron", "Black Pepper", "Raspberry"],
    middleNotes: ["Rose", "Jasmine", "Amber"],
    baseNotes: ["Leather", "Vanilla", "Agarwood"],
    size: "100ml",
    rating: 4.9,
    reviews: 47,
    stock: 20
  },
  {
    id: "6",
    name: "Royal Jasmine",
    arabicName: "الياسمين الملكي",
    description: "A captivating floral fragrance centered on precious jasmine blooms with a hint of citrus.",
    price: 289,
    imageUrl: "/placeholder.svg",
    category: "floral",
    featured: true,
    new: false,
    topNotes: ["Bergamot", "Lemon", "Neroli"],
    middleNotes: ["Jasmine", "Orange Blossom", "Tuberose"],
    baseNotes: ["White Amber", "Musk", "Cedarwood"],
    size: "75ml",
    rating: 4.7,
    reviews: 83,
    stock: 22
  },
  {
    id: "7",
    name: "Mystic Oudh",
    arabicName: "العود الغامض",
    description: "A mysterious and deep fragrance with rare oudh, leather, and smoky notes for a powerful statement.",
    price: 450,
    imageUrl: "/placeholder.svg",
    category: "woody",
    featured: false,
    new: false,
    topNotes: ["Frankincense", "Cardamom", "Elemi"],
    middleNotes: ["Oud", "Leather", "Tobacco"],
    baseNotes: ["Amber", "Sandalwood", "Patchouli"],
    size: "100ml",
    rating: 4.8,
    reviews: 65,
    stock: 10
  },
  {
    id: "8",
    name: "Golden Amber",
    arabicName: "العنبر الذهبي",
    description: "A warm, sensual amber fragrance with golden honey and sweet vanilla notes.",
    price: 279,
    imageUrl: "/placeholder.svg",
    category: "oriental",
    featured: false,
    new: true,
    topNotes: ["Mandarin", "Bergamot", "Honey"],
    middleNotes: ["Amber", "Vanilla", "Rose"],
    baseNotes: ["Tonka Bean", "Sandalwood", "Musk"],
    size: "50ml",
    rating: 4.6,
    reviews: 38,
    stock: 28
  }
];

export const getProducts = (): Product[] => {
  return products;
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
