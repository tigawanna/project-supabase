import { useState } from 'react'
import './App.css'


import { RootLayout } from './pages/index/RootLayout';
import { AboutLayout } from './pages/about/AboutLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryStateWrapper } from './shared/QueryStateWrapper';
import { useQuery } from '@tanstack/react-query';
import { TestLayout } from './components/test/TestLayout';
import { Test } from './components/test/Test';
import { AuthLayout } from './pages/auth/AuthLayout';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { WelcomePage } from './pages/index/WelcomePage';
import { getUser, supabase } from './supa/config';
import { User } from './supa/types';
import { BillsLayout } from './pages/bills/BillsLayout';
import { Bills } from './pages/bills/Bills';
import { PrintPreview } from './shared/Print/PrintPreview';
import { PrintLayout } from './shared/Print/PrintLayout';



function App() {

   const userQuery = useQuery(['user'],getUser)
  
  //  supabase.auth.onAuthStateChange((event, session) => {
  //   console.log("auth state changed == ",event, session)
  // })

   const testmode = false
   const user = userQuery?.data as User | null| undefined

  console.log("user ==== ",user)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout user={user} test_mode={true}/>,
      // loader:userLoader(queryClient),
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <WelcomePage user={user} /> },

        {
          path: '/auth',
          element: <AuthLayout user={user} />,
          children: [
            {
              index: true,
              element: <Login />,
              // loader: deferredBlogPostsLoader,
            },
            {
              path: '/auth/signup',
              element: <Signup />,
              // loader: blogPostLoader,
            },
          ],
        },
        {
          path: '/bills',
          element: <BillsLayout user={user} />,
          children: [
            {
              index: true,
              element: <Bills user={user} />,
              // loader: deferredBlogPostsLoader,
            },

          ],
        },
        {
          path: '/print-preview',
          element: <PrintLayout />,
          children: [
            {
              index: true,
              element: <PrintPreview user={user}/>,
              // loader: deferredBlogPostsLoader,
            },

          ],
        },
        {
          path: '/test',
          element: <TestLayout user={user} />,
          children: [
            {
              index: true,
              element: <Test user={user} />,
              // loader: deferredBlogPostsLoader,
            },

          ],
        },

      ],
    },
    // {
    //   path: '/newsletter',
    //   action: newsletterAction,
    // },
  ]);

  return (
    <QueryStateWrapper
      error={userQuery.error}
      isError={userQuery.isError}
      isLoading={userQuery.isLoading}>
      <div className="w-full h-screen scroll-bar overflow-y-hidden dark:bg-slate-900
       dark:text-white dark:shadow-white">
        <RouterProvider router={router} />;
      </div>
    </QueryStateWrapper>
  )
}

export default App
