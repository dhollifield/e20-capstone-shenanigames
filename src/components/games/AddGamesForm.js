import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGamesForm.css'

export const AddGamesForm = () => {
    const [newGame, update] = useState({
        name: '',
        minPlayers: '',
        maxPlayers: '',
        suggestedAge: '',
        minPlayingTimeInMinutes: '',
        maxPlayingTimeInMinutes: '',
        imageURL: '',
    });

    const [minAmount, setMinPlayers] = useState([])
    const [maxAmount, setMaxPlayers] = useState([])
    const [age, setSuggestedAge] = useState([])
    const [minTime, setMinPlayingTimeInMinutes] = useState([])
    const [maxTime, setMaxPlayingTimeInMinutes] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch (`http://localhost:8088/minPlayers`)
            const minPlayersArray = await response.json();
            setMinPlayers(minPlayersArray);
        };
        fetchGames();
    },
    []);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch (`http://localhost:8088/maxPlayers`)
            const maxPlayersArray = await response.json();
            setMaxPlayers(maxPlayersArray);
        };
        fetchGames();
    },
    []);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch (`http://localhost:8088/suggestedAge`)
            const ageArray = await response.json();
            setSuggestedAge(ageArray);
        };
        fetchGames();
    },
    []);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch (`http://localhost:8088/minPlayingTime`)
            const minTimeArray = await response.json();
            setMinPlayingTimeInMinutes(minTimeArray);
        };
        fetchGames();
    },
    []);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch (`http://localhost:8088/maxPlayingTime`)
            const maxTimeArray = await response.json();
            setMaxPlayingTimeInMinutes(maxTimeArray);
        };
        fetchGames();
    },
    []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const dataToSendToAPI = {
            name: newGame.name,
            minPlayers: newGame.minPlayers,
            maxPlayers: newGame.maxPlayers,
            suggestedAge: newGame.suggestedAge,
            minPlayingTimeInMinutes: newGame.minPlayingTimeInMinutes,
            maxPlayingTimeInMinutes: newGame.maxPlayingTimeInMinutes,
            imageURL: newGame.imageURL,
        };

        return fetch(`http://localhost:8088/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSendToAPI)
        })
            .then((response) => response.json())
            .then(() => {
                navigate('/');
            });
    }

    return (
        <form className="newGameForm">
            <h2 className="gamesForm__title">Add Game</h2>
            <fieldset className="gameField">
                <div className="form-group">
                    <label htmlFor="gameName">Name of Game</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Game"
                        value={newGame.name}
                        onChange={(event) => {
                            const copy = { ...newGame };
                            copy.name = event.target.value;
                            update(copy);
                        }} />
                </div>
            </fieldset>

            <fieldset className="gameField">
                <div className="form-group">
                    <label htmlFor="minPlayers">Minimum Number of Players</label>
                    <select
                        className="form-control players"
                        defaultValue={newGame.minPlayers}
                        onChange={(event) => {
                            const copy = { ...newGame };
                            copy.minPlayers = event.target.value;
                            update(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {minAmount.map((number) => {
                            return (
                                <option className="minPlayers" kay={number.id} value={number.id}>
                                    {number.minAmount}
                                </option>
                            )
                        })}
                    </select>

                    <label htmlFor="maxPlayers">Maximum Number of Players</label>
                    <select
                        className="form-control form-players"
                        defaultValue={newGame.maxPlayers}
                        onChange={(event) => {
                            const copy = { ...newGame };
                            copy.maxPlayers = event.target.value;
                            update(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {maxAmount.map((number) => {
                            return (
                                <option className="maxPlayers" kay={number.id} value={number.id}>
                                    {number.maxAmount}
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
                        defaultValue={newGame.suggestedAge}
                        onChange={(event) => {
                            const copy = { ...newGame };
                            copy.suggestedAge = event.target.value;
                            update(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {age.map((number) => {
                            return (
                                <option className="suggestedAge" kay={number.id} value={number.id}>
                                    {number.age}
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
                        defaultValue={newGame.minPlayingTimeInMinutes}
                        onChange={(event) => {
                            const copy = { ...newGame };
                            copy.minPlayingTimeInMinutes = event.target.value;
                            update(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {minTime.map((number) => {
                            return (
                                <option className="minPlayingTime" kay={number.id} value={number.id}>
                                    {number.minTime}
                                </option>
                            )
                        })}
                    </select>

                    <label htmlFor="maxPlayingTime">Maximum Playing Time</label>
                    <select
                        className="form-control form-time"
                        defaultValue={newGame.maxPlayingTimeInMinutes}
                        onChange={(event) => {
                            const copy = { ...newGame };
                            copy.maxPlayingTimeInMinutes = event.target.value;
                            update(copy);
                        }}
                    >
                        <option value="" disabled selected>-- Choose --</option>
                        {maxTime.map((number) => {
                            return (
                                <option className="maxPlayingTime" kay={number.id} value={number.id}>
                                    {number.maxTime}
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
                        value={newGame.imageURL}
                        onChange={(event) => {
                        const copy = { ...newGame };
                        copy.imageURL = event.target.value;
                        update(copy);
                        }}
                    />
                </div>
      </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary"
            >
                Submit New Game
            </button>
        </form>
    );
};