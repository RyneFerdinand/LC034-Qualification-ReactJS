import React, { createContext, useState, useEffect } from 'react'


export const FavoriteContext = createContext();

function FavoriteContextProvider(props){

    const [favorites, setFavorites] = useState(() => {
        const localData = localStorage.getItem('favorites')
        return localData ? JSON.parse(localData) : []
        }
    )

    function updateFavorites(manga){
        if(!checkFavorites(manga)){
            addFavorites(manga)
        } else {
            removeFavorites(manga)
        }
    }

    function addFavorites(manga){
        setFavorites([...favorites, manga]);
    }

    function removeFavorites(manga){
        setFavorites(favorites.filter(favorite => favorite.id !== manga.id))
    }

    function checkFavorites(manga){
        var isInArray = false;
        favorites.forEach(favs => {
            if(favs.id === manga.id){
                isInArray = true
            }
        });
        return isInArray
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    return(
        <FavoriteContext.Provider value={{favorites, updateFavorites, checkFavorites}}>
            { props.children }
        </FavoriteContext.Provider>
    )
    
}

export default FavoriteContextProvider