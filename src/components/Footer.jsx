import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Spacer = styled.div` height: 60px; background: #fff; `
const Foot = styled.footer`
  background: var(--footer-bg); color: #fff; padding: 60px 5% 30px; position: relative;
  &:before { content: ''; position: absolute; top: -15px; left: 0; width: 100%; height: 30px; background: radial-gradient(circle at 15px 15px, var(--footer-bg) 15px, transparent 15px); background-size: 30px 30px; background-repeat: repeat-x; }
`
const Content = styled.div`
  display: grid; grid-template-columns: 300px 1fr 1fr 350px; gap: 4rem; max-width: 1400px; margin: 0 auto; align-items: start;
  @media (max-width: 1200px) { grid-template-columns: 260px 1fr 1fr; }
  @media (max-width: 1024px) { grid-template-columns: 1fr 1fr; justify-items: center; }
  @media (max-width: 768px) { grid-template-columns: 1fr; text-align: center; gap: 2rem; justify-items: center; }
`
const LogoWrap = styled.div` display: flex; flex-direction: column; align-items: flex-start; @media (max-width: 768px){ align-items: center; } `
const Logo = styled.img` width: 239px; height: 239px; object-fit: contain; @media (max-width: 1024px){ width: 180px; height: 180px; } @media (max-width:768px){ width: 135px; height: 135px; }`
const Section = styled.div` text-align: left; @media (max-width: 768px){ text-align: center; } `
const H3 = styled.h3` font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: 600; `
const List = styled.ul` list-style: none; padding: 0; margin: 0; display: grid; gap: .5rem; justify-items: start; @media (max-width:768px){ justify-items: center; } `
const ListItem = styled.li` margin-bottom: 0.5rem; `
const ListLink = styled(NavLink)` color: var(--text-light); display: flex; align-items: center; &:hover{ color: #fff; } `
const P = styled.p` color: var(--text-light); margin-bottom: 0.75rem; font-size: 0.9rem; display: flex; align-items: flex-start; justify-content: flex-start; @media (max-width:768px){ justify-content: center; } `
const Newsletter = styled.div` display: flex; flex-direction: column; `
const NewsletterRow = styled.div` display: flex; margin-bottom: 1.5rem; @media (max-width: 768px){ flex-direction: column; } `
const Input = styled.input` flex: 1; padding: 0.75rem; border: none; border-radius: 5px 0 0 5px; font-size: 0.9rem; @media (max-width:768px){ border-radius: 5px; margin-bottom: 1rem; } `
const Button = styled.button` background: var(--brand-accent); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0 5px 5px 0; font-weight: 600; cursor: pointer; `
const Social = styled.div` display: flex; gap: 1rem; justify-content: flex-start; @media (max-width:768px){ justify-content: center; }
  img{ height: 36px; border-radius: 5px; transition: transform .3s ease; } img:hover{ transform: scale(1.1); }
`
const Bottom = styled.div` text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.2); color: var(--text-light); font-size: 0.9rem; `

export default function Footer() {
  return (
    <>
      <Spacer />
      <Foot>
        <Content>
          <LogoWrap>
            <Logo src="/assets/images/footer-logo.png" alt="Pintexim Footer Logo" />
          </LogoWrap>
          <Section>
            <H3>Explore</H3>
            <List>
              <ListItem><ListLink to="/">Home</ListLink></ListItem>
              <ListItem><ListLink to="/about-us">About us</ListLink></ListItem>
              <ListItem><ListLink to="/contact-us">Contact us</ListLink></ListItem>
              <ListItem><a href="#">Blog</a></ListItem>
              <ListItem><a href="#">Team</a></ListItem>
              <ListItem><a href="#">Our Menu</a></ListItem>
            </List>
          </Section>
          <Section>
            <H3>Contact us</H3>
            <div className="contact-info">
              <P className="address"><a href="https://maps.google.com/?q=Andheri+East+Mumbai+-400069" target="_blank">Andheri East Mumbai -400069</a></P>
              <P className="phone"><a href="tel:+918682908682">+91 8682908682</a></P>
              <P className="email"><a href="mailto:parmeshwariinternationalexim@gmail.com">parmeshwariinternationalexim@gmail.com</a></P>
              <P className="hours">Mon - Sat - 09:00 AM to 05:00 PM</P>
            </div>
          </Section>
          <Newsletter>
            <H3>Subscribe</H3>
            <div className="subtitle">To Our Newsletter</div>
            <p>Subscribe our newsletter and get discount 25%off</p>
            <NewsletterRow>
              <Input type="email" placeholder="Enter Your Email" />
              <Button type="submit">Subscribe</Button>
            </NewsletterRow>
            <Social>
              <img src="/assets/images/social-facebook.png" alt="Facebook" />
              <img src="/assets/images/social-twitter.png" alt="Twitter" />
              <img src="/assets/images/social-instagram.png" alt="Instagram" />
              <img src="/assets/images/social-youtube.png" alt="YouTube" />
            </Social>
          </Newsletter>
        </Content>
        <Bottom><p>Copyright © 2025 by PINTEXIM. All Rights Reserved.</p></Bottom>
      </Foot>
    </>
  )
}


