import { useParams } from 'react-router-dom';
import { useFetch } from '../hook/UseFetch';
import { GamesList } from './GamesList';
// import './Search.css';

export const Search = () => {
  //gets value of search query
  // const queryString = useLocation();
  // const queryParams = new URLSearchParams(queryString);
  // const query = queryParams.get('q');

  const { searchWord } = useParams();

  //used send request to look up query for search
  const url = 'http://localhost:8088/games?q=' + searchWord;

  const { error, isPending, data } = useFetch(url);

    return (
        <>
        <div>
            {error && <p className="error"> {error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <GamesList games={data} />}
        </div>
    </>
    )
}