import { db } from './firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  query, where, getDocs
} from 'firebase/firestore'
import { useFormik } from 'formik'

function calcTime(start: string, end: string) {
  const splitted1 = start.split(':');
  const splitted2 = end.split(':');
  const statringHour = parseInt(splitted1[0]);
  const endingHour = parseInt(splitted2[0]);
  if (endingHour < 7 && statringHour > 7) {
    var hours = 24 - statringHour + endingHour;
  } else hours = parseInt(splitted2[0]) - parseInt(splitted1[0]);
  const minutes = parseInt(splitted2[1]) - parseInt(splitted1[1]);
  const total = hours + minutes / 60;
  if (total > 0) return parseFloat(total.toFixed(2));
  else return 0;
}

async function logHours (user: any, hours: number, reason: string, date: string, category: string) {
  let userName = ''
  if (user != null) {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user.uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doce) => {
        userName = doce.data().firstName
      })
    } catch (e) {
      console.log(e)
    }
    try {
      const docRef = await addDoc(collection(db, 'hours'), {
        uid: user.uid,
        name: userName,
        category,
        hours,
        reason,
        status: 'ממתין',
        reportedAt: serverTimestamp(),
        date,
      });
      console.log('Document written with ID: ', docRef.id);
      alert(`שעות דווחו ${hours}`);
    } catch (e) {
      alert('אנא עדכן פרטים אישיים לפני דיווח על שעות')
      console.error('Error adding document: ', e)
    }
  }
}

export default function ReportHours ({ user }: { user: any }) {
  const formik = useFormik({
    initialValues: {
      category: 'קהילה-אירועים קהילתיים',
      description: '',
      date: '',
      startHour: '',
      endHour: '',
    },
    onSubmit: values => {
      const hoursToReport = calcTime(values.startHour, values.endHour)
      if (hoursToReport > 0) {
        void logHours(user, hoursToReport, values.description, values.date, values.category)
        formik.resetForm()
      } else alert('לא ניתן לדווח על מספר שעות שלילי')
    }
  })

  return (
    <div>
      <form
        className='card flex flex-col justify-center items-center gap-2 py-2 mb-24 w-full mx-auto px-16'
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor='category'>מערך פעילות</label>
        <select
          name='category'
          onChange={formik.handleChange}
          value={formik.values.category}
          required
        >
          <option>קהילה-אירועים קהילתיים</option>
          <option>אירועים עמותתיים</option>
          <option>הכשרות-הכשרות חינוכיות</option>
          <option>פעילות פנים בכפר-נראות כפר אחזקה</option>
        </select>
        <label htmlFor='date'>תאריך</label>
        <input
          type='date'
          name='date'
          onChange={formik.handleChange}
          value={formik.values.date}
          onBlur={formik.handleBlur}
          max={new Date().toLocaleDateString('fr-ca')}
          required
        />
        <label htmlFor='startHour'>שעת התחלה</label>
        <input
          type='time'
          name='startHour'
          onChange={formik.handleChange}
          value={formik.values.startHour}
          onBlur={formik.handleBlur}
          required
        />
        <label htmlFor='endHour'>שעת סיום</label>
        <input
          type='time'
          name='endHour'
          onChange={formik.handleChange}
          value={formik.values.endHour}
          onBlur={formik.handleBlur}
          required
        />
        <label htmlFor='description'>תיאור הפעילות</label>
        <textarea
          id='description'
          name='description'
          rows={3}
          cols={30}
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
        ></textarea>
        <button className='button w-full' type='submit'>
          שלח לאישור
        </button>
      </form>
    </div>
  );
}
