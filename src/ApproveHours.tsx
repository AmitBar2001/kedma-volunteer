import { collection, orderBy, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from './firebase'

async function updateStatus (reportedAt: any, status: string) {
  try {
    const q = query(collection(db, 'hours'), where('reportedAt', '==', reportedAt))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doce) => {
      const userRef = doc(db, 'hours', doce.id)
      updateDoc(userRef, {
        status
      })
    })
  } catch (e) {
    console.log(e)
  }
}

export default function ReportedHours ({ user }: { user: any }) {
  const q = query(collection(db, 'hours'), where('status', '==', 'ממתין'), orderBy('date', 'desc'))
  const [snapshot, loading, error] = useCollection(q)

  if (loading) return <p className='text-white'>Loading...</p>
  if (snapshot?.empty) return <p className='bg-gray-100 px-40 py-16 font-bold rounded-md mx-6 border-2 border-gray-400 text-xl'>אין שעות ממתינות</p>

  if (error != null) {
    console.log(error)
    return <p className='text-white'>Error :(</p>
  }

  return (
    <div className='overflow-auto
    rounded-md mx-6 border-2 border-white mb-24 w-3/4'>
      <table className='w-full bg-gray-50'>
        <thead className=' border-b-2 border-gray-200 rounded-3xl tracking-wide font-thin text-right text-md'>
          <tr>
            <th className='p-4'>תאריך ביצוע</th>
            <th>סך שעות</th>
            <th>שם הסטודנט</th>
            <th>מערך הפעילות</th>
            <th>תיאור הפעילות</th>
          </tr>
        </thead>
        {snapshot?.docs.map((doc, i) => <tr key={doc.id} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
          <td className='row-text'>{doc.data().date}</td>
          <td className='row-text'>{doc.data().hours}</td>
          <td className='row-text'>{doc.data().name}</td>
          <td className='row-text'>{doc.data().category}</td>
          <td className='row-text'>{doc.data().reason}</td>
          <td className='row-text'>
            <button className='button w-full text-green-800 bg-green-200' onClick={async () => { await updateStatus(doc.data().reportedAt, 'מאושר') }}>אשר</button>
            <button className='button w-full bg-red-200 text-red-800' onClick={async () => { await updateStatus(doc.data().reportedAt, 'נדחה') }}>דחה</button>
          </td>
        </tr>)}
      </table>
    </div>
  )
}
