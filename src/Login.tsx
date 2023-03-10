import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithGoogle, auth, logout } from './firebase'

export default function Login () {
  const [user, loading, error] = useAuthState(auth)

  if (loading) return <h4>loading...</h4>

  return (<>
    {user == null
      ? <button className="MenuButton"
        onClick={() => {
          signInWithGoogle().catch((err) => {
            console.error(err)
          })
        }}
      >
        התחבר
      </button>
      : <button className="MenuButton"
        onClick={() => {
          logout().catch((err) => {
            console.error(err)
          })
        }}>התנתק</button>
    }
    {(error != null) && <h4>error occured</h4>}
  </>)
}
