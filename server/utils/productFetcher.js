const fallbackProducts = [
  {
    title: 'Wireless Over-Ear Headphones',
    description: 'High-fidelity Bluetooth wireless headphones with active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.',
    price: 89.99,
    category: 'Electronics',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
  },
  {
    title: 'Minimalist Smart Watch',
    description: 'Sleek fitness smartwatch featuring continuous heart rate tracking, sleep monitoring, GPS, and custom watch faces.',
    price: 129.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
  },
  {
    title: 'Ergonomic Mechanical Keyboard',
    description: 'RGB backlit mechanical gaming and typing keyboard with custom tactile switches and aircraft-grade aluminum frame.',
    price: 74.50,
    category: 'Electronics',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
  },
  {
    title: 'Portable Waterproof Speaker',
    description: 'Compact 360-degree Bluetooth speaker with deep bass, IPX7 waterproof rating, and 12-hour playtime.',
    price: 49.99,
    category: 'Electronics',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
  },
  {
    title: 'Classic Leather Urban Sneakers',
    description: 'Handcrafted premium leather sneakers designed for all-day comfort with cushioned insoles and durable rubber outsoles.',
    price: 64.99,
    category: 'Footwear',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
  },
  {
    title: 'Lightweight Breathable Running Shoes',
    description: 'Performance athletic shoes featuring mesh knit uppers, responsive foam cushioning, and high-traction tread.',
    price: 54.99,
    category: 'Footwear',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
    rating: 4.4,
  },
  {
    title: 'Durable Travel Canvas Backpack',
    description: 'Heavy-duty water-resistant canvas backpack with a padded 15.6" laptop compartment and ergonomic shoulder straps.',
    price: 42.00,
    category: 'Accessories',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
  },
  {
    title: 'Polarized Vintage Sunglasses',
    description: 'UV400 protection unisex sunglasses with durable metal alloy frame and scratch-resistant polarized lenses.',
    price: 24.99,
    category: 'Accessories',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
    rating: 4.3,
  },
  {
    title: 'Organic Cotton Crewneck T-Shirt',
    description: 'Ultra-soft 100% combed organic cotton t-shirt with a modern tailored fit, breathable and pre-shrunk.',
    price: 19.99,
    category: 'Clothing',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    rating: 4.2,
  },
  {
    title: 'Classic Denim Trucker Jacket',
    description: 'Timeless vintage indigo wash denim jacket featuring chest flap pockets and adjustable button waist tabs.',
    price: 69.99,
    category: 'Clothing',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
  },
  {
    title: 'Stainless Steel Pour-Over Coffee Maker',
    description: 'Precision pour-over glass carafe coffee maker with reusable fine stainless steel mesh filter.',
    price: 34.99,
    category: 'Home',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
  },
  {
    title: 'Modern LED Touch Desk Lamp',
    description: 'Dimmable LED architect desk lamp with 5 color temperatures, integrated USB charging port, and auto shut-off timer.',
    price: 29.99,
    category: 'Home',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    rating: 4.4,
  },
  {
    title: 'Extra Thick Non-Slip Yoga Mat',
    description: 'High-density eco-friendly TPE yoga mat with alignment markings, carrying strap, and extra knee cushioning.',
    price: 27.50,
    category: 'Sports',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
  },
  {
    title: 'Insulated Vacuum Water Bottle (1L)',
    description: 'Double-wall stainless steel thermal flask that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 18.99,
    category: 'Sports',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
  },
  {
    title: 'Aroma Diffuser & Essential Oil Set',
    description: 'Ultrasonic cool mist aromatherapy diffuser with 7 ambient LED light modes and 6 pure organic essential oils.',
    price: 32.99,
    category: 'Home',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
  },
  {
    title: 'HD Webcam with Dual Noise Reduction Microphones',
    description: '1080p 60fps streaming webcam featuring autofocus, low-light auto-correction, and magnetic privacy cover.',
    price: 49.99,
    category: 'Electronics',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop&q=80',
    rating: 4.3,
  },
];

/**
 * Capitalizes category strings for uniform display
 */
const formatCategory = (cat) => {
  if (!cat) return 'General';
  const mapping = {
    "men's clothing": 'Clothing',
    "women's clothing": 'Clothing',
    jewelery: 'Accessories',
    electronics: 'Electronics',
    smartphones: 'Electronics',
    laptops: 'Electronics',
    fragrances: 'Beauty',
    skincare: 'Beauty',
    groceries: 'Home',
    'home-decoration': 'Home',
    furniture: 'Home',
    tops: 'Clothing',
    'womens-dresses': 'Clothing',
    'womens-shoes': 'Footwear',
    'mens-shoes': 'Footwear',
    'mens-shirts': 'Clothing',
    'mens-watches': 'Electronics',
    'womens-watches': 'Electronics',
    'womens-bags': 'Accessories',
    sunglasses: 'Accessories',
  };
  const lower = cat.toLowerCase();
  if (mapping[lower]) return mapping[lower];
  return cat.charAt(0).toUpperCase() + cat.slice(1);
};

/**
 * Fetches products from DummyJSON or FakeStoreAPI, falling back to curated HD Unsplash products.
 */
const fetchExternalProducts = async () => {
  const fetchedList = [];

  // Attempt 1: Fetch from DummyJSON API
  try {
    const res = await fetch('https://dummyjson.com/products?limit=24');
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.products) && data.products.length > 0) {
        data.products.forEach((p) => {
          fetchedList.push({
            title: p.title,
            description: p.description,
            price: p.price,
            category: formatCategory(p.category),
            stock: p.stock || 20,
            image: p.thumbnail || (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
            rating: typeof p.rating === 'number' ? Math.min(5, Math.max(1, Math.round(p.rating * 10) / 10)) : 4.5,
          });
        });
        console.log(`[ProductFetcher] Successfully fetched ${fetchedList.length} products from DummyJSON API.`);
        return fetchedList;
      }
    }
  } catch (err) {
    console.log('[ProductFetcher] DummyJSON fetch failed, trying FakeStoreAPI...', err.message);
  }

  // Attempt 2: Fetch from FakeStoreAPI
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((p) => {
          fetchedList.push({
            title: p.title,
            description: p.description,
            price: p.price,
            category: formatCategory(p.category),
            stock: 30,
            image: p.image,
            rating: p.rating && p.rating.rate ? p.rating.rate : 4.2,
          });
        });
        console.log(`[ProductFetcher] Successfully fetched ${fetchedList.length} products from FakeStoreAPI.`);
        return fetchedList;
      }
    }
  } catch (err) {
    console.log('[ProductFetcher] FakeStoreAPI fetch failed, falling back to curated list...', err.message);
  }

  // Attempt 3: Return curated HD fallback list
  console.log(`[ProductFetcher] Using ${fallbackProducts.length} curated fallback products with HD images.`);
  return fallbackProducts;
};

module.exports = {
  fetchExternalProducts,
  fallbackProducts,
};
