'use client'

import '../app/globals.css';
import LoginPage from './(site)/login';
import { useRouter } from 'next/navigation';

// login page loaded on initial visit
const Index = () => {

  const router = useRouter();

  router.push('/newlogin')

  return (
    <div>
      {/*<LoginPage/>*/}
      <p>Redirecting...</p>
      <p>If you are not redirected, click <a href="/newlogin">here</a></p>
    </div>
  );
};

export default Index;
