import React from 'react'
// import { Link } from "react-router-dom"
import { Nav, Navbar } from 'react-bootstrap'
import Auth from './auth/Auth'
import styled from 'styled-components'
import logo from '../assets/profile.png'
import { MDBBtn } from 'mdbreact'
import { useStoreState } from 'easy-peasy'

const Styles = styled.div`
  .profile {
    height: 3em;
  }

  a,
  .navbar-collapse .navbar-nav .nav-link {
    color: white;

    &:hover {
      color: teal;
    }
  }
`

export function NavigationBar(props) {
  const username = localStorage.getItem('username')
  const coins = useStoreState((state) => state.coinCount)
  console.log(coins)

  return (
    <div>
      <Styles>
        <Navbar expand='true' bg='dark' variant='dark'>
          {/* <Navbar.Brand href="/">MemExchange</Navbar.Brand> */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Nav.Item>
            <Navbar.Brand href=''>MemeExchange</Navbar.Brand>
          </Nav.Item>
          <Nav.Item>
            <MDBBtn color='success' outline className='z-depth-0'>
              ${coins}
            </MDBBtn>
            <a href='/login'>
              <img className='profile' src={logo} alt='' />
            </a>
          </Nav.Item>
          <Navbar.Collapse>
            <Nav className='mr-auto'>
              <Nav.Link>{username ? `Hi ${username}` : 'Hi user'}</Nav.Link>
              <Nav.Link href='/vault'>My Memes</Nav.Link>
              <Nav.Link href='/market'>Market</Nav.Link>
              <Nav.Link href='/ranking'>Rating</Nav.Link>
              <Nav.Link
                href='/'
                onClick={() => {
                  Auth.logout(() => {
                    console.log('User disconnected')
                  })
                }}
                to='/'
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    </div>
  )
}

// export const NavigationBar = (props) => (
//   <Styles>
//     <Navbar expand="true" bg="dark" variant="dark">
//       {/* <Navbar.Brand href="/">MemExchange</Navbar.Brand> */}
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Nav.Item>
//         <Navbar.Brand href="">MemeExchange</Navbar.Brand>
//       </Nav.Item>

//       <Nav.Item>
//         <MDBBtn color="success" outline className="z-depth-0">
//           ${coins}
//         </MDBBtn>
//         <a href="/login">
//           <img className="profile" src={logo} alt="" />
//         </a>
//       </Nav.Item>
//       <Navbar.Collapse>
//         <Nav className="mr-auto">
//           <Nav.Link>{username ? `Hi ${username}` : "Hi user"}</Nav.Link>
//           <Nav.Link href="/vault">My Memes</Nav.Link>
//           <Nav.Link href="/market">Market</Nav.Link>
//           <Nav.Link href="/ranking">Rating</Nav.Link>
//           <Nav.Link
//             href="/"
//             onClick={() => {
//               Auth.logout(() => {
//                 console.log("User disconnected")
//               })
//             }}
//             to="/"
//           >
//             Logout
//           </Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   </Styles>
// )
