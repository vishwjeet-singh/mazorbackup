import Hyperlocal from './components/hyperlocal/hyperlocal'
import { Route, Switch } from 'react-router-dom';
import FootInsights from './footinsights';
import Advertising from './components/advertising/advertising'
import Useraccount from './components/useraccount/useraccount'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={FootInsights} />
        <Route exact path='/hyperlocal' component={Hyperlocal} />
        <Route exact path='/advertising' component={Advertising}/>
        <Route exact path='/useraccount' component={Useraccount}/>
      </Switch>
    </div>
  );
}

export default App;
