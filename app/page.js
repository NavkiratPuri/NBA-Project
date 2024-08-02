'use client';

import { useState, useEffect } from "react";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import LoginHeader from "@/components/LoginHeader";

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/home');
    }
  }, [session?.status, router]);

  const loginUser = async (e) => {
    e.preventDefault();
    signIn('credentials', { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          alert(callback.error);
        }

        if (callback?.ok && !callback?.error) {
          alert('User has been logged in');
        }
      });
  };

  return (
    <>
      <LoginHeader />
      <div className="flex min-h-screen bg-gray-700">
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full lg:w-1/2 border-r border-white border-h-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white mb-4">
              Sign in to your account
            </h2>
            <form className="space-y-6" onSubmit={loginUser}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={data.email}
                    onChange={e => setData({ ...data, email: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={data.password}
                    onChange={e => setData({ ...data, password: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-center mt-8">
              <h1 className="text-lg font-semibold text-white">Need a new account?</h1>
              <button
                onClick={() => router.push('/newregister')}
                className="mt-4 bg-indigo-700 text-white w-full py-2 rounded-md shadow-md hover:bg-indigo-500 transition duration-200"
              >
                Sign up for a new account
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full lg:w-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-center text-lg font-semibold text-white">Sign in with</h1>
            <div className="mt-4 space-y-4">
              <button
                onClick={() => signIn('github')}
                className="flex items-center justify-center w-full py-2 px-4 rounded-md bg-indigo-900 text-white shadow-md hover:bg-indigo-500 transition duration-200"
              >
                <img
                  src="/githublogo.png"
                  alt="GitHub Logo"
                  className="h-5 w-5 mr-2"
                />
                GitHub
              </button>
              <button
                onClick={() => signIn('google')}
                className="flex items-center justify-center w-full py-2 px-4 rounded-md bg-indigo-900 text-white shadow-md hover:bg-indigo-500 transition duration-200"
              >
                <img
                  src="/googlelogo.webp"
                  alt="Google Logo"
                  className="h-5 w-5 mr-2"
                />
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
