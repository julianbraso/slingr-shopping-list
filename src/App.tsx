import { useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import NavBar from './components/nav/NavBar'
import EmptyListMsg from './components/EmptyListMsg'
import SideDrawer from './components/drawer/SideDrawer'
import { AddItem } from './components/drawer/AddItem'
import { EditItem } from './components/drawer/EditItem'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ItemList } from './components/ItemList'

const mockItems = [
  {
    "name": "test",
    "description": "shortDes",
    "quantity": 1,
    "purchased": false
  },
  {
    "name": "test2",
    "description": "shortDes",
    "quantity": 2,
    "purchased": false
  },
  {
    "name": "test3",
    "description": "shortDes",
    "quantity": 3,
    "purchased": false
  },
]

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  ///wip
  const [items, setItems] = useState(mockItems)

  function closeDrawer(){
    setDrawerOpen(false);
  }

  return (
    <Box className="mainContainer">
      <NavBar />
      <Box className="center bodyContainer">
        {isLoading ? <LoadingSpinner /> : items.length < 1 ? <EmptyListMsg clickCallback={() => closeDrawer()} /> : <ItemList items={items} />}
      </Box>
      <SideDrawer isOpen={drawerOpen} onClose={() => closeDrawer()}>
        {isEditing ? <EditItem cancelCallback={() => closeDrawer()} /> : <AddItem cancelCallback={() => closeDrawer()} />}
      </SideDrawer>
    </Box>
  )
}

export default App
