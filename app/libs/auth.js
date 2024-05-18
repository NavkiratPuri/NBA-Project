import GoogleProvider from 'next-auth/providers/google'; // import google provider for authconfig
import CredentialsProvider from 'next-auth/providers/credentials'; 
import prisma from './prismadb';

// authConfig object to configure the authentication providers, used in the NextAuth function
const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
          placeholder: 'email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials) {
        console.log('Authorization attempt with credentials:', credentials);

        // Fetch user from database based on provided credentials
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await prisma.dbuser.findFirst({
          where: { email: credentials.email },
        });

        console.log('User found in database:', dbUser);

        if (dbUser && dbUser.password === credentials.password) {
          console.log('User authorized successfully:', dbUser);
          return {
            ...dbUser, // should return the user object from the database
            id: dbUser.id, 
          };
        }

        console.log('Authorization failed for credentials:', credentials);
        return null;
      },
    }),

    // set up GoogleProvider with client ID and client secret
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        // Only allows sign-in if the Google account is verified and uses a specific domain
        return profile.email_verified && profile.email.endsWith('@example.com');
      }
      // Perform custom verification for other providers
      return true;
    },
  },
};

export default authConfig;
