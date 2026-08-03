INSERT INTO authors (name, email, bio) VALUES
    ('John Doe', 'john.doe@example.com', 'Software developer'),
    ('Jane Smith', 'jane.smith@example.com', 'Graphic designer'),
    ('Emily Johnson', 'emily.johnson@example.com', 'Content writer');

INSERT INTO posts (title, content, author_id, published) VALUES
    ('First Post', 'This is the content of the first post.', 1, true),
    ('Second Post', 'This is the content of the second post.', 2, false),
    ('Third Post', 'This is the content of the third post.', 3, true);