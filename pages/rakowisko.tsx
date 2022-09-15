import type { NextPage } from "next";
import { trpc } from '../utils/trpc';

const Rakowisko: NextPage = () => {
    const user = trpc.useQuery(['user', { id: 'cl839q2440227ah0q8046240ov' }]);
    console.log(user)
    if (user.isLoading) {
      return <div>Loading...</div>;
    }

    if (user.isError) {
      return <div>{user.error.message}</div>
    }
  
    if (!user.data) {
      return null
    }

    return (
      <div>
        <p>{user.data.name}</p>
      </div>
    );
};

export default Rakowisko;