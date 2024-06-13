'use client'

import '../app/globals.css';
import LoginPage from './(site)/login';
import { useRouter } from 'next/navigation';

// login page loaded on initial visit
const Index = () => {

  const router = useRouter();

  router.push('/newregister')

  return (
    <div>
      {/*<LoginPage/>*/}
    </div>
  );
};

export default Index;
