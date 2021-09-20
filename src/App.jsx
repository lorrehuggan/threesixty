import Main from './pages/Main';
import { useState } from 'react';
import Nav from './components/Nav/Nav';
import { ThemeProvider } from 'styled-components';
import { styledTheme } from './styles/Mixins';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Film from './pages/Film';
import Genre from './pages/Genre';
import Trending from './pages/Trending';
import Search from './pages/Search';
import { SearchContext } from './contexts/SearchContext';

function App() {
  const [searchData, setSearchData] = useState();

  return (
    <Router>
      <ThemeProvider theme={styledTheme}>
        <SearchContext.Provider value={{ searchData, setSearchData }}>
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
            <Route path="/trending">
              <Trending />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        </SearchContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
