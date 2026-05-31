# 🎬 CineGrid - Movie Discovery Platform

A modern full-stack web application to discover, browse, and explore movies with a sleek, responsive interface powered by the TMDB API.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📖 Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Future Enhancements](#future-enhancements)

---

## 🎯 About

**CineGrid** is a modern full-stack movie discovery platform where users can browse trending, popular, and top-rated movies, search by title, and explore detailed information including cast, genres, ratings, budget, revenue, and production companies — all powered by the TMDB (The Movie Database) API.

The frontend is built with **React + Vite** for fast hot-module reloading and a smooth developer experience. The backend runs on **Node.js with Express**, exposing a clean REST API backed by a **MySQL** database for user authentication.

Developed as a **Micro Project** for the Web Development Lab — S1 MCA, 2025.

---

## ✨ Features

### 🎥 **Movie Discovery**
- **Trending Movies** — Browse this week's trending titles
- **Popular Movies** — Explore what's popular right now
- **Top Rated Movies** — Discover the highest-rated films of all time
- **Live Search** — Debounced search with instant dropdown results and poster previews
- **Movie Details Modal** — Full details including tagline, overview, genres, runtime, rating, cast, budget, revenue, and production companies

### 🔐 **Authentication**
- **User Registration** — Sign up with username, email, and password
- **User Login** — Secure login with session-based access
- **Protected Routes** — Home page accessible only to logged-in users
- **Logout** — Clear session and redirect to login

### 🎨 **UI/UX**
- **Dark Theme** — Sleek neutral-900 palette with purple accents
- **Sticky Navbar** — Transparent on top, frosted glass on scroll
- **Smooth Movie Slider** — Horizontal scrollable sections with left/right buttons
- **Hover Overlay** — Rating, year, and View Details button appear on card hover
- **Responsive Design** — Fully mobile-friendly layout using Tailwind CSS
- **Loading Spinner** — Shown while fetching movie details
- **Error Handling** — Graceful error state for failed API calls

---

## 💻 Installation

### Prerequisites
- Node.js v18 or higher
- MySQL
- npm or yarn

### Check if Node is Installed
```bash
node --version
npm --version
```

### Steps to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/jyothishps/CineGrid.git
   cd CineGrid
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the `backend/` folder:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=cinegrid
   PORT=5000
   ```

4. **Initialize the database**
   ```bash
   node initDB.js
   ```

5. **Start the backend server**
   ```bash
   node index.js
   ```

6. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

7. **Start the frontend**
   ```bash
   npm run dev
   ```

8. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🔄 How It Works

### App Flow

1. **User visits the app**
   - Redirected to `/login` by default
   - Can navigate to `/register` to create an account

2. **Authentication**
   - User registers with username, email, and password
   - On login, session is established and user is redirected to `/home`

3. **Home Page**
   - Navbar shows the user's name and Logout button
   - Three movie sliders load: Trending, Popular, Top Rated
   - Smooth scroll navigation via navbar links

4. **Search**
   - User types in the search bar (triggers after 3+ characters)
   - Debounced API call fetches results from TMDB
   - Dropdown shows up to 5 results with poster and year
   - Clicking a result opens the Movie Details modal

5. **Movie Details**
   - Full-screen modal with backdrop image, floating poster, and metadata
   - Shows cast grid, genre tags, production companies
   - Closes on clicking outside, the X button, or pressing Escape

### Controls
- **Click a movie card** — Opens full details modal
- **Search bar** — Type 3+ characters to see live results
- **← → buttons** — Scroll movie sliders left and right
- **Escape key** — Close the movie details modal
- **Navbar links** — Smooth scroll to Trending / Popular / Top Rated sections

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Routing | React Router DOM |
| State Management | React Context API |
| Backend | Node.js, Express |
| Database | MySQL (mysql2/promise) |
| External API | TMDB (The Movie Database) API |
| Environment | dotenv |

### Key Concepts
- REST API with Express
- React Context for global state (Auth + Movies)
- Debounced search with `setTimeout` cleanup
- Promise.all for parallel API calls
- Protected Routes with React Router
- Connection pooling with mysql2

---

## 📁 Project Structure

```
CineGrid/
├── backend/
│   ├── routes/
│   │   └── auth.js            # Auth routes (login, register)
│   ├── db.js                  # MySQL connection pool
│   ├── index.js               # Express server entry point
│   ├── initDB.js              # Creates users table
│   └── .env                   # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx         # Sticky navbar with live search
│   │   │   ├── MovieSlider.jsx    # Horizontal scrollable movie cards
│   │   │   ├── MovieDetails.jsx   # Movie detail modal
│   │   │   └── ProtectedRoute.jsx # Route guard for auth
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Auth state (user, login, logout)
│   │   │   └── MoviesContext.jsx  # Movie modal state
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Main homepage
│   │   │   ├── Login.jsx          # Login page
│   │   │   └── Register.jsx       # Registration page
│   │   ├── services/
│   │   │   └── api.js             # TMDB API functions
│   │   └── App.jsx                # Root component with routes
│   ├── index.html
│   └── vite.config.js
└── README.md
```

---

## 🌐 API Reference

### TMDB Endpoints Used

| Function | Endpoint |
|---|---|
| `fetchTrendingMovies` | `/trending/movie/week` |
| `fetchPopularMovies` | `/movie/popular` |
| `fetchTopRatedMovies` | `/movie/top_rated` |
| `fetchMoviesByGenre` | `/discover/movie?with_genres={id}` |
| `fetchGenres` | `/genre/movie/list` |
| `fetchMovieDetails` | `/movie/{id}` |
| `fetchMovieCredits` | `/movie/{id}/credits` |
| `searchMovies` | `/search/movie?query={q}` |

### Backend Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and start session |

---

## 🚀 Future Enhancements

- [ ] Watchlist feature with persistent storage per user
- [ ] Trailer playback via YouTube embed
- [ ] Genre-based filtering and browsing
- [ ] Infinite scroll instead of horizontal sliders
- [ ] User profile page with watch history
- [ ] Movie ratings and reviews by users
- [ ] Dark / Light theme toggle

---

## 👨‍💻 Author

**Jyothish P S**
- GitHub: [@jyothishps](https://github.com/jyothishps)
- Email: psjyothish07@gmail.com

---

## ⭐ Show Your Support

Give a ⭐ if you like this project!

---

**Made with ❤️ and React**

**Happy Watching! 🎬**