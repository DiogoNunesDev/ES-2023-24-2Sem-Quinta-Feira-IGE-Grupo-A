import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
    <SideBar />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
  
      }}
    >
      <div style={{ height: 100,}}> header</div>
      <Outlet />
    </div>
  </div>
  )
}

export default Layout