import { Route, Routes } from 'react-router';
import Library from './pages/library.page.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import WarningContextProvider from './context/warning.context.js';
import AccessPage from './pages/access.page.js';

library.add(fas, far, fab);

function App() {

  return (
    <WarningContextProvider>
      <Routes>
        <Route path='/' element={<AccessPage />} />
        <Route path='/library' element={<Library />} />
      </Routes>
    </WarningContextProvider>

  )
}

export default App;
