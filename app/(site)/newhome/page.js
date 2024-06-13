'use client'

import {useSession, signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Newhome = () => {

    const {data: session} = useSession()

    const router = useRouter()
    
    // const homeRoute = () => {
    //     router.push('/newhome')
    // }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Hi {session?.user?.name}</p>
            <button onClick={()=> signOut()}>Sign Out</button>
            <p> {JSON.stringify(session)} </p>
            <button onClick={()=> router.push('/home')} >Press here for the real Home</button>
        </div>
    )
}

export default Newhome