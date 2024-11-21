import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import MainContent from "./components/MainContent"
import NavBar from "./components/NavBar"
import About from "./components/About"
import Contact from "./components/Contact"

export default function App(){
  return(
    <Router>
      <div>
        <NavBar />
        <Sidebar />
        <div>
          <Routes>
            <Route path='/' element={<MainContent/>}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}