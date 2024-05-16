import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isLogin = nextUrl.pathname === '/login';

      // If user is on the dashboard but not logged in, redirect to login
      if (isOnDashboard && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }
      
      // If user is trying to access login page when already authenticated, redirect to dashboard
      if (isLogin && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Allow access for other cases
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
};
