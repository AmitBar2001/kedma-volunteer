import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from './firebase'

export default function ReportedHours ({ uid }: { uid: string }) {
  const q = query(collection(db, 'hours'), where('uid', '==', uid))
  const [snapshot, loading, error] = useCollection(q)

  if (loading) return <p>Loading...</p>

  if (error != null) return <p>Error :(</p>

  return <ul>
    {snapshot?.docs.map(doc => <li key={doc.id}>{doc.data().hours}, {doc.data().status}</li>)}
    </ul>
}
