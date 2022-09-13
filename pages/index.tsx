import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
	const { data } = useSession();
	return (
		<div>
			Home
			<button onClick={() => signIn()}>Sign in</button>
		</div>
	);
};

export default Home;
