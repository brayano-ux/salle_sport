import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router'
import Header from './sections/Header'
import HeroSection from './sections/HeroSection'
import About from './sections/About'
import Classes from './sections/Classes'
import Schedule from './sections/Schedule'
import Coaches from './sections/Coaches'
import Gallery from './sections/Gallery'
import Pricing from './sections/Pricing'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'
import BackToTop from './components/BackToTop'

function HomePage() {
  const scrollRef = useRef({ y: 0, speed: 0 })

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      <Header scrollRef={scrollRef} />
      <main>
        <HeroSection />
        <About />
        <Classes />
        <Schedule />
        <Coaches />
        <Gallery />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
