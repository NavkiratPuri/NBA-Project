'use client'

import {useSession, signOut} from 'next-auth/react'

const Newhome = () => {

    const {data: session} = useSession()
    


    return (
        <div>
            <h1>Dashboard</h1>
            <p>Hi {session?.user?.name}</p>
            <button onClick={()=> signOut()}>Sign Out</button>
            <p> {JSON.stringify(session)} </p>
        </div>
    )
}

export default Newhome