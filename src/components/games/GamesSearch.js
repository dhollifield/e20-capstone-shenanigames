export const GamesSearch =({ setterFunction }) => {
    return (
        <div className="search">
            <input 
                className="searchBar"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
            type="text" placeholder="Enter search terms" />    
        </div>
    )
}