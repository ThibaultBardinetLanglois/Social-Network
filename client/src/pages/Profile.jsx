import { useContext } from 'react'
import { UidContext } from '../components/AppContext'

// components
import UpdateProfile from '../components/Profile/UpdateProfile'
import Log from '../components/Log'

const Profile = () => {
  const uid = useContext(UidContext)

  return (
    <div className='profile-page'>
      {uid ? (
        <UpdateProfile />
      ) : (
        <div className='container'>
          <Log signin={false} signup={true} />
          <img src="./img/login.png" alt="login.png"/>
        </div>
      )}
    </div>
  )
}

export default Profile
