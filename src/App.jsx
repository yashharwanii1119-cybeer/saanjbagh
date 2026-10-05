import React, { useState } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'

// Scene Architecture
import HeroScene from './components/HeroScene'
import StoryScene from './components/StoryScene'
import ExperienceScene from './components/ExperienceScene'
import CuisineScene from './components/CuisineScene'
import GalleryScene from './components/GalleryScene'
import AtmosphereScene from './components/AtmosphereScene'
import ReservationScene from './components/ReservationScene'
import GlobalFlowerSystem from './components/GlobalFlowerSystem'

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="min-h-screen bg-[#0B140B] font-sans text-charcoal relative">
        <Loader onComplete={() => setLoadingComplete(true)} />
        
        <div className={loadingComplete ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}>
          <GlobalFlowerSystem />
          <Navbar />
          <main className="relative">
            <HeroScene />
            <StoryScene />
            <ExperienceScene />
            <CuisineScene />
            <GalleryScene />
            <AtmosphereScene />
            <ReservationScene />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  )
}

export default App
