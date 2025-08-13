import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  position: fixed; top: 0; width: 100%; z-index: 1000; padding: 1rem 5%;
  background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(10px);
`
const NavContainer = styled.div`
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  max-width: 1400px; margin: 0 auto; gap: 2rem;
`
const Left = styled.div` display: flex; justify-content: flex-start; `
const Center = styled.div` display: flex; justify-content: center; `
const Right = styled.div` display: flex; justify-content: flex-end; `
const Logo = styled.img` height: 60px; width: auto; `
const Menu = styled.ul` display: flex; gap: 2.5rem; `
const StyledLink = styled(NavLink)`
  color: #fff; font-weight: 500; font-size: 1rem; position: relative;
  &.active { color: var(--brand-accent); }
`
const Actions = styled.div` display: flex; align-items: center; gap: 1.5rem; `
const Icon = styled.span`
  width: 24px; height: 24px; display: inline-block; background-size: contain; background-repeat: no-repeat; background-position: center; cursor: pointer; transition: opacity .3s ease;
  &:hover { opacity: .7; }
`
const SearchIcon = styled(Icon)` background-image: url('/assets/icons/icon-lens.svg'); `
const HeartIcon = styled(Icon)` background-image: url('/assets/icons/icon-heart.svg'); `
const ContactBtn = styled(NavLink)`
  background: transparent; color: #fff; padding: .75rem 1.5rem; border: 2px solid #fff; border-radius: 25px; font-weight: 500; font-size: .9rem; transition: all .3s ease;
  &:hover { background: var(--brand-accent); border-color: var(--brand-accent); }
`

export default function Navbar() {
  return (
    <Nav>
      <NavContainer>
        <Left>
          <Menu>
            <li><StyledLink to="/">Home</StyledLink></li>
            <li><StyledLink to="/about-us">About Us</StyledLink></li>
            <li><StyledLink to="/products">Products</StyledLink></li>
          </Menu>
        </Left>
        <Center>
          <Logo src="/assets/images/logo.png" alt="Pintexim Logo" />
        </Center>
        <Right>
          <Actions>
            <SearchIcon />
            <HeartIcon />
            <ContactBtn to="/contact-us">Contact Us</ContactBtn>
          </Actions>
        </Right>
      </NavContainer>
    </Nav>
  )
}


