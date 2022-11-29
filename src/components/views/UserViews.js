import { Route, Routes } from 'react-router-dom';
import { GamesList } from "../games/GamesList";

export const UserViews = () => {
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
    </Routes>
  );
};