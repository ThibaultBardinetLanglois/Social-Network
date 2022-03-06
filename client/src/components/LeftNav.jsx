import { NavLink } from 'react-router-dom'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBookOpenReader, faUserLarge } from '@fortawesome/free-solid-svg-icons'

const LeftNav = () => {
  return (
    <div className='left-nav-container'>
      <div className="icons">
        <NavLink to="/" exact activeClassName='active-left-nav'>
        <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <br />
        <NavLink to="/trending" exact activeClassName='active-left-nav'>
        <FontAwesomeIcon icon={faBookOpenReader} />
        </NavLink>
        <br />
        <NavLink to="/profile" exact activeClassName='active-left-nav'>
        <FontAwesomeIcon icon={faUserLarge} />
        </NavLink>
      </div>
    </div>
  )
}

export default LeftNav
