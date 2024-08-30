import Header from "../components/Header"
import DrawerWithNavigation from "../components/MenuItems"
import SideHeader from "../components/SideHeader"


const Navbar = () => {
    return(
        <>
            <Header />
            <SideHeader />
            <DrawerWithNavigation />
        </>
    )
}

export default Navbar