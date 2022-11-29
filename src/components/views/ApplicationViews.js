import { UserViews } from "./UserViews";
import { AdminViews } from "./AdminViews";

export const ApplicationViews = () => {

  const capstoneUser = localStorage.getItem("capstone_user")
  const gamesUserObject = JSON.parse(capstoneUser)

  if (gamesUserObject.isAdmin) {
      return <AdminViews />
  }
  else {
      return <UserViews />
  }
}
