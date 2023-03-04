import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithGoogle, auth, logout } from './firebase'

export default function Login () {
  const [user, loading, error] = useAuthState(auth)

  if (loading) return <h4>loading...</h4>

  return (<>
          {user == null
            ? <button
            onClick={() => {
              signInWithGoogle().catch((err) => {
                console.error(err)
              })
            }}
          >
            Login
          </button>
            : <button onClick={() => {
              logout().catch((err) => {
                console.error(err)
              })
            }}>Sign Out</button>
            }
            {(error != null) && <h4>error occured</h4>}
  </>)
}
