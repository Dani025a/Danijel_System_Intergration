-- Create tables
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    address VARCHAR(255)
);

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    bio TEXT
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INTEGER REFERENCES authors(author_id),
    publish_date DATE,
    isbn VARCHAR(20),
    description TEXT
);

-- Users
INSERT INTO users (firstname, lastname, email, password, address) VALUES
('John', 'Doe', 'john@example.com', 'password123', '123 Main St'),
('Jane', 'Smith', 'jane@example.com', 'password456', '456 Elm St'),
('Alice', 'Johnson', 'alice@example.com', 'password789', '789 Oak St');

-- Authors
INSERT INTO authors (author_name, bio) VALUES
('Stephen King', 'Stephen King is an American author known for his horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels.'),
('J.K. Rowling', 'J.K. Rowling is a British author known for her fantasy series, Harry Potter.'),
('Agatha Christie', 'Agatha Christie was an English writer known for her detective novels and short story collections.');

-- Books
INSERT INTO books (title, author_id, publish_date, isbn, description) VALUES
('It', 1, '1986-09-15', '978-0451169518', 'It is a horror novel by Stephen King.'),
('Harry Potter and the Philosopher''s Stone', 2, '1997-06-26', '978-0747532743', 'The first book in the Harry Potter series by J.K. Rowling.'),
('Murder on the Orient Express', 3, '1934-01-01', '978-0007119318', 'A detective novel by Agatha Christie.');

-- Create users with different permissions
-- All PRIVILEGES Admin
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin_user;

-- Author and books PRIVILEGES Author
CREATE USER author_user WITH PASSWORD '123';
GRANT SELECT, INSERT, UPDATE, DELETE ON authors, books TO author_user;


-- User PRIVILEGES Users
CREATE USER user_user WITH PASSWORD '123';
GRANT SELECT ON authors, books TO user_user;
GRANT SELECT, INSERT, UPDATE, DELETE (firstname, lastname, email, address) ON users TO user_user;
