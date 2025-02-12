// import NextAuth from "next-auth"
// //import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth ( {
//   // Configure one or more authentication providers
// //   providers: [
// //     GithubProvider({
// //       clientId: process.env.GITHUB_ID,
// //       clientSecret: process.env.GITHUB_SECRET,
// //     }),
//     // ...add more providers here
// //   ],

// providers: [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_SECRET
//   }),
// ],
// });

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      
    }),
    // ...add more providers here
    
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)