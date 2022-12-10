import { Route, Routes } from 'react-router-dom';
import { AdminCollection } from '../collection/AdminCollection';
import { CommunityList } from '../community/CommunityList';
import { AddGamesForm } from '../games/AddGamesForm';
import { EditGameForm } from '../games/EditGameForm';
import { GamesList } from "../games/GamesList";
import { AdminWishList } from '../wishlist/AdminWishList';

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
      <Route path="community" element={<CommunityList />} />
      <Route path="adminCollection" element={<AdminCollection />} />
      <Route path="addNew" element={<AddGamesForm />} />
      <Route path="editGame/:gamesId" element={<EditGameForm />} />
      <Route path="adminWishlist" element={<AdminWishList />} />
    </Routes>
  );
};