import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useEffect, useMemo, useRef, useState } from 'react'
import { productSources } from '../features/products/sources'

const Nav = styled.nav`
  position: fixed; top: 0; width: 100%; z-index: 1000; padding: 1rem 5%;
  background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(10px);
`
const NavContainer = styled.div`
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  max-width: 1400px; margin: 0 auto; gap: 2rem;
  @media (max-width: 1200px){ gap: 1.25rem; }
  @media (max-width: 900px){ grid-template-columns: auto 1fr; gap: 1rem; }
`
const Left = styled.div` display: flex; justify-content: flex-start; @media (max-width: 900px){ display: none; } `
const Center = styled.div` display: flex; justify-content: center; @media (max-width: 900px){ justify-content: flex-start; } `
const Right = styled.div` display: flex; justify-content: flex-end; align-items: center; gap: 1rem; @media (max-width: 1200px){ gap: .75rem; } `
const Logo = styled.img` height: 60px; width: auto; @media (max-width: 1200px){ height: 54px; } @media (max-width: 900px){ height: 48px; } `
const LogoLink = styled(NavLink)` display: inline-flex; align-items: center; `
const Menu = styled.ul` display: flex; gap: 2.5rem; @media (max-width: 1200px){ gap: 1.5rem; } @media (max-width: 900px){ display: none; } `
const StyledLink = styled(NavLink)`
  color: #fff; font-weight: 500; font-size: 1rem; position: relative;
  &.active { color: var(--brand-accent); }
`
const ProductsWrap = styled.li` position: relative; `
const Popover = styled.div`
  position: absolute; top: calc(100% + 6px); left: 0; background: #fff; color: #222; border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.25); padding: .75rem; min-width: 220px; display: none;
`
const PopoverList = styled.ul` list-style: none; margin: 0; padding: 0; display: grid; gap: .25rem; `
const PopItem = styled(NavLink)`
  display: block; padding: .5rem .75rem; border-radius: 8px; color: #222; text-decoration: none; font-weight: 600;
  &:hover{ background: #f5f5f5; }
`

const Actions = styled.div` display: flex; align-items: center; gap: 1.5rem; @media (max-width: 1200px){ gap: .9rem; } @media (max-width: 900px){ gap: 1rem; } `
const Icon = styled.span`
  width: 24px; height: 24px; display: inline-block; background-size: contain; background-repeat: no-repeat; background-position: center; cursor: pointer; transition: opacity .3s ease;
  &:hover { opacity: .7; }
`
const SearchIcon = styled(Icon)` background-image: url('/assets/icons/icon-lens.svg'); @media (max-width: 900px){ display:none; } `
const HeartIcon = styled(Icon)` background-image: url('/assets/icons/icon-heart.svg'); @media (max-width: 900px){ display:none; } `
const ContactBtn = styled(NavLink)`
  background: transparent; color: #fff; padding: .6rem 1.2rem; border: 2px solid #fff; border-radius: 25px; font-weight: 500; font-size: .9rem; transition: all .3s ease;
  &:hover { background: var(--brand-accent); border-color: var(--brand-accent); }
  @media (max-width: 1200px){ padding: .5rem 1rem; }
  @media (max-width: 900px){ display:none; }
`

const CartBadge = styled(NavLink)` position: relative; color: #fff; font-weight: 500; white-space: nowrap;
  &:after{ content: attr(data-count); position: absolute; top: -8px; right: -10px; background: var(--brand-accent); color: #000; border-radius: 999px; padding: 0 6px; font-size: 12px; font-weight: 700; }
`

// Hamburger + Drawer
const Burger = styled.button`
  display: none; @media (max-width: 900px){ display: inline-flex; }
  background: transparent; color: #fff; border: 2px solid #fff; border-radius: 10px; padding: .4rem .6rem; font-weight: 700; cursor: pointer; margin-left: .5rem;
`
const DrawerBackdrop = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 1001; display: none;
`
const Drawer = styled.aside`
  position: fixed; top: 0; left: 0; height: 100vh; width: 78%; max-width: 360px; background: #fff; color: #222; z-index: 1002;
  transform: translateX(-100%); transition: transform .25s ease; padding: 20px 16px; display: flex; flex-direction: column; gap: 8px;
`
const DrawerTitle = styled.div` font-weight: 800; font-size: 18px; margin-bottom: 8px; `
const DrawerLink = styled(NavLink)` color: #222; text-decoration: none; padding: 10px 8px; border-radius: 8px; font-weight: 600; &:hover{ background:#f5f5f5; } `
const DrawerSub = styled(NavLink)` color: #333; text-decoration: none; padding: 8px 8px; border-radius: 8px; margin-left: 8px; &:hover{ background:#f7f7f7; } `

export default function Navbar() {
  const count = useSelector((s) => s.cart.items.reduce((acc, it) => acc + it.qty, 0))
  const categories = useMemo(() => Object.keys(productSources), [])
  const [open, setOpen] = useState(false)
  const prodRef = useRef(null)
  const closeTimer = useRef(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onDocClick = (e) => {
      if (!prodRef.current) return
      if (!prodRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0))

  const openNow = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true) }
  const closeSoon = () => { if (isTouch) return; if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(false), 120) }

  const handleProductsClick = (e) => {
    if (isTouch) {
      if (!open) {
        e.preventDefault()
        setOpen(true)
      } else {
        // allow navigation when already open and user taps again
      }
    }
  }
  const handleProductsTouchStart = (e) => {
    if (isTouch && !open) {
      e.preventDefault()
      setOpen(true)
    }
  }
  const handleProductsPointerDown = (e) => {
    if (e.pointerType === 'touch' && !open) {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <Nav>
      <NavContainer>
        <Left>
          <Menu>
            <li><StyledLink to="/">Home</StyledLink></li>
            <li><StyledLink to="/about-us">About Us</StyledLink></li>
            <ProductsWrap ref={prodRef}
              onMouseEnter={openNow}
              onMouseLeave={closeSoon}
            >
              <StyledLink
                to="/products"
                onClick={handleProductsClick}
                onTouchStart={handleProductsTouchStart}
                onPointerDown={handleProductsPointerDown}
              >
                Products
              </StyledLink>
              <Popover
                style={{ display: open ? 'block' : 'none' }}
                onMouseEnter={openNow}
                onMouseLeave={closeSoon}
              >
                <PopoverList>
                  {categories.map((key) => (
                    <li key={key}>
                      <PopItem to={`/products?product=${key}`} onClick={() => setOpen(false)}>{key.toUpperCase()}</PopItem>
                    </li>
                  ))}
                </PopoverList>
              </Popover>
            </ProductsWrap>
          </Menu>
        </Left>
        <Center>
          <LogoLink to="/" aria-label="Pintexim Logo - Home">
            <Logo src="/assets/images/logo.png" alt="Pintexim Logo" />
          </LogoLink>
        </Center>
        <Right>
          <Actions>
            <SearchIcon />
            <HeartIcon />
            <CartBadge to="/cart" data-count={count}>My Cart</CartBadge>
            <ContactBtn to="/contact-us">Contact Us</ContactBtn>
            <Burger aria-label="Open menu" onClick={() => setDrawerOpen(true)}>☰</Burger>
          </Actions>
        </Right>
      </NavContainer>

      {/* Mobile Drawer */}
      <DrawerBackdrop style={{ display: drawerOpen ? 'block' : 'none' }} onClick={() => setDrawerOpen(false)} />
      <Drawer style={{ transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <DrawerTitle>Menu</DrawerTitle>
        <DrawerLink to="/" onClick={() => setDrawerOpen(false)}>Home</DrawerLink>
        <DrawerLink to="/about-us" onClick={() => setDrawerOpen(false)}>About Us</DrawerLink>
        <DrawerTitle>Products</DrawerTitle>
        {categories.map((key) => (
          <DrawerSub key={key} to={`/products?product=${key}`} onClick={() => setDrawerOpen(false)}>{key.toUpperCase()}</DrawerSub>
        ))}
        <DrawerLink to="/cart" onClick={() => setDrawerOpen(false)}>My Cart</DrawerLink>
        <DrawerLink to="/contact-us" onClick={() => setDrawerOpen(false)}>Contact Us</DrawerLink>
        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => setDrawerOpen(false)} style={{ width:'100%', padding:'10px 12px', border:'1px solid #ddd', borderRadius:8, background:'#f7f7f7', fontWeight:700, cursor:'pointer' }}>Close</button>
        </div>
      </Drawer>
    </Nav>
  )
}


