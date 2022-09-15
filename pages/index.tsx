import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
	const { data: session } = useSession();
	useEffect(() => {
		if (session?.error === "RefreshAccessTokenError") {
			console.log("refreshed");
			signIn(); // Force sign in to hopefully resolve error
		}
	}, [session]);

	return (
		<div>
			<pre>{JSON.stringify(session)}</pre>
			Home
			<button onClick={() => signIn()}>Sign in</button>
			<button onClick={() => signOut()}>Sign Out</button>
		</div>
	);
};

export default Home;
