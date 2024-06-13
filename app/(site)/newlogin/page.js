'use client'

import { useState, useEffect } from "react"
import {signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"



export default function Login() {

    const [data, setData] = useState({email: '', password: ''})

    const session= useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.status ==='authenticated') {
            router.push('/newhome')
        }
    })




    const loginUser = async (e) => {
        e.preventDefault()
        signIn('credentials', { ...data, redirect: false})
        .then((callback)=>{
            if (callback?.error) {
                alert('User not found')
            }

            if(callback?.ok && !callback?.error) {
                alert('User has been logged in')
            }

        })
    }

    


    return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={loginUser}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                      onChange={e=> setData({...data, email: e.target.value})}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={data.password}
                      onChange={e=> setData({...data, password: e.target.value})}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
  
              <h1>Sign into Github below</h1>
              <button onClick={()=>signIn('github')} className="bg-black text-white w-full">Sign in with Github</button>
  
              <h1>Sign into Google below</h1>
              <button onClick={()=>signIn('google')} className="bg-black text-white w-full">Sign in with Google</button>
    
              
            </div>
          </div>
        </>
      )
    }
