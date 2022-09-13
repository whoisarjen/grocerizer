import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
	const { data } = useSession();
	return (
		<div>
			<pre>{JSON.stringify(data)}</pre>
			Home
			<button onClick={() => signIn()}>Sign in</button>
			<button onClick={() => signOut()}>Sign Out</button>
		</div>
	);
};

export default Home;
