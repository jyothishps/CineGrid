import React from 'react'

function Footer() {
  return <footer className='bg-neutral-900 text-neutral-400 border-t border-neutral-800'>
    <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div>
                <a href="/" className='inline-block mb-6'>
                <span className='text-purple-500 font-bold text-2xl'>
                    Cine<span className='text-white'>Box</span>
                </span>
            </a>
            <p className='mb-4 text-sm'>
                Discover and explore the latest movies from around the world.
                CineBox gives you access to a vast collection of films across all genres. 
            </p>
            <div className='flex space-x-4'>
            </div>
            </div>

            <div>
                <h3 className='text-white font-semibold text-lg mb-4'>Quick Links</h3>
                <ul className='space-y-2 text-sm'>
                    <li>
                        <a href="#" className='hover:text-purple-400 transition-all'>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#trending" className='hover:text-purple-400 transition-all'>
                            Trending
                        </a>
                    </li>
                    <li>
                        <a href="#popular" className='hover:text-purple-400 transition-all'>
                            Popular
                        </a>
                    </li>
                    <li>
                        <a href="#top-rated" className='hover:text-purple-400 transition-all'>
                            Top Rated
                        </a>
                    </li>
                    <li>
                        <a href="#genre" className='hover:text-purple-400 transition-all'>
                            Browse by Genres
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </footer>
}

export default Footer