import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Login from './Login'
import ReportHours from './ReportHours'
import ReportedHours from './ReportedHours'
import Menu from './Menu'
import { Routes, Route } from "react-router-dom"
import Sidebar from './Sidebar'


function App() {
  const [user] = useAuthState(auth)

  return (
    <div>
      <h1>Kedma Volunteer</h1>
      <div className="card">
        {(user != null) && <h2>Hey <span className='magic'>{user.displayName}</span></h2>}
        {(user != null) && <Sidebar />}
        <Routes>
          {/* <Route path='/' element={<ReportedHours uid={user.uid} />} /> */}
          <Route path='/Report' element={<ReportHours />} />
        </Routes>
        <Login />
      </div>
    </div>
  )
}

export default App
