import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

// Pages
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'
import Trending from '../../pages/Trending'

import Navbar from '../Navbar'

const index = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/trending' exact component={Trending} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default index



