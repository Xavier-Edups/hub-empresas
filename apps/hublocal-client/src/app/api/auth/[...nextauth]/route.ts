// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Lógica para chamar sua API NestJS
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            // Se a resposta da API não for 2xx, retorna null
            console.error("Falha no login:", await res.json());
            return null;
          }

          const data = await res.json();
          console.log("DADOS RECEBIDOS DA API NO NEXTAUTH:", data);
          // O backend retorna um access_token. Vamos usá-lo.
          // O objeto retornado aqui será o 'user' na sessão.
          if (data.access_token) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              accessToken: data.access_token,
            };
          }

          return null;
        } catch (error) {
          console.error("Erro ao autorizar:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', // Redireciona para sua página de login se não estiver autenticado
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Adiciona o accessToken ao token JWT do NextAuth
     async jwt({ token, user }) {
      // 'user' só está disponível no primeiro login
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    // Adiciona o accessToken ao objeto da sessão no cliente
    async session({ session, token }) {
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
