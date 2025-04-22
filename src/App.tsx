import NavBar from './components/nav/NavBar'
import { DrawerContextProvider } from './context/DrawerContext'
import { ItemsView } from './views/ItemsView'

function App() {
  return (
    <DrawerContextProvider>
      <NavBar />
      <ItemsView />
    </DrawerContextProvider>
  )
}

export default App
