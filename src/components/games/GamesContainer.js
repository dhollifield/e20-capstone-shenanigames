import { useState } from "react"
import { GamesList } from "./GamesList"
import { GamesSearch } from "./GamesSearch"

export const GamesContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
            <GamesSearch setterFunction={setSearchTerms} />
            <GamesList searchTermState={searchTerms} />
    </>
}