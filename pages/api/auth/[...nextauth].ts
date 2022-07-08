import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const options: NextAuthOptions= {
    theme: {
        colorScheme: "light"
    },
    debug: process.env.NODE_ENV === "development",
    session: {},
    jwt: {},
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                password: {
                    type: "password",
                    label: "Nunca pares de..."
                }
            },
            async authorize(credentials) {
                //Conectar api
                const response= await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-type": "application/json"
                    }
                });

                //Json api response
                const user= await response.json();

                if(response.ok && user) {
                    return user;
                }

                return null;
            }
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        })
    ]
};

export default NextAuth(options);