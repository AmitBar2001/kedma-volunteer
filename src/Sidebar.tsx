import { FaHome, FaPencilAlt, FaUpload, FaPowerOff } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="Sidebar">
            <Link to="/">
                <SideBarIcon icon={<FaHome size="32" />} text="💡מסך הבית" />
            </Link>
            <Link to="/Report">
                <SideBarIcon icon={<FaPencilAlt size="32" />} text="💡דיווח שעות " />
            </Link>
            <SideBarIcon icon={<FaUpload size="32" />} text="💡 העלאת מסמכים" />
            <SideBarIcon icon={<FaPowerOff size="32" />} text="💡 התנתק" />
        </div>
    )
}

const SideBarIcon = ({ icon, text }: { icon: any, text: string }) => (
    <div className="sidebar-icon">
        {icon}
        <span className="tooltip">{text}</span>
    </div>
)   
