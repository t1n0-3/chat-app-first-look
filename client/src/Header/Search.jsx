import './Search.css'
function SearchComponent() {

    return (
        <div className="search-form">
            <input className='searchInput' type="text" placeholder="Search..." />
            <button type="submit">Search</button>
        </div>
    );
}

export default SearchComponent;