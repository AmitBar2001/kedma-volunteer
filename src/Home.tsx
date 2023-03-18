import Login from './Login';
import UserDetailsPreview from './UserDetailsPreview';
import { type User } from './backend';

export default function Home({ user }: { user?: User }) {
  return (
    <div className='card flex items-center justify-center'>
      <div className='sm:w-1/2 flex flex-col items-center'>
        <h1 className=' text-center mb-12 text-midnight text-3xl font-bold'>דף ריכוז טפסים</h1>
        {/* TODO: define a fixed width for this section, and make sure to account for long names */}
        {user != null && <UserDetailsPreview user={user} />}
        <Login />
      </div>
      <div className='w-1/2 p-5 sm:block hidden'>
        <img src='/KedmaLogo.png' className='max-h-96' />
      </div>
    </div>
  );
}
