import React, { useEffect, useState } from 'react'
import './App.css'
import Settings from './components/Settings'
import KonvaMain from './components/KonvaMain'
import { createContext } from 'react'
import StageCreator from './helpers/StageCreator'

export const MainContext = createContext()
export let getMainRefs = () => {}

function App() {

  const [konvaSettings, setKonvaSettings] = useState({
      stage: null, layer: null, front: null, back: {canvas: null, ctx: null}
  })

  useEffect(() => {
      const Creator = new StageCreator(konvaSettings)
      getMainRefs = () => ({ konvaSettings, Creator })
  }, [])

  return <>
      <MainContext.Provider value = {{ konvaSettings, setKonvaSettings }}>
          <Settings />
          <KonvaMain />
      </MainContext.Provider>
  </>
}

export default App;
