import { Route, Routes } from 'react-router-dom';
import { CommunityViewCollection } from '../collection/CommunityViewCollection';
import { UserCollection } from '../collection/UserCollection';
import { CommunityList } from '../community/CommunityList';
import { GamesContainer } from '../games/GamesContainer';
import { UserWishList } from '../wishlist/UserWishList';

export const UserViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <GamesContainer />
          </>
        }
      ></Route>
      <Route path="community" element={<CommunityList />} />
      <Route path="communityViewCollection/:id" element={<CommunityViewCollection />} />
      <Route path="userCollection" element={<UserCollection />} />
      <Route path="userWishlist" element={<UserWishList />} />
      <Route path="userWishlist/:userId" element={<UserWishList />} />
      <Route path="userCollection/:userId" element={<UserCollection />} />
    </Routes>
  );
};