import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './ListPageStyle.css'
import {gql, useQuery} from '@apollo/client'
import LOGO from '../../assets/logo.png'

function ListPage(){
    
    const searchQuery = window.location.search
    const queryString = new URLSearchParams(searchQuery).get('q')
    const name = queryString

    const [pageNum, updatePage] = useState(1)

    var number = []

    const query = gql`
    query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
            }
            media(search: $search, type: MANGA, sort: FAVOURITES_DESC) {
                id
                coverImage {
      			  extraLarge
      			  large
      			  medium
      			  color
                }
                title {
                    romaji
                    english
                    native
                }
                genres
            }
            pageInfo{
                lastPage
            }
        }
    }
    `;

    const {loading, error, data} = useQuery(query, {
        variables:{
            search: name,
            page: pageNum,
            perPage: 6,
        }
    })

    function nextPage(){
        if(pageNum < data.Page.pageInfo.lastPage) updatePage(currPage => currPage + 1)
    }

    function prevPage(){
        if(pageNum > 0) updatePage(currPage => currPage - 1)
    }

    if(loading) return (
        <div className="loading-screen">
            <img src={LOGO} alt="" style={{width:"4rem"}}/>   
            <h4>Please Wait</h4>
        </div>
    )
    
    let mangaList = data.Page.media;

    return(
        <div className="list-container">
            <h2 className="search-label">Search Result:</h2>
            <hr />
            <div className="list-data">
                {mangaList?.map(manga=>{
                    return(
                        <Link to={`/detail/${manga.id}`} className="card list-card" key={manga.id}>
                            <img className="card-img-top" src={manga.coverImage.large} alt="" />
                            <div className="card-body">
                                <h3 className="card-title">{manga.title.english == null ? manga.title.romaji : manga.title.english}</h3>
                                <p className="card-subtitle">{manga.genres?.map(mangaGenre=>{
                                    return(
                                        <div className="genre-container">{mangaGenre}</div>
                                    )
                                })}</p>
                            </div>
                        </Link>
                    )
                })
                }
            </div>
            <nav>
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" onClick={prevPage}>
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                    </li>
                    <li class="page-item">
                    <a class="page-link" onClick={nextPage}>
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                    </li>
                </ul>
                </nav>
        </div>
    )
}

export default ListPage