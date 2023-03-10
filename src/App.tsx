import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Login from './Login'
import ReportHours from './ReportHours'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'

function App () {
  const [user] = useAuthState(auth)

  return (
    <>
      <h1 className='text-3xl font-bold underline text-center'>Kedma Volunteer</h1>
      <div id="main-content">
      {user != null && (
        <h2>
          Hey <span className="magic">{user.displayName}</span>
        </h2>
      )}
      <Login />
      </div>
      <Routes>
        {/* <Route path='/' element={<ReportedHours uid={user.uid} />} /> */}
        <Route path="/Report" element={<ReportHours />} />
      </Routes>
      {user != null && <Sidebar />}
    </>
  )
}

export default App
