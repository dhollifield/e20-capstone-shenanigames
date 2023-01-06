import { useState } from "react"
import { GamesList } from "./GamesList"
import { GamesSearch } from "./GamesSearch"

export const GamesContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
            <div className="pageTitle">DISCOVER GAMES</div>
            <GamesSearch setterFunction={setSearchTerms} />
            <GamesList searchTermState={searchTerms} />
    </>
}