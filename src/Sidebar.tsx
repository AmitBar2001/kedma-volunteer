import { FaHome, FaPencilAlt, FaUpload } from 'react-icons/fa'
import { BsCalendar2WeekFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const admins = ['nOETVCAhR6e8YSK9I0VSqH2yQnJ2']

export default function Sidebar ({ user }: { user: any }) {
  if (admins.includes(user.uid)) {
    return (
        <div className="fixed bottom-0 flex flex-row w-screen justify-around text-white shadow-lg p-2">
            <Link to="/">
                <SideBarIcon icon={<FaHome size="32" />} text="מסך הבית" />
            </Link>
            <Link to="/Approve">
                <SideBarIcon icon={<BsCalendar2WeekFill size="32" />} text="אישור שעות"/>
            </Link>
        </div>
    )
  } else {
    return (
        <div className="fixed bottom-0 flex flex-row w-screen justify-around text-white shadow-lg p-2">
            <Link to="/">
                <SideBarIcon icon={<FaHome size="32" />} text="מסך הבית" />
            </Link>
            <Link to="/Report">
                <SideBarIcon icon={<FaPencilAlt size="32" />} text="דיווח שעות " />
            </Link>
            <Link to="./Upload">
                <SideBarIcon icon={<FaUpload size="32" />} text="עדכון פרטים אישיים והעלאת מסמכים" />
            </Link>
            <Link to="/Hours">
                <SideBarIcon icon={<BsCalendar2WeekFill size="32" />} text="פירוט שעות" />
            </Link>
        </div>
    )
  }
}

const SideBarIcon = ({ icon, text }: { icon: any, text: string }) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="tooltip group-hover:scale-100">{text}</span>
    </div>
)
