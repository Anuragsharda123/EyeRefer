import react from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup'
import Header from './components/Header';
import Verify from './components/Verify'
import Login from './components/Login'
import './App.css'
import Dashboard from './components/Dashboard';

const  App:react.FC = () => {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Header />,
      children:[
        {
          path:'/',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/verify',
          element: <Verify />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
      ]
    }
  ]
)

  return (
<>
<RouterProvider router={router} />
<ToastContainer newestOnTop={false}
closeOnClick />
</>
  )
}

export default App
