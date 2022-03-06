import axios from 'axios'
import cookie from 'js-cookie'

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'

const Logout = () => {

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = async () => {
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true
    })
      .then(() => removeCookie('socialNetworkMERN'))
      .catch((err) => console.log(err))

    window.location = "/"
  }

  return (
    <li onClick={logout}>
      <FontAwesomeIcon icon={faPersonRunning} />
      <h5>Logout</h5>
    </li>
  )
}

export default Logout
