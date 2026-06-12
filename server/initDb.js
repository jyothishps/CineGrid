import pool from './db.js';

const createTables = async () => {
    try {
        const createUsersQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createUsersQuery);
        console.log("Users table created or already exists.");

        const createWatchlistQuery = `
            CREATE TABLE IF NOT EXISTS watchlist (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                movie_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                poster_path VARCHAR(255),
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY user_movie (user_id, movie_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        await pool.query(createWatchlistQuery);
        console.log("Watchlist table created or already exists.");
        
        process.exit();
    } catch (error) {
        console.error("Error creating tables:", error);
        process.exit(1);
    }
};

createTables();
