import Link from 'next/link'
import React from 'react'
import ToggleMode from './ToggleMode'
import MainNavLinks from './MainNavLinks'

function MainNav() {
  return (
    <div className="flex justify-between items-center p-4">
      <MainNavLinks />
      
      <div className="flex  items-center gap-2">   
          <Link href="/tickets">logout</Link>
          <ToggleMode />
          
      </div>
    </div>
  
  )
}

export default MainNav