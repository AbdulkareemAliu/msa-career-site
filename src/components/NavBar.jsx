import alchemist_final from '../images/alchemist_final.png';
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return <nav className='nav'>
        
        
        <NavLink className="navbar-home" to="/">
            <img src={alchemist_final} alt="Logo" className="home-image" id="logo" height={100}/>
        </NavLink>

        <ul>
            <li>
                <NavLink className="navbar-item" to="/job-board/" activeClassName="active">
                   Job Board
                </NavLink>
            </li>
            <li>
                <NavLink className="navbar-item" to="/referral-page/" activeClassName="active">
                    Referral Page
                </NavLink>
            </li>
            <li>
                <NavLink className="navbar-item" to="https://forms.gle/85xpsPYHMi8afuQh8" activeClassName="active">
                    Submit to Resume Book
                </NavLink>
            </li>
        </ul>
    </nav>

}