import Main from './pages/Main';
import Nav from './components/Nav/Nav';
import { ThemeProvider } from 'styled-components';
import { styledTheme } from './styles/Mixins';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Film from './pages/Film';
import Genre from './pages/Genre';

function App() {
  return (
    <Router>
      <ThemeProvider theme={styledTheme}>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/film/:id">
            <Film />
          </Route>
          <Route path="/genre/:id">
            <Genre />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
