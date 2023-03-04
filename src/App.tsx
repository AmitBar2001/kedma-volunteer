import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import './App.css'
import Login from './Login'
import ReportHours from './ReportHours'
import ReportedHours from './ReportedHours'

function App () {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <h1>Kedma Volunteer</h1>
      <div className="card">
        {(user != null) && <><h2>{user.displayName}</h2><ReportHours /><ReportedHours uid={user.uid} /></>}
        <Login />
      </div>
    </div>
  )
}

export default App
