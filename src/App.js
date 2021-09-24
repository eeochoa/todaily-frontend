import './App.css';
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Switch, Route}  from "react-router-dom";
import DrawerMenu from './components/Navbar/DrawerNavbar'
import Todo from './pages/Todo/Todo';
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <>
      <Router>
        <DrawerMenu />
        <Switch>
          <Route path='/' exact component={Todo} />
          <Route path='/dashboard' exact component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
