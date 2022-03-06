import { useContext } from "react"
import { UidContext } from "./AppContext"
import { NavLink } from "react-router-dom"

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBaby, faUserLarge } from '@fortawesome/free-solid-svg-icons'

import Logout from './Log/Logout'

// Redux
import { useSelector } from "react-redux"


const Navbar = () => {
  const uid = useContext(UidContext)
  const userData = useSelector(((state) => state.userReducer))

  return (
    <nav>
      <div className="nav-container">
        <div className="home-logo">
          <NavLink exact to="/">
          <FontAwesomeIcon icon={faHome} />
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li className="header-profile">
              <NavLink exact to="/profile">
                <div className="profile-icon-container">
                  <FontAwesomeIcon icon={faBaby} />
                  Profil
                </div>
                <h5>Bienvenue { userData.pseudo }</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li className="header-profile">
              <NavLink exact to="/profile">
              <FontAwesomeIcon icon={faUserLarge} />
              <h5>Login</h5>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
