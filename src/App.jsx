import Main from './pages/Main';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Mixins';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
