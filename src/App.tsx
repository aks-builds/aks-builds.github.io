import Nav          from './components/Nav'
import Hero         from './components/Hero'
import About        from './components/About'
import NpmPackages  from './components/NpmPackages'
import Projects     from './components/Projects'
import Talks        from './components/Talks'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <NpmPackages />
        <Projects />
        <Talks />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
