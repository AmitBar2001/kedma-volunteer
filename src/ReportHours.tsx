import { type MouseEventHandler, useCallback, useState } from 'react'
import { db, auth } from './firebase'
import {
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { faker } from '@faker-js/faker'

export default function ReportHours () {
  const [user] = useAuthState(auth)
  const [hoursToReport, setHoursToReport] = useState(Math.floor(Math.random() * 100))

  const reportHours = useCallback<MouseEventHandler>(async () => {
    if (user != null) {
      try {
        const docRef = await addDoc(collection(db, 'hours'), {
          uid: user.uid,
          hours: hoursToReport,
          reason: faker.lorem.sentence(),
          status: 'pending',
          reportedAt: serverTimestamp()
        })
        console.log('Document written with ID: ', docRef.id)

        setHoursToReport(Math.floor(Math.random() * 100))
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }
  }, [hoursToReport, user])

  return <button onClick={reportHours}>Report {hoursToReport} Hours</button>
}
