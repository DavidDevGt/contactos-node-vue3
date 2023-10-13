CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL
);

INSERT INTO contacts (name, phone) VALUES ('John Doe', '+1234567890');
INSERT INTO contacts (name, phone) VALUES ('Jane Doe', '+1234567891');
