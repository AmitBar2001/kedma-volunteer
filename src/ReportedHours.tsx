import { orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, type User } from './backend';

export default function ReportedHours({ user }: { user: User }) {
  const q = query(collection('users', user.id, 'hours'), orderBy('date', 'desc'));
  const [hoursReported, loading, error] = useCollectionData(q);

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
        {hoursReported?.map((doc, i) => (
          <tr key={doc.id} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className='row-text'>{doc.data().date}</td>
            <td className='row-text'>{doc.data().hours}</td>
            <td className='row-text'>
              <span
                className={
                  'rounded-lg p-1.5 tracking-wider' +
                  (doc.data().status === 'ממתין'
                    ? ' text-yellow-800 bg-yellow-300'
                    : doc.data().status === 'מאושר'
                    ? ' text-green-800 bg-green-200'
                    : doc.data().status === 'נדחה'
                    ? ' bg-red-200 text-red-800'
                    : '')
                }
              >
                {doc.data().status}
              </span>
            </td>
            <td className='row-text'>{doc.data().category}</td>
            <td className='row-text'>{doc.data().reason}</td>
          </tr>
        ))}
      </table>
      <div className='bg-gray-50 w-full'>
        <p className=' inline-block font-semibold'>
          סך שעות מאושרות:{' '}
          {hoursReported
            ?.filter((doc) => doc.data().status === 'מאושר')
            .map((doc) => doc.data().hours)
            .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)}
        </p>
        <p className=' mx-16 inline-block font-semibold'>
          סך שעות ממתינות:{' '}
          {hoursReported
            ?.filter((doc) => doc.data().status === 'ממתין')
            .map((doc) => doc.data().hours)
            .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0)}
        </p>
      </div>
    </div>
  );
}
