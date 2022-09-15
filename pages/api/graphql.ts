import { gql, ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const prisma = new PrismaClient();

const typeDefs = gql`
	type User {
		id: ID
		email: String
	}

	type Query {
		getUsers: [User]
		getUser(id: String): User
	}
`;

const resolvers = {
	Query: {
		getUsers: () => prisma.user.findMany({}),
		getUser: async (id: String) => {
			let data = await prisma.user.findFirst({
				where: { id },
				select: { id: true, email: true },
			});
			console.log(data);
			return data;
		},
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
	await startServer;
	await apolloServer.createHandler({
		path: "/api/graphql",
	})(req, res);
}

export const config = {
	api: {
		bodyParser: false,
	},
};
