import React, { useState, useEffect, useRef } from 'react';

function RecipePage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const timeoutLoad = useRef(null);

    useEffect(() => {
        const fetchRecipes = async (searchQuery) => {
            if (!searchQuery.trim()) {
                setRecipes([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const APP_ID = '43872d17';
                const API_KEY = 'ee4dcb79ffcc15019e38f405dafd0ce3';

                const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                setRecipes(data.hits.slice(0, 30));
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (timeoutLoad.current) {
            clearTimeout(timeoutLoad.current);
        }

        timeoutLoad.current = setTimeout(() => {
            fetchRecipes(query);
        }, 800);

        return () => {
            if (timeoutLoad.current) {
                clearTimeout(timeoutLoad.current);
            }
        };
    }, [query]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setQuery(event.target.value);
            event.target.value = ''; //ima error, kad se unese nesto i klikne enter ali kad se kroz 800ms pojave stvari vrati se i u input rec
        }
    };

    if (loading) return <p className='text-right'>Loading...</p>;//srediti ovo i error css
    if (error) return <p className='text-right'>Error: {error}</p>;

    return (
        <div className='w-full p-4'>
            <h1 className='font-serif font-black text-4xl text-center mt-16 mb-4'>Recipes</h1>
            <div className='flex flex-col items-center mb-4'>
                <input
                    type="text"
                    placeholder='Type in a recipe...'
                    className='p-2 w-full max-w-md text-center border border-gray-300 rounded'
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {query && (
                    <h2 className='font-serif text-2xl text-center mt-4'>
                        Recipes for: {query}
                    </h2>
                )}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
                {recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <div key={index} className='w-full h-fit border border-black bg-rose-900 rounded'>
                            <img src={recipe.recipe.image} alt={recipe.recipe.label} className='w-full h-48 object-cover' />
                            <p className='text-white text-center p-2'>{recipe.recipe.label}</p>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center col-span-full text-2xl italic">
                        {/* <p>No recipes</p> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipePage;
