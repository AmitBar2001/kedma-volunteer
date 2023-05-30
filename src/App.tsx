import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import ReportedHours from './ReportedHours'
import ReportHours from './ReportHours'
import ApproveHours from './ApproveHours'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import UploadDocs from './UploadDocs'
import Home from './Home'

function App () {
  const [user] = useAuthState(auth)
  return (
    <div className="flex bg-[url('/layered-waves-haikei.svg')] bg-cover place-items-center justify-center h-screen">
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/Report" element={<ReportHours user={user}/>} />
        <Route path="/Upload" element={<UploadDocs user={user}/>} />
        <Route path="/Hours" element={ <ReportedHours user={user} />} />
        <Route path="/Approve" element={<ApproveHours user={user} />} />
      </Routes>
      {user != null && <Sidebar user={user}/>}
    </div>
  );
}

export default App;
