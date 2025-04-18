import { useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import NavBar from './components/nav/NavBar'
import EmptyListMsg from './components/EmptyListMsg'
import SideDrawer from './components/drawer/SideDrawer'
import { AddItem } from './components/drawer/AddItem'
import { EditItem } from './components/drawer/EditItem'
import { LoadingSpinner } from './components/LoadingSpinner'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Box className="mainContainer">
      <NavBar />
      <Box className="center bodyContainer">
        {isLoading ? <LoadingSpinner /> : <EmptyListMsg clickCallback={() => setDrawerOpen(true)} />}
      </Box>
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {isEditing ? <EditItem cancelCallback={() => { }} /> : <AddItem cancelCallback={() => setDrawerOpen(false)} />}
      </SideDrawer>
    </Box>
  )
}

export default App
