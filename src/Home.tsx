import { db } from './firebase'
import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import Login from './Login'

export default function Home ({ user }: { user: any }) {
  const admins = ['nOETVCAhR6e8YSK9I0VSqH2yQnJ2']
  let firstname = ''
  let approvedHours = 0
  if (user != null) {
    const q = query(collection(db, 'hours'), where('uid', '==', user.uid))
    const [snapshot, loading, error] = useCollection(q)

    if (loading) return <p className='text-white'>Loading...</p>

    if (error != null) {
      console.log(error)
      return <p className='text-white'>Error :(</p>
    }
    snapshot?.docs.map((doc) => firstname = doc.data().name)
    approvedHours = snapshot?.docs.filter(doc => doc.data().status === 'מאושר').map(doc => doc.data().hours).reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue, 0
    )
  }
  return (
    <div className="card flex items-center justify-center">
      <div className="sm:w-1/2 flex flex-col items-center">
        <h1 className="text-center mb-12 text-midnight text-3xl font-bold">דף ריכוז טפסים</h1>
        {user != null && (!admins.includes(user.uid)) && (
          <>
            <h2 className="text-center text-xl text-midnight font-bold">
            {firstname ? ` שלום ${firstname} 👋` : 'שלום 👋'}
            </h2>
            <h2 className="text-center mb-12 text-xl text-midnight font-bold">
              יש לך {approvedHours} שעות מאושרות 🎉
            </h2>
          </>
        )}
          {user != null && (admins.includes(user.uid)) && (
          <>
            <h2 className="text-center text-xl text-midnight font-bold pb-10">
              מנהל כפר
            </h2>
          </>
          )}
        <Login />
      </div>
      <div className="w-1/2 p-5 sm:block hidden">
        <img src="/KedmaLogo.png" className="max-h-96" />
      </div>
    </div>
  )
}
