import Database from "better-sqlite3";

export const db = new Database("pimaze.sqlite");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pi_user_uid TEXT UNIQUE,
  username TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payment_id TEXT UNIQUE,
  pi_user_uid TEXT,
  amount REAL,
  status TEXT,
  txid TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pi_user_uid TEXT,
  week_key TEXT,
  points INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(pi_user_uid, week_key)
);
`);
db.exec(`
CREATE TABLE IF NOT EXISTS progress (
  username TEXT PRIMARY KEY,
  max_level INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS referrals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  inviter TEXT NOT NULL,
  invitee TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  rewarded_at TEXT,
  UNIQUE(invitee)
);