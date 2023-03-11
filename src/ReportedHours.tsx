import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from './firebase'

export default function ReportedHours({ uid }: { uid: string }) {
  const q = query(collection(db, 'hours'), where('uid', '==', uid))
  const [snapshot, loading, error] = useCollection(q)

  if (loading) return <p>Loading...</p>

  if (error != null) return <p>Error :(</p>

  return (
    <table className='card overflow-scroll border-0 h-10'>
      <tr>
        <th>תאריך ביצוע</th>
        <th>סך שעות</th>
        <th>סטטוס אישור</th>
        <th>מערך הפעילות</th>
        <th>תיאור הפעילות</th>
      </tr>
      {snapshot?.docs.map(doc => <tr>
        <td>{doc.data().date}</td>
        <td>{doc.data().hours}</td>
        <td>{doc.data().status}</td>
        <td>{doc.data().category}</td>
        <td>{doc.data().reason}</td>
      </tr>)}
    </table>
  )
}
