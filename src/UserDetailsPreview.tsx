import { query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, type User } from './backend';

export default function UserDetailsPreview({ user }: { user: User }) {
  const q = query(collection('users', user.id, 'hours'));
  const [snapshot, loading, error] = useCollection(q);

  if (error != null) return <p>Error: {error.message}</p>;

  return (
    <>
      <h2 className=' text-center text-xl text-midnight font-bold'>
        {user.firstName != null ? `${user.firstName} שלום 👋` : 'שלום 👋  מחכים לעדכון הפרטים'}
      </h2>
      <h2 className='text-center mb-12 text-xl text-midnight font-bold'>
        יש לך
        {loading ? (
          <span className='ml-[15ch]'>...</span>
        ) : (
          ` ${
            snapshot?.docs
              .filter((doc) => doc.data().status === 'מאושר')
              .map((doc) => doc.data().hours)
              .reduce(
                (accumulator: number, currentValue: number) => accumulator + currentValue,
                0
              ) as number
          } שעות מאושרות 🎉`
        )}
      </h2>
    </>
  );
}
