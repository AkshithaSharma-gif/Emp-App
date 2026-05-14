import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router'


function RootLayout() {
  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-blue-100 p-5'>
            <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout