import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router'
import RootLayout from './Components/RootLayout'
import Home from './Components/Home'
import ListOfEmps from './Components/ListOfEmps'
import CreateEmployee from './Components/CreateEmployee'
import Employee from './Components/Employee'
import EditEmployee from './Components/EditEmployee'

function App() {
    const routerObj=createBrowserRouter([
        {
            path:'/',
            element:<RootLayout/>,
            children:[
                {
            path:"",
            element:<Home/>
        },
        {
            path:"create-emp",
            element:<CreateEmployee/>
        },
        {
            path:"list",
            element:<ListOfEmps/>
        },
        {
            path:"employee",
            element:<Employee/>
        },
        {
            path:'edit-emp',
            element:<EditEmployee/>
        }
            ]
        },
        

    ])

  return <RouterProvider router={routerObj}/>
}

export default App