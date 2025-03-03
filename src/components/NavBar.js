import React from 'react'

function NavBar() {
  return (
    <div className="container" >
  <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor:"black"}} >
    <div className="container-fluid" style={{backgroundColor:"black"}}>
      <a className="navbar-brand" href="/"><button type="button" className="btn btn-info">Home</button></a>
    </div>
  </nav>
</div>
  )
}

export default NavBar