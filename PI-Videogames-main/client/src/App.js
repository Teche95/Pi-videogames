import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './components/Home';
import Details from './components/Details';
import CreateGame from "./components/CreateGame"
import LandingPage from './components/LandingPage';
import './reset.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/creategame" component={CreateGame} />
          <Route exact path="/home/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
