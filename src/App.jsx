import Main from './pages/Main';
import Nav from './components/Nav/Nav';
import { ThemeProvider } from 'styled-components';
import { styledTheme } from './styles/Mixins';

function App() {
  return (
    <ThemeProvider theme={styledTheme}>
      <Nav />
      <Main />
    </ThemeProvider>
  );
}

export default App;
