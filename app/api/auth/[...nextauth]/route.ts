import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth(
    {
        // Configure one or more authentication providers
        providers: [
            CredentialsProvider({
                // The name to display on the sign in form (e.g. "Sign in with...")
                name: "Credentials",
                // `credentials` is used to generate a form on the sign in page.
                // You can specify which fields should be submitted, by adding keys to the `credentials` object.
                // e.g. domain, username, password, 2FA token, etc.
                // You can pass any HTML attribute to the <input> tag through the object.
                credentials: {
                    username: { label: "Username", type: "text", placeholder: "username" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req) {
                    // Add logic here to look up the user from the credentials supplied
                    // For now just use "shuo" for username, "alma" for password
                    if (credentials?.username == "shuo" && credentials.password == "alma") {
                        const user = { id: "1", name: "Shuo", email: "shuo@tryalma.ai" }
                        if (user) {
                            // Any object returned will be saved in `user` property of the JWT
                            return user
                        }
                    }
                    return null

                }
            })
        ],
        
        secret: "09be070b9da821fdbce6a17f499d6de58b3b2f527a178efba4512c2b80b934f1"
    
})
export { handler as GET, handler as POST }

