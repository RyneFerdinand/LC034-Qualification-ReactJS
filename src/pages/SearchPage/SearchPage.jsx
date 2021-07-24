import './SearchPageStyle.css'

function SearchPage(){
    return(
        <div className="search-container">
            <form action="/list-page" method="GET" className="search-form">
                <label htmlFor="q">Find Weeb Material</label>
                <input type="text" className="search-bar" name="q" placeholder="Your Search Here"/>
                <input type="submit" value="SEARCH" className="search-btn"/>
            </form>
        </div>
    )
}

export default SearchPage