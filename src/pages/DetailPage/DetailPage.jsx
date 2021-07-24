import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import {gql, useQuery} from '@apollo/client'
import './DetailPageStyle.css'
import { FavoriteContext } from '../../contexts/FavoriteContext'
import LOGO from '../../assets/logo.png'



function DetailPage(){

    var favorites = useContext(FavoriteContext)

    function addFavors(manga){
        favorites.updateFavorites(manga)
    }

    let {id} = useParams();

    const query = gql`
    query ($id: Int) {
        Page{
            media(id: $id, type: MANGA, sort: FAVOURITES_DESC) {
                id
                coverImage {
                    large
                }
                title {
                    romaji
                    english
                    native
                }
                genres
                description
                characters(sort: ID, page: 1, perPage: 6){
                    nodes {
                        id
                        name {
                            first
                            middle
                            last
                            full
                        }
                        image {
                            large
                            medium
                        }
                        gender
                        age
                    }
                }
            }
        }
    }
    `;
    
    const {loading, error, data} = useQuery(query, {
        variables:{
            id: id
        }
    })

    if(loading) return(
        <div className="loading-screen">
            <img src={LOGO} alt="" style={{width:"4rem"}}/>   
            <h4>Please Wait</h4>
        </div>
    )
    
    let manga = data.Page.media[0]


    return(
        <div className="detail-container">
            <div className="main-detail">
                <img className="card-img-top" src={manga.coverImage.large} alt="" />
                <svg onClick={()=>{addFavors(manga)}} className="heart-icon" style={{fill: favorites.checkFavorites(manga) ? "red" : "transparent"}} viewBox="-10 -28 535.00002 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/>
                </svg>

                <h2>{manga.title.english}</h2>
                <p className="genre-single">{manga.genres?.map(mangaGenre=>{
                    return(
                        <div className="genre-contain">{mangaGenre}</div>
                    )
                })}</p>
            </div>
            <div className="description">
                <h3>Description</h3>
                <p dangerouslySetInnerHTML={{__html: manga.description}} />
            </div>
            <div className="characters">
                <h3>Characters</h3>
                <div className="character-list">
                    {manga.characters.nodes?.map(character=>{
                        return(
                            <div className="character-card">
                                <img src={character.image.large} alt="" />
                                <h3>{character.name.first} {character.name.middle} {character.name.last}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );

}



export default DetailPage

