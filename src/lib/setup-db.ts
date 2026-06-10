import mysql from "mysql2/promise";

// Run: npx tsx src/lib/setup-db.ts

async function setup() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 4000,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "aitools_global",
    ssl: process.env.DB_SSL === "true" ? {} : undefined,
  });

  console.log("Connected to TiDB. Creating tables...");

  // Tools table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS tools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      slug VARCHAR(200) NOT NULL UNIQUE,
      url VARCHAR(500) NOT NULL,
      description TEXT NOT NULL,
      description_zh TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      tags JSON NOT NULL,
      pricing VARCHAR(50) NOT NULL DEFAULT 'Freemium',
      logo VARCHAR(10) NOT NULL DEFAULT '🤖',
      featured TINYINT(1) NOT NULL DEFAULT 0,
      source VARCHAR(50) NOT NULL DEFAULT 'manual',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_category (category),
      INDEX idx_featured (featured),
      INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log("✓ tools table ready");

  // News table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(200) NOT NULL UNIQUE,
      date DATE NOT NULL,
      category VARCHAR(100) NOT NULL,
      excerpt TEXT NOT NULL,
      tags JSON NOT NULL,
      content MEDIUMTEXT NOT NULL,
      source VARCHAR(50) NOT NULL DEFAULT 'manual',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_date (date),
      INDEX idx_category (category),
      INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log("✓ news table ready");

  // Seed initial data from static files
  const { tools } = await import("@/data/tools");
  const { newsArticles } = await import("@/data/news");

  let toolCount = 0;
  for (const t of tools) {
    try {
      await conn.execute(
        `INSERT IGNORE INTO tools (name, slug, url, description, description_zh, category, tags, pricing, logo, featured, source)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'seed')`,
        [t.name, t.id, t.url, t.description, t.descriptionZh, t.category, JSON.stringify(t.tags), t.pricing, t.logo, t.featured]
      );
      toolCount++;
    } catch { /* skip dupes */ }
  }
  console.log(`✓ Seeded ${toolCount} tools`);

  let newsCount = 0;
  for (const a of newsArticles) {
    try {
      await conn.execute(
        `INSERT IGNORE INTO news (title, slug, date, category, excerpt, tags, content, source)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'seed')`,
        [a.title, a.slug, a.date, a.category, a.excerpt, JSON.stringify(a.tags), a.content]
      );
      newsCount++;
    } catch { /* skip dupes */ }
  }
  console.log(`✓ Seeded ${newsCount} articles`);

  await conn.end();
  console.log("\n✅ Database setup complete!");
}

setup().catch((e) => {
  console.error("Setup failed:", e.message);
  process.exit(1);
});
