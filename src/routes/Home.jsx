import { NavLink } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

// Hero
const Hero = styled.section`
  height: 100vh;
  background: url('/homepage/herosectionbg.png') center/cover no-repeat;
  display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
  color: #EAC769;
`
const HeroTitle = styled.h1`
  font-family: 'Bebas Neue', sans-serif; font-size: 7rem; line-height: 1; margin: 0;
  background: linear-gradient(344.02deg, #D49D26 50.71%, #FAF38B 67.1%, #F2CF7E 83.48%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`
const HeroSub = styled.p`
  font-family: 'Kapakana'; font-size: 2.25rem; color: #fff; margin: .5rem 0 1rem;
`
const PrimaryBtn = styled(NavLink)`
  display: inline-block; padding: .6rem 1.4rem; border: 2px solid #f0ede4; color: #fff; border-radius: 6px; transition: all .2s ease;
  &:hover{ background: #ffc107; color: #000; border-color: #ffc107; }
`

// Features image on beige background
const FeaturesSection = styled.section`
  background: url('/homepage/ff2.png') center/cover no-repeat; padding: 48px 0;
`
const CenterImg = styled.img` display: block; width: min(90%, 960px); margin: 0 auto; `

// Products categories
const ProductsSection = styled.section` background: #F8F4EE; padding: 60px 0; text-align: center; `
const SectionH = styled.h2`
  font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-style: normal;
  font-size: 72px; line-height: 100%; letter-spacing: 0; text-align: center;
  color: #DA7527; margin: 0;
`
const SectionP = styled.p` color: #DA7527; margin: 6px 0 28px; `
const Categories = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 24px; max-width: 1100px; margin: 0 auto; padding: 0 16px; `
const CategoryCard = styled.div` background: #E6E6FA; border-radius: 20px; padding: 24px; box-shadow: 0 6px 18px rgba(0,0,0,.06); `
const CatImg = styled.img` display: block; width: 180px; height: 150px; object-fit: contain; margin: 0 auto; `

// Fresh highlight wide panels
const FreshPanel = styled.section`
  position: relative; background: url('/homepage/ho1.png') center/cover no-repeat; margin: 2%; height: 50vh; display: grid; place-items: center;
`
const FreshPanel2 = styled(FreshPanel)` background-image: url('/homepage/ho2.png'); `
const OverlayText = styled.div` text-align: center; color: #EAC769; text-shadow: 2px 2px 4px rgba(0,0,0,.7); `
const OverlayH = styled.h2` font-family: 'Inter', sans-serif; font-style: italic; text-transform: uppercase; font-size: clamp(2rem, 6vw, 4rem); margin: 0; `
const OverlayImg = styled.img` width: 70%; max-width: 720px; `

// Most loved grid (reuse product card style)
const Loved = styled.section` background: #F8F4EE; padding: 60px 0; `
const LovedGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 24px; max-width: 1100px; margin: 0 auto; padding: 0 16px; `
const ProductCard = styled.div` position: relative; background: #E6E6FA; border-radius: 20px; box-shadow: 0 6px 18px rgba(0,0,0,.06); overflow: hidden; `
const Badge = styled.span` position: absolute; top: 10px; left: 10px; background: #ffc107; color: #000; padding: 6px 10px; border-radius: 8px; font-weight: 600; font-size: .85rem; `
const Heart = styled.span` position: absolute; top: 10px; right: 10px; color: #fff; `
const CardImg = styled.img` width: 100%; height: 220px; object-fit: cover; `
const CardBody = styled.div` padding: 16px; text-align: center; `
const Price = styled.p` margin: 6px 0; font-weight: 700; `
const ViewBtn = styled.button` background: var(--brand-primary); color: #fff; border: 0; border-radius: 24px; padding: 10px 22px; font-weight: 700; cursor: pointer; `

// Behind the bites gallery
const Bites = styled.section` padding: 60px 0; `
const BitesGrid = styled.div` max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding: 0 16px; `
const BitesItem = styled.div` position: relative; overflow: hidden; border-radius: 10px; `
const BitesImg = styled.img` width: 100%; height: 220px; object-fit: cover; transition: transform .3s linear; ${BitesItem}:hover &{ transform: scale(1.05); } `
const Cam = styled.span` position: absolute; left: 12px; bottom: 12px; background: rgba(0,0,0,.5); color: #fff; padding: 8px; border-radius: 50%; font-size: 14px; `

// Testimonials (matches reference layout)
const Testimonials = styled.section` background: #fff; padding: 80px 0; `
const Subtle = styled.p` color: #6b7280; margin: 4px 0 40px; text-align: center; letter-spacing: 2px; font-weight: 500; `
const TGrid = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 0 16px;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
  @media (max-width: 1024px){ grid-template-columns: 1fr; }
`
const TCard = styled.div`
  background: #fff; border-radius: 18px; box-shadow: 0 12px 32px rgba(0,0,0,.06);
  padding: 32px 36px; position: relative; min-height: 240px;
`
const Quote = styled.span`
  position: absolute; top: 28px; right: 28px; font-size: 32px; font-weight: 700; color: ${(p)=>p.$color||'#DA7527'};
`
const TName = styled.h4`
  font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px; font-size: 24px; margin: 0 0 12px; color: #111827;
`
const TDots = styled.div` display: flex; justify-content: center; gap: 8px; margin-top: 14px; `
const TDot = styled.span`
  width: 8px; height: 8px; border-radius: 50%; background: ${(p)=>p.$active ? '#C65A14' : '#E5E7EB'};
`
const SlideWrap = styled.div` position: relative; min-height: 280px; `
const Fader = styled.div`
  animation: fadein .45s ease; @keyframes fadein { from {opacity: 0} to {opacity: 1} }
`
const Center = styled.div` text-align: center; `

export default function Home() {
  const loved = new Array(6).fill(null)
  return (
    <>
      <Hero>
        <HeroTitle>Natural Delight</HeroTitle>
        <HeroSub>Naturally tasty, delightfully pure.</HeroSub>
        <PrimaryBtn to="/products">View Products</PrimaryBtn>
      </Hero>

      <FeaturesSection>
        <CenterImg src="/homepage/ff1.png" alt="Feature" />
      </FeaturesSection>

      <ProductsSection>
        <SectionH>Our Products</SectionH>
        <SectionP>View Products</SectionP>
        <Categories>
          <CategoryCard>
            <CatImg src="/homepage/our%20product1.png" alt="Cookies" />
            <h5>Cookies</h5>
            <p className="text-muted">8 products</p>
          </CategoryCard>
          <CategoryCard>
            <CatImg src="/homepage/our%20product2.png" alt="Honey" />
            <h5>Honey</h5>
            <p className="text-muted">5 products</p>
          </CategoryCard>
          <CategoryCard>
            <CatImg src="/homepage/our%20product3.png" alt="Ghee" />
            <h5>Ghee</h5>
            <p className="text-muted">1 product</p>
          </CategoryCard>
        </Categories>
      </ProductsSection>

      <FreshPanel>
        <OverlayText>
          <OverlayH>Fresh Products</OverlayH>
          <OverlayImg src="/homepage/f1.png" alt="Fresh Products" />
        </OverlayText>
      </FreshPanel>

      <Loved>
        <Center>
          <SectionH>Most Loved</SectionH>
          <SectionP>View Products</SectionP>
        </Center>
        <LovedGrid>
          {loved.map((_, idx) => (
            <ProductCard key={idx}>
              <Badge>Best Sellers</Badge>
              <Heart>♡</Heart>
              <CardImg src="/homepage/mvp.png" alt="Product" />
              <CardBody>
                <h5>Jaggery Coconut Cookies</h5>
                <Price>$200</Price>
                <ViewBtn>VIEW</ViewBtn>
              </CardBody>
            </ProductCard>
          ))}
        </LovedGrid>
      </Loved>

      <Bites>
        <Center>
          <SectionH>Behind The Bites</SectionH>
          <SectionP>View Products</SectionP>
        </Center>
        <BitesGrid>
          <BitesItem><BitesImg src="/homepage/btb1.png" alt="btb" /><Cam>📷</Cam></BitesItem>
          <BitesItem><BitesImg src="/homepage/btb2.png" alt="btb" /><Cam>📷</Cam></BitesItem>
          <BitesItem><BitesImg src="/homepage/btb3.png" alt="btb" /><Cam>📷</Cam></BitesItem>
          <BitesItem><BitesImg src="/homepage/btb4.png" alt="btb" /><Cam>📷</Cam></BitesItem>
        </BitesGrid>
      </Bites>

      <FreshPanel2>
        <OverlayText>
          <OverlayH>Discover More</OverlayH>
        </OverlayText>
      </FreshPanel2>

      {/* Testimonials */}
      <Testimonials>
        <Center>
          <SectionH>Testimonials from Partners</SectionH>
          <Subtle>REVIEW</Subtle>
        </Center>
        {(() => {
          const testimonials = [
            { name: 'ANJALI MEHRA', color: '#F59E0B', text: "I've been using Parmeshwari products for a few months now, and I really love them. The ghee smells and tastes just like homemade, and the quality is always good. You can tell it's made with care." },
            { name: 'RAHUL DESHPANDE', color: '#3B82F6', text: "The honey–dipped dry fruits are my favorite! They're fresh, tasty, and make for a great snack or gift. I've ordered multiple times and they never disappoint." },
            { name: 'NEERAJ TIWARI', color: '#9CA3AF', text: 'I trust Parmeshwari because their products are clean and natural. No chemicals or artificial stuff. Just pure, good food. I recommend it to my family and friends too.' },
            { name: 'PRIYA SHARMA', color: '#06B6D4', text: "Parmeshwari's cookies are a big hit at my home. My kids enjoy them and I feel happy knowing they\'re made with natural ingredients. Tasty and healthy!" },
            { name: 'MEENA PATEL', color: '#EF4444', text: 'I tried Parmeshwari after a friend suggested it, and now I regularly order ghee and dry fruits from them. Everything is fresh and packed really well. It feels like homemade.' },
            { name: 'SAMEER KHAN', color: '#10B981', text: 'Their jaggery coconut cookies strike the right balance of sweet and wholesome. Packaging is neat and delivery is quick.' },
            { name: 'DIVYA JAIN', color: '#8B5CF6', text: 'Love the consistency across batches. The ghee aroma reminds me of home. Great job maintaining standards.' },
            { name: 'ARUN VERMA', color: '#F472B6', text: 'Transparent sourcing and clean labels. Exactly what I want for my family. The dry fruits are plump and flavourful.' },
            { name: 'SNEHA IYER', color: '#14B8A6', text: 'Customer support is responsive and helpful. They handled a delivery query swiftly. Will buy again.' },
          ]
          const chunk = (arr, size) => arr.reduce((a,_,i)=> (i%size? a[a.length-1].push(arr[i]) : a.push([arr[i]]), a), [])
          const slides = chunk(testimonials, 3)
          const [slide, setSlide] = useState(0)
          const total = slides.length
          useEffect(() => { const id = setInterval(()=> setSlide(s => (s+1)%total), 6000); return ()=> clearInterval(id) }, [total])
          const go = (i)=> setSlide(i)
          return (
            <>
              <SlideWrap>
                <Fader key={slide}>
                  <TGrid>
                    {slides[slide].map((t, idx) => (
                      <TCard key={idx}>
                        <Quote $color={t.color}>”</Quote>
                        <TName>{t.name}</TName>
                        <p>{t.text}</p>
                      </TCard>
                    ))}
                  </TGrid>
                </Fader>
              </SlideWrap>
              <TDots>
                {Array.from({length: total}).map((_,i)=> (
                  <TDot key={i} $active={i===slide} onClick={()=>go(i)} style={{cursor:'pointer'}} />
                ))}
              </TDots>
            </>
          )
        })()}
      </Testimonials>
    </>
  )
}


