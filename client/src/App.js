import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import Settings from './components/Settings'
import AdvancedSettings from './components/AdvancedSettings'
import KonvaMain from './components/KonvaMain'
import Modal from './components/Modal'
import { createContext } from 'react'
import StageCreator from './helpers/StageCreator';

export const MainContext = createContext()
export let getMainRefs = () => {}

function App() {

  const [modalSettings, setModalSettings] = useState({ opened: false, pixelsCount: 0 })
  const displayModal = (opened = false, pixelsCount = 0) => setModalSettings({ opened, pixelsCount })

  const [konvaSettings, setKonvaSettings] = useState({
      stage: null, layer: null, front: null, back: {canvas: null, ctx: null}
  })

  useEffect(() => {
      const Creator = new StageCreator(konvaSettings)
      getMainRefs = () => ({ konvaSettings, displayModal, Creator })
  }, [])

  return <>
      <MainContext.Provider value = {{ konvaSettings, setKonvaSettings, displayModal }}>
          <Settings />
          <KonvaMain />
          <Modal modalSettings = {modalSettings} />
      </MainContext.Provider>
  </>
}

export default App;
