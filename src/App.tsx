import { Route, Switch } from 'react-router-dom'

import Home from './views/home'
import Space from './views/space'

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/s/:spaceId">
        <Space />
      </Route>
    </Switch>
  )
}

export default App
