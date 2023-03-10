import MenuButton from './MenuButton'
import { type MouseEventHandler, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import { db, auth } from './firebase'
import {
    collection,
    addDoc,
    serverTimestamp
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { async } from '@firebase/util'
import ReportedHours from './ReportedHours'
import { Link } from "react-router-dom"
import ReportHours from './ReportHours'

function calcTime(start: string, end: string) {
    var splitted1 = start.split(":");
    var splitted2 = end.split(":");
    var statringHour = parseInt(splitted1[0]);
    var endingHour = parseInt(splitted2[0]);
    if (endingHour < 7 && statringHour > 7) {
        var hours = (24 - statringHour) + (endingHour)
    }
    else hours = parseInt(splitted2[0]) - parseInt(splitted1[0])
    var minutes = parseInt(splitted2[1]) - parseInt(splitted1[1])
    var total = hours + (minutes / 60)
    if (total > 0) return total
    else return 0
}

async function logHours(user: any, hours: number, reason: string, date: string, category: string) {
    if (user != null) {
        try {
            const docRef = await addDoc(collection(db, 'hours'), {
                uid: user.uid,
                category: category,
                hours: hours,
                reason: reason,
                status: 'ממתין',
                reportedAt: serverTimestamp(),
                date: date
            })
            console.log('Document written with ID: ', docRef.id)
            alert(hours + " שעות דווחו ")

        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }
}

export default function Menu(props: any) {
    const [user] = useAuthState(auth)
    const formik = useFormik({
        initialValues: {
            category: "קהילה-אירועים קהילתיים",
            description: "",
            date: "",
            startHour: "",
            endHour: ""
        },
        onSubmit: values => {
            const hoursToReport = calcTime(values.startHour, values.endHour)
            if (hoursToReport > 0) logHours(user, hoursToReport, values.description, values.date, values.category)
            else alert("לא ניתן לדווח על מספר שעות שלילי")
            formik.resetForm()

        },
    });
    return (
        <div className='container'>
            <Link to="/Report">
                <div className='Card'>דיווח שעות</div>
            </Link>
            <MenuButton text="פירוט שעות">
                {(user != null) && <ReportedHours uid={user.uid} />}
            </MenuButton>
            <MenuButton text="העלאת מסמכים">
                <form>
                    <input>HEY</input>
                </form>
            </MenuButton>
        </div>
    )
}