import { db, auth } from './firebase'
import {
    collection,
    addDoc,
    serverTimestamp,
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useFormik } from 'formik'

export default function ReportHours() {
    const [user] = useAuthState(auth)
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            id: "",
            bankAccount: "",
            bankBranch: "",
            bankName: "",
            school: "",
            degree: "",
            gender: "",
        },
        onSubmit: values => {
            if (user != null) {
                try {

                    alert(values + " שעות דווחו ")

                } catch (e) {
                    console.error('Error adding document: ', e)
                }
            }
        },
    });


    return <div >
        <form className='card flex flex-col justify-center items-center gap-2 py-2 mb-24 w-full' onSubmit={formik.handleSubmit}>
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
                value={formik.values.firstName}
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
            <label htmlFor="bankBranch">
                שם בנק
            </label>
            <input
                type="text"
                name="bankBranch"
                onChange={formik.handleChange}
                value={formik.values.bankBranch}
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
                מוסד לימודים
            </label>
            <input
                type="text"
                name="degree"
                onChange={formik.handleChange}
                value={formik.values.degree}
                required
            />
            <label htmlFor="gender">
                מגדר
            </label>
            <input
                type="text"
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                required
            />
            <button className='button w-full' type='submit'>שלח לאישור</button>
        </form>
    </div>
}