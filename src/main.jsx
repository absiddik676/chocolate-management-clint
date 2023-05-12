import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout';
import Home from './components/Home';
import AddChocolate from './components/AddChocolate';
import UpdateChocoolate from './components/UpdateChocoolate';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'AddChocolate',
        element:<AddChocolate/>
      },
      {
        path:'update/:id',
        element:<UpdateChocoolate/>,
        loader: ({params}) => fetch(`http://localhost:5000/chocolate/${params.id}`)
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
