import React, { useEffect, useState } from 'react';
import { getWatchlist, removeFromWatchlist, getImageURL } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MoviesContext';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MovieDetails from '../components/MovieDetails';

function Watchlist() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { openMovieDetails, selectedMovieId, closeMovieDetails } = useMovies();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            loadWatchlist();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadWatchlist = async () => {
        try {
            setLoading(true);
            const data = await getWatchlist();
            setMovies(data);
        } catch (err) {
            setError("Failed to load watchlist");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (movieId) => {
        try {
            await removeFromWatchlist(movieId);
            setMovies(movies.filter(m => m.movie_id !== movieId));
        } catch (err) {
            console.error("Failed to remove movie", err);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col justify-between">
            <NavBar />

            <main className="flex-grow container mx-auto pt-28 pb-12 px-4 md:px-8">
                <h1 className="text-3xl font-bold text-white mb-8">My Watchlist</h1>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-neutral-400">Loading your watchlist...</p>
                    </div>
                ) : !user ? (
                    <div className="text-center py-20">
                        <p className="text-neutral-400 mb-4">Please login to view your watchlist.</p>
                        <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                            Login
                        </Link>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">{error}</div>
                ) : movies.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-neutral-400 text-lg mb-4">Your watchlist is empty.</p>
                        <Link to="/home" className="text-purple-400 hover:underline">Browse movies</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <div
                                key={movie.movie_id}
                                onClick={() => openMovieDetails(movie.movie_id)}
                                className="relative group bg-neutral-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
                            >
                                <div className="relative aspect-[2/3]">
                                    <img
                                        src={getImageURL(movie.poster_path, 'w500')}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    {/* Trash Button - always visible and accessible */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(movie.movie_id);
                                        }}
                                        className="absolute top-2 right-2 z-20 p-2 bg-red-600/90 hover:bg-red-500 text-white rounded-full shadow-md backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
                                        aria-label="Remove from Watchlist"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>

                                    {/* Hover overlay for desktop */}
                                    <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                                        <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1">View Details</p>
                                    </div>
                                </div>
                                
                                {/* Card Info Below Card */}
                                <div className="p-3 bg-neutral-800">
                                    <h3 className="text-white text-sm font-semibold truncate" title={movie.title}>
                                        {movie.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />

            {/* Movie Details Modal */}
            {selectedMovieId && (
                <MovieDetails movieId={selectedMovieId} onClose={closeMovieDetails} />
            )}
        </div>
    );
}

export default Watchlist;
