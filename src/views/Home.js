import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { emailToName } from '../components/Functions';
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext';


function Home() {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <div>
      <div className='home-banner'>
        <NavBar />
      </div>
      <div className='content-container'>
        <br/>

        {user && 
        <>
          <div className='loader-container'>
            <h1>Welcome, {emailToName(user.email)}</h1>
          </div>
        </>}
        
        {!user && 
          <>
            <h1>Welcome</h1>
            <div className='login-signup'>
              <Link className='explore-button' to='/login'>Login</Link>
              <p>No account? <Link to='signup'>Sign up</Link>!</p>
            </div>
          </>
        }
        <Link className='explore-button' to='/explore'>Explore</Link>
        {user && 
        <>
          <Link className='explore-button' to={'/favourites'}>My Favourites</Link>
          <Link className='explore-button' to={'/characters'}>My Characters</Link>
          <br/>
          <button className='explore-button' onClick={logout}>Logout</button>
        </>}
      </div>
    </div>
  )
}

export default Home