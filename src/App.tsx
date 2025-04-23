import { Box } from '@mui/material'
import NavBar from './components/nav/NavBar'
import { DrawerContextProvider } from './context/DrawerContext'
import { ItemsView } from './views/ItemsView'

function App() {
  return (
    <DrawerContextProvider>
      <Box className='mainContainer'>
        <NavBar />
        <ItemsView />
      </Box>
    </DrawerContextProvider>
  )
}

export default App
