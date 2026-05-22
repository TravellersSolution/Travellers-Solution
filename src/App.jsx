import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import LandingPage from './components/organisms/LandingPage/LandingPage'
import Destination from './components/organisms/DestinationPage/Destination'
import AboutUs from './components/organisms/AboutUs/AboutUs'
import ContactUs from './components/organisms/ContactUs/Contact'
import Coming from './components/organisms/ComingSoon/Coming';
import ComingSoon from './components/organisms/ComingSoon/ComingSoon';
import DestinationDetails from './components/molecules/DestinationDetails';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path='/destination' element={<Destination/>}/>
        <Route path="/destination/:country" element={<DestinationDetails />} />
        <Route path='/coming' element={<ComingSoon/>}/>
      </Routes>
    </Router>
  )
}

export default App
  