import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css'
import { Containers } from './components/Containers'

export const App = () => (
  <div className="App">
    <DndProvider backend={HTML5Backend}>
        <Containers />
    </DndProvider>
  </div>)
