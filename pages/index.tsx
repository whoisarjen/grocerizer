import type { NextPage } from 'next'
import { useSession, signIn, signOut } from "next-auth/react"

const Home: NextPage = () => {
    const { data } = useSession()
console.log(data)
    return (
        <div>
            Home
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    )
}

export default Home
