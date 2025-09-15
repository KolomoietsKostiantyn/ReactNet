import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import App from './app/layout/App.tsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './features/activities/dashboard/Home.tsx';
import ActivityDaashboard from './features/activities/dashboard/ActivityDaashboard.tsx';
import ActivityForm from './features/activities/dashboard/ActvityForm.tsx';
import ActivityDetails from './features/activities/details/ActivityDetails.tsx';
import Counter from './app/layout/Counter.tsx';
import Exeptions from './app/layout/Exeptions.tsx';
import ActivityFormHook from './features/activities/dashboard/ActivityFormHook.tsx';
import LoginPage from './features/activities/login/LoginPage.tsx';
import AuthorizedPages from './features/activities/login/AuthorizedPages.tsx';
import ActivityPreview from './Activity/ActivityPreview.tsx';
import Profile from './profile/Profile.tsx';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchOnWindowFocus: false, retry: 1 }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <AuthorizedPages />, children: [
          { path: "activities", element: <ActivityDaashboard /> },

          { path: "createActivity", element: <ActivityForm key="create" /> },
          { path: "vievActivity/:id", element: <ActivityDetails /> },
          { path: "createActivity/:id", element: <ActivityForm /> },
          { path: "activityFormHook/:id", element: <ActivityFormHook /> },
          { path: "activityFormHook", element: <ActivityFormHook key="create" /> },
          { path: "ActivityPreview/:id", element: <ActivityPreview /> },
          { path: "profiles/:id", element: <Profile /> }
        ]
      },
      { path: "login", element: <LoginPage /> },
      { path: "", element: <HomePage /> },
      { path: "counter", element: <Counter /> },
      { path: "errors", element: <Exeptions /> },

    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>

    <RouterProvider router={router} />


  </QueryClientProvider>
)

// createRoot(document.getElementById('root')!).render(

//   <AppTest/>

// )

