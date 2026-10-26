import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Navbar } from './Components/Navbar'
import { HomePage } from './Pages/HomePage'
import { Footer } from './Components/Footer'
import { AboutPage } from './Pages/AboutPage'
import { FeaturePage } from './Pages/FeaturePage'
import { PricingPage } from './Pages/PricingPage'
import { ContactUsPage } from './Pages/ContactUsPage'
import { BlogPage } from './Pages/BlogPage'
import { BlogDetailsPage } from './Pages/BlogDetailsPage'
import { TestimonialPage } from './Pages/TestimonialPage'
import { SearchPage } from './Pages/SearchPage'
import { TeamPage } from './Pages/TeamPage'
import { AppointmentPage } from './Pages/AppointmentPage'
import { LoginPage } from './Pages/LoginPage'
import { Register } from './Components/RegisterAndLogin/Register'
import { RegisterDoctor } from './Components/RegisterAndLogin/Doctor/RegisterDoctor'
import { SymptomPage } from './Pages/SymptomPage'
import { LoginDoctor } from './Components/RegisterAndLogin/Doctor/LoginDoctor'
import { ProtectedRoute } from './Components/ProtectedRoute'
// import { DashBoardPage } from '../../Admin/main_Admain/src/pages/DashBoardPage'
import { Dashboard } from './Components/DoctorComponent/Dashboard'
import { DoctorVerificationStatus } from './Components/RegisterAndLogin/Doctor/DoctorVerificationStatus'
import { UserProfilePage } from './Pages/UserProfilePage'

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/services' element={<FeaturePage/>} />
          <Route path='/pricing' element={<PricingPage/>} />
          <Route path='contactus' element={<ContactUsPage/>} />
          <Route path='/blog' element={<BlogPage/>} />
          <Route path='/blog-details' element={<BlogDetailsPage/>} />
          <Route path='/testimonial' element={<TestimonialPage/>} />
          <Route path='/search' element={<SearchPage/>} />
          {/* users route */}
        ` <Route element={<ProtectedRoute/>} >
            <Route path='/symptom' element={<SymptomPage/>} />
          <Route path='/profile' element={<UserProfilePage/>} />
          <Route path='/appointment/:id' element={<AppointmentPage/>} />
        </Route>
        {/* doctor route */}
          <Route path='/doctor/dashboard' element={<Dashboard/>} />
          
          <Route path='/team' element={<TeamPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/doctor/register' element={<RegisterDoctor/>} />
          <Route path='/doctor/login' element={<LoginDoctor/>} />
          <Route path="/doctor/verification-status" element={<DoctorVerificationStatus />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

