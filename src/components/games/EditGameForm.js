import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import './EditGameForm.css';

export const EditGameForm = () => {

    const [game, setGame] = useState({
        name: '',
        minPlayers: '',
        maxPlayers: '',
        suggestedAge: '',
        minPlayingTimeInMinutes: '',
        maxPlayingTimeInMinutes: '',
        imageURL: '',
    });

    const { gamesId } = useParams();
    const navigate = useNavigate();

    useEffect(
        () => {
            const fetchGames = async () => {
                const response = await fetch(`http://localhost:8088/games?id=${gamesId}`)
                const game = await response.json()
                setGame(game[0])
              }
              fetchGames()
              console.log(game)
        },
        [gamesId]
    );

    const minPlayerOptions = [
        {
            label: "1",
            value: "1"
        },
        {
            label: "2",
            value: "2"
        },
        {
            label: "3",
            value: "3"
        },
        {
            label: "4",
            value: "4"
        },
        {
            label: "5",
            value: "5"
        },
        {
            label: "6",
            value: "6"
        }
    ]

    const maxPlayerOptions = [
        {
            label: "2",
            value: "2"
        },
        {
            label: "3",
            value: "3"
        },
        {
            label: "4",
            value: "4"
        },
        {
            label: "5",
            value: "5"
        },
        {
            label: "6",
            value: "6"
        },
        {
            label: "7",
            value: "7"
        },
        {
            label: "8",
            value: "8"
        },
        {
            label: "9",
            value: "9"
        },
        {
            label: "10+",
            value: "10+"
        }
    ]

    const suggestedAgeOptions = [
        {
            label: "3",
            value: "3"
        },
        {
            label: "4",
            value: "4"
        },
        {
            label: "5",
            value: "5"
        },
        {
            label: "6",
            value: "6"
        },
        {
            label: "7",
            value: "7"
        },
        {
            label: "8",
            value: "8"
        },
        {
            label: "9",
            value: "9"
        },
        {
            label: "10",
            value: "10"
        },
        {
            label: "11",
            value: "11"
        },
        {
            label: "12",
            value: "12"
        },
        {
            label: "13",
            value: "13"
        },
        {
            label: "14",
            value: "14"
        },
        {
            label: "15",
            value: "15"
        },
        {
            label: "16",
            value: "16"
        },
        {
            label: "17",
            value: "17"
        },
        {
            label: "18",
            value: "18"
        }
    ]

    const minPlayingTimeOptions = [
        {
            label: "15",
            value: "15"
        },
        {
            label: "30",
            value: "30"
        },
        {
            label: "45",
            value: "45"
        },
        {
            label: "60",
            value: "60"
        },
        {
            label: "90",
            value: "90"
        },
        {
            label: "120",
            value: "120"
        },
        {
            label: "150",
            value: "150"
        },
        {
            label: "180+",
            value: "180+"
        }
    ]

    const maxPlayingTimeOptions = [
        {
            label: "30",
            value: "30"
        },
        {
            label: "45",
            value: "45"
        },
        {
            label: "60",
            value: "60"
        },
        {
            label: "90",
            value: "90"
        },
        {
            label: "120",
            value: "120"
        },
        {
            label: "150",
            value: "150"
        },
        {
            label: "180",
            value: "180"
        },
        {
            label: "210",
            value: "210"
        },
        {
            label: "240+",
            value: "240+"
        }
    ]

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const saveGame = async () => {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        }
        const response = await fetch (`http://localhost:8088/games/${game.id}`, options)
        await response.json()
        }
        saveGame()
        navigate('/')
    }
        
    return (
        <form className="editGameForm">
            <h2 className="gamesForm__title">Edit Game</h2>
            <fieldset className="gameField">
                <div className="form-group">
                    <label htmlFor="gameName">Name of Game</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Game"
                        value={game.name}
                        onChange={(event) => {
                            const copy = { ...game };
                            copy.name = event.target.value;
                            setGame(copy);
                        }} />
                </div>
            </fieldset>

            <fieldset className="gameField">
                <div className="form-group">
                    <label htmlFor="minPlayers">Minimum Number of Players</label>
                    <select
                        className="form-control players"
                        value={game.minPlayers}
                        onChange={(event) => {
                            const copy = { ...game };
                            copy.minPlayers = event.target.value;
                            setGame(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {minPlayerOptions.map((option) => {
                            return (
                                <option className="minPlayers" key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            )
                        })}
                    </select>

                    <label htmlFor="maxPlayers">Maximum Number of Players</label>
                    <select
                        className="form-control form-players"
                        value={game.maxPlayers}
                        onChange={(event) => {
                            const copy = { ...game };
                            copy.maxPlayers = event.target.value;
                            setGame(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {maxPlayerOptions.map((option) => {
                            return (
                                <option className="maxPlayers" key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </fieldset>

            <fieldset className="gameField">
                <div className="form-group">
                    <label htmlFor="suggestedAge">Suggested Minimum Age of Players</label>
                    <select
                        className="form-control form-age"
                        value={game.suggestedAge}
                        onChange={(event) => {
                            const copy = { ...game };
                            copy.suggestedAge = event.target.value;
                            setGame(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {suggestedAgeOptions.map((option) => {
                            return (
                                <option className="suggestedAge" key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </fieldset>

            <fieldset className="gameField">
                <div className="form-group">
                    <label htmlFor="minPlayingTime">Minimum Playing Time</label>
                    <select
                        className="form-control form-time"
                        value={game.minPlayingTimeInMinutes}
                        onChange={(event) => {
                            const copy = { ...game };
                            copy.minPlayingTimeInMinutes = event.target.value;
                            setGame(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {minPlayingTimeOptions.map((option) => {
                            return (
                                <option className="minPlayingTime" key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            )
                        })}
                    </select>

                    <label htmlFor="maxPlayingTime">Maximum Playing Time</label>
                    <select
                        className="form-control form-time"
                        value={game.maxPlayingTimeInMinutes}
                        onChange={(event) => {
                            const copy = { ...game };
                            copy.maxPlayingTimeInMinutes = event.target.value;
                            setGame(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {maxPlayingTimeOptions.map((option) => {
                            return (
                                <option className="maxPlayingTime" key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </fieldset>

            <fieldset className="gameField">
                <div className="form-group">
                    <label htmlFor="type">Image URL</label>
                    <input
                        required
                        autoFocus
                        className="form-control"
                        value={game.imageURL}
                        onChange={(event) => {
                        const copy = { ...game };
                        copy.imageURL = event.target.value;
                        setGame(copy);
                        }}
                    />
                </div>
      </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary"
            >
                Save Game
            </button>
        </form>
    );
};