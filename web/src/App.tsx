import { Route, Routes } from 'react-router';
import HomePage from './pages/home.page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import WarningContextProvider from './context/warning.context';

library.add(fas, far, fab);

function App() {

  return (
    <WarningContextProvider>
      <Routes>
        <Route path='/library' element={<HomePage />} />
      </Routes>
    </WarningContextProvider>

  )
}

export default App;
