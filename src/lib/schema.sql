-- Users are managed by Stack Auth, but we can reference their ID if needed for local joins or just use the ID directly in our tables.

CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL, -- Stack Auth User ID
  name TEXT NOT NULL,
  expiry_date DATE NOT NULL,
  quantity TEXT,
  status TEXT CHECK (status IN ('active', 'consumed', 'discarded')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recipes (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown content
  ingredients_used JSONB, -- List of ingredient IDs or names used
  saved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_stats (
  user_id TEXT PRIMARY KEY,
  money_saved DECIMAL(10, 2) DEFAULT 0,
  food_rescued_count INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
