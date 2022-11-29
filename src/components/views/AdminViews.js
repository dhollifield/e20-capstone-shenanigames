import { Route, Routes } from 'react-router-dom';
import { AddGamesForm } from '../games/AddGamesForm';
import { GamesList } from "../games/GamesList";

export const AdminViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <GamesList />
          </>
        }
      ></Route>
      <Route path="games/addNew" element={<AddGamesForm />} />
    </Routes>
  );
};