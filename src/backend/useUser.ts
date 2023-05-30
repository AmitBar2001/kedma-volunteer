import { useAuthState } from 'react-firebase-hooks/auth';
import { type FirestoreError } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { auth, doc, type User } from '.';

export default function useUser(): [User | undefined, boolean, FirestoreError | undefined] {
  const [authUser] = useAuthState(auth);
  const [user, loading, error, snapshot] = useDocumentData(
    authUser != null ? doc('users', authUser.uid) : undefined
  );

  if (user != null && snapshot != null)
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return [{ ...user, id: snapshot.id } as User, false, undefined];

  return [undefined, loading, error];
}
