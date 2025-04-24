import { Box } from '@mui/material'
import NavBar from './components/nav/NavBar'
import { AppContextProvider } from './context/AppContext'
import { ItemsView } from './views/ItemsView'

function App() {
  return (
    <AppContextProvider>
      <Box className='mainContainer'>
        <NavBar />
        {/* here we would have routes and a router, if we had more views than the item list */}
        <ItemsView />
      </Box>
    </AppContextProvider>
  )
}

export default App
