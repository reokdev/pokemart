-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  clerk_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  condition TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create grading_submissions table
CREATE TABLE IF NOT EXISTS grading_submissions (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  card_name TEXT NOT NULL,
  set_name TEXT NOT NULL,
  service_level TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample products
INSERT INTO products (name, description, price, image_url, stock_quantity, category, condition) VALUES
('Charizard Base Set', 'Original Base Set Charizard in Near Mint condition', 999.99, 'https://images.pokemontcg.io/base1/4.png', 5, 'Base Set', 'PSA 9'),
('Pikachu Illustrator', 'Extremely rare Pikachu Illustrator promo card', 5999.99, 'https://images.pokemontcg.io/promo/1.png', 1, 'Promo', 'PSA 7'),
('1st Edition Shadowless Blastoise', 'First Edition Shadowless Blastoise in excellent condition', 1499.99, 'https://images.pokemontcg.io/base1/2.png', 3, 'Base Set', 'PSA 8'),
('Shining Charizard Neo Destiny', 'Shining Charizard from Neo Destiny', 799.99, 'https://images.pokemontcg.io/neo4/107.png', 2, 'Neo Destiny', 'PSA 8'),
('Ancient Mew Promo', 'Sealed Ancient Mew promo card', 99.99, 'https://images.pokemontcg.io/movie/1.png', 10, 'Promo', 'Sealed'); 