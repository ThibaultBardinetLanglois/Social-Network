import { useEffect, useState } from 'react'
import { UidContext } from './components/AppContext'
import Routes from './components/Routes'
import axios from "axios"

// redux
import { useDispatch } from 'react-redux'
import { getUser } from './actions/user.actions'

const App = () => {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

  // with create context we can stock one authentication data each times the dom is reloaded
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true
      })
      .then((res) => setUid(res.data))
      .catch((err) => console.log("No token"))
    }
    fetchToken()
    
    if (uid) dispatch(getUser(uid))
  }, [uid])


  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
