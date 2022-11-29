import { UserNav } from "./UserNav";
import { AdminNav } from "./AdminNav";

export const NavBar = () => {
    const capstoneUser = localStorage.getItem("capstone_user")
    const gamesUserObject = JSON.parse(capstoneUser)

    if (gamesUserObject.isAdmin) {
        return <AdminNav />
    }
    else {
        return <UserNav />
    }
}