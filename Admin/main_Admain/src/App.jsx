import { MainPageNav } from "./Components/MainPageNav"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { DashBoardPage } from "./pages/DashBoardPage"
import { User } from "./pages/User"
import {Navbar} from './Components/Navbar'
import { ProfileDetail } from "./Components/ProfileDetail"

export const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className='admin-main' >
        <MainPageNav/>
        <main className='dashboard-content' >
            <div className='container-fluid px-3 px-lg-4 py-4' >
                {/* <PageHeading/>
                <DashboardMatrix/>
                <Pannel/> */}

                    <Routes>
                        
                        <Route path='/' element={<DashBoardPage/>}  />
                        <Route path='/users' element={<User/>}  />
                        <Route path='/users/:id' element={<ProfileDetail/>}  />
                    </Routes>
                
            </div>
        </main>
    </div>
    </BrowserRouter>
  )
}
