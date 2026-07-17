import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ScrollProgress } from './components/motion.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Footer } from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Features from './pages/Features.jsx'
import Workspace from './pages/Workspace.jsx'
import Loop from './pages/Loop.jsx'
import Research from './pages/Research.jsx'
import Cli from './pages/Cli.jsx'
import Developers from './pages/Developers.jsx'
import Download from './pages/Download.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/agents" element={<Workspace />} />
            <Route path="/loop" element={<Loop />} />
            <Route path="/research" element={<Research />} />
            <Route path="/cli" element={<Cli />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/download" element={<Download />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}
