import ReportedHours from './ReportedHours';
import ReportHours from './ReportHours';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import UploadDocs from './UploadDocs';
import Home from './Home';
import useUser from './backend/useUser';

function App() {
  const [user, loading, error] = useUser();
  // TODO: decide what to do when loading or error

  return (
    <div className="flex bg-[url('/layered-waves-haikei.svg')] bg-cover place-items-center justify-center h-screen">
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/Report' element={user != null && <ReportHours user={user} />} />
        <Route path='/Upload' element={<UploadDocs />} />
        <Route path='/Hours' element={user != null && <ReportedHours user={user} />} />
      </Routes>
      {user != null && <Sidebar />}
    </div>
  );
}

export default App;
