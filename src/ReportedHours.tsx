import { orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, type User } from './backend';

export default function ReportedHours({ user }: { user: User }) {
  const q = query(collection('users', user.id, 'hours'), orderBy('date', 'desc'));
  const [hoursReportedList, loading, error] = useCollectionData(q);

  if (loading) return <p className='text-white'>Loading...</p>;

  if (error != null) {
    console.log(error);
    return <p className='text-white'>Error :(</p>;
  }

  return (
    <div
      className='overflow-auto max-h-3/4
    rounded-md mx-6 border-2 border-white mb-24 w-3/4'
    >
      <table className='w-full bg-gray-50'>
        <thead className=' border-b-2 border-gray-200 rounded-3xl tracking-wide font-thin text-right text-md'>
          <tr>
            <th className='p-4'>תאריך ביצוע</th>
            <th>סך שעות</th>
            <th>סטטוס אישור</th>
            <th>מערך הפעילות</th>
            <th>תיאור הפעילות</th>
          </tr>
        </thead>
        {hoursReportedList?.map((doc, i) => (
          <tr key={doc.id} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className='row-text'>{doc.date}</td>
            <td className='row-text'>{doc.hours}</td>
            <td className='row-text'>
              <span
                className={
                  'rounded-lg p-1.5 tracking-wider' +
                  (doc.status === 'ממתין'
                    ? ' text-yellow-800 bg-yellow-300'
                    : doc.status === 'מאושר'
                    ? ' text-green-800 bg-green-200'
                    : doc.status === 'נדחה'
                    ? ' bg-red-200 text-red-800'
                    : '')
                }
              >
                {doc.status}
              </span>
            </td>
            <td className='row-text'>{doc.category}</td>
            <td className='row-text'>{doc.reason}</td>
          </tr>
        ))}
      </table>
      <div className='bg-gray-50 w-full'>
        <p className=' inline-block font-semibold'>
          סך שעות מאושרות:{' '}
          {hoursReportedList
            ?.filter((hoursReported) => hoursReported.status === 'מאושר')
            .map((hoursReported) => hoursReported.hours)
            .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)}
        </p>
        <p className=' mx-16 inline-block font-semibold'>
          סך שעות ממתינות:{' '}
          {hoursReportedList
            ?.filter((hoursReported) => hoursReported.status === 'ממתין')
            .map((hoursReported) => hoursReported.hours)
            .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)}
        </p>
      </div>
    </div>
  );
}
