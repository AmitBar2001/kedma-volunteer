import { db } from './firebase'
import {
  collection,
  query, where, getDocs,
  updateDoc,
  doc
} from 'firebase/firestore'
import { useFormik } from 'formik'

async function updateInfo (user: any, firstName: any, lastName: any, phone: any, email: any, id: any, bankAccount: any, bankBranch: any, bankName: any, school: any, degree: any, gender: any) {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doce) => {
      const userRef = doc(db, 'users', doce.id)
      updateDoc(userRef, {
        firstName,
        lastName,
        phone,
        email,
        id,
        bankAccount,
        bankBranch,
        bankName,
        school,
        degree,
        gender
      })
    })
  } catch (e) {
    console.log(e)
  }
}

export default function UploadDocs ({ user }: { user: any }) {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      id: '',
      bankAccount: '',
      bankBranch: '',
      bankName: '',
      school: '',
      degree: '',
      gender: ''
    },
    onSubmit: values => {
      if (user != null) {
        try {
          alert('עודכנו פרטים אישיים')
          void updateInfo(user, values.firstName, values.lastName, values.phone, values.email, values.id, values.bankAccount, values.bankBranch, values.bankName, values.school, values.degree, values.gender)
          formik.resetForm()
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      }
    }
  })

  return <div >
        <form className=' overflow-auto card grid grid-cols-2 sm:grid-cols-6 gap-4 text-center py-6 mb-24 max-h-96' onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">
                שם פרטי
            </label>
            <input
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                required
            />
            <label htmlFor="lastName">
                שם משפחה
            </label>
            <input
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                required
            />
            <label htmlFor="phone">
                טלפון נייד
            </label>
            <input
                type="text"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                required
            />
            <label htmlFor="email">
                אימייל
            </label>
            <input
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
            />
            <label htmlFor="id">
                תעודת זהות
            </label>
            <input
                type="text"
                name="id"
                onChange={formik.handleChange}
                value={formik.values.id}
                required
            />
            <label htmlFor="bankAccount">
                חשבון בנק
            </label>
            <input
                type="text"
                name="bankAccount"
                onChange={formik.handleChange}
                value={formik.values.bankAccount}
                required
            />
            <label htmlFor="bankBranch">
                מספר סניף
            </label>
            <input
                type="text"
                name="bankBranch"
                onChange={formik.handleChange}
                value={formik.values.bankBranch}
                required
            />
            <label htmlFor="bankName">
                שם בנק
            </label>
            <input
                type="text"
                name="bankName"
                onChange={formik.handleChange}
                value={formik.values.bankName}
                required
            />
            <label htmlFor="school">
                מוסד לימודים
            </label>
            <input
                type="text"
                name="school"
                onChange={formik.handleChange}
                value={formik.values.school}
                required
            />
            <label htmlFor="degree">
           תואר
            </label>
            <input
                type="text"
                name="degree"
                onChange={formik.handleChange}
                value={formik.values.degree}
                required
            />
            <label htmlFor="gender">
                מגדר:
            </label>
            <input
                type="text"
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                required
            />
            <button className='button w-full mr-24 text-sm' type='submit'>עדכון פרטים</button>
        </form>
    </div>
}
