import styled from 'styled-components'
import Advantages from '../components/Advantages.jsx'

const Hero = styled.section`
  height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; color: #fff;
  background-size: cover; background-position: center;
`
const HeroTitle = styled.h1`
  font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-size: 7rem; line-height: 1;
  display: flex; align-items: flex-end; justify-content: center; margin-bottom: 1rem;
  background: linear-gradient(344.02deg, #D49D26 50.71%, #FAF38B 67.1%, #F2CF7E 83.48%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`
const HeroSub = styled.p`
  font-family: 'Natural Delight', 'Kapakana', cursive; font-weight: 400; font-size: 2.25rem; line-height: 1;
  width: 739px; height: 62px; margin: 0 auto;
  letter-spacing: 0.5px;
  background: linear-gradient(344.02deg, #D49D26 50.71%, #FAF38B 67.1%, #F2CF7E 83.48%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  @media (max-width: 768px){ width: auto; height: auto; font-size: 32px; line-height: 32px; }
`

const BrandIntro = styled.section` padding: 100px 5%; background: #fff; text-align: center; `
const SectionTitle = styled.h2`
  font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-style: normal;
  font-size: 72px; line-height: 100%; letter-spacing: 0; text-align: center;
  color: #DA7527; margin-bottom: 2rem;
`
const SectionTitleLeft = styled(SectionTitle)` text-align: left; `
const IntroP = styled.p` max-width: 800px; margin: 0 auto 1.5rem; font-size: 1.1rem; line-height: 1.8; color: #666; `
const ImageSection = styled.div` width: 100%; height: 300px; background-size: cover; background-position: center; background-repeat: no-repeat; `

const Mission = styled.section` padding: 100px 5%; background: #f8f8f8; text-align: center; `
const MissionGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; max-width: 1200px; margin: 0 auto; `
const MissionCard = styled.div` background: transparent; padding: 0; text-align: center; `
const MissionIcon = styled.img` width: 250px; height: 250px; object-fit: contain; display: block; margin: 0 auto 2rem; `
const MissionText = styled.p`
  font-family: 'Lato', sans-serif; font-weight: 400; font-style: normal;
  font-size: 28px; line-height: 100%; letter-spacing: 0;
  color: #666; text-align: center; vertical-align: bottom;
  max-width: 300px; margin: 0 auto;
`

const WhyChoose = styled.section` padding: 100px 5%; background-size: cover; background-position: center; background-repeat: no-repeat; `
const WhyWrap = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; max-width: 1200px; margin: 0 auto; `
const WhyImage = styled.img` width: 100%; height: auto; border-radius: 10px; `
const WhyContent = styled.div``
const WhyP = styled.p` font-size: 1.1rem; line-height: 1.8; color: #666; margin-bottom: 1.5rem; `

const Certs = styled.section` padding: 100px 5%; background: #f8f8f8; text-align: center; `
const CertGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, max-content); gap: 3rem 6rem;
  justify-content: center; align-items: start; max-width: 1800px; margin: 0 auto 3rem;
  @media (max-width: 1280px){ grid-template-columns: repeat(2, max-content); gap: 2.5rem 4rem; }
  @media (max-width: 768px){ grid-template-columns: max-content; gap: 2rem; }
`
const CertGridBottom = styled.div`
  display: grid; grid-template-columns: repeat(2, max-content); gap: 3rem 6rem;
  justify-content: center; align-items: start; max-width: 1800px; margin: 0 auto;
  @media (max-width: 1280px){ grid-template-columns: max-content; gap: 2.5rem 4rem; }
  @media (max-width: 768px){ grid-template-columns: max-content; gap: 2rem; }
`
const CertItem = styled.div` text-align: center; transition: transform .3s ease; &:hover{ transform: translateY(-5px); } `
const CertIcon = styled.img`
  width: 380px; height: 380px; object-fit: contain;
  @media (max-width: 768px){ width: 280px; height: 280px; }
`
const CertLabel = styled.div` font-family: 'Open Sans', sans-serif; font-size: 1rem; font-weight: 600; color: #333; margin-top: .5rem; `

const TeamHead = styled.section` padding: 40px 5% 40px; background: #f7e6d2; text-align: center; `
const TeamWrap = styled.div` max-width: 1200px; margin: 0 auto; `
const TeamSub = styled.p` color: #666; margin-top: -8px; font-size: 12px; `
const TeamPanel = styled.div` height: 320px; background: #fff; border-radius: 18px; margin: 20px auto 0; `

const DirectorSection = styled.section` padding: 24px 5% 80px; background: #eeeeee; `
const DirectorGrid = styled.div` display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem 2.25rem; max-width: 1200px; margin: 0 auto; `
const DirectorCard = styled.div` text-align: center; max-width: 320px; margin: 0 auto; transition: transform .3s ease; &:hover{ transform: translateY(-5px); } `
const DirectorImage = styled.div` background: #e7e7e7; border-radius: 12px; height: 273px; margin-bottom: 14px; display: flex; align-items: center; justify-content: center; overflow: hidden; img{ width: 72%; height: 72%; object-fit: contain; opacity: .9; } `
const DirectorContent = styled.div` padding: 0 .5rem; max-width: 320px; margin: 0 auto; `
const DirectorName = styled.h4` font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; margin-bottom: .25rem; color: #DA7527; text-transform: uppercase; font-weight: 400; letter-spacing: 1px; `
const DirectorPosition = styled.div`
  font-family: 'Lato', sans-serif; font-weight: 600; font-style: normal;
  font-size: 28px; line-height: 100%; letter-spacing: 0; text-align: center; vertical-align: bottom;
  color: #333; margin-bottom: .85rem;
`
const DirectorDesc = styled.p` color: #333; font-size: .9375rem; line-height: 1.6; font-family: 'Open Sans', sans-serif; max-width: 320px; margin: 0 auto; `

const Culture = styled.section` padding: 40px 5% 80px; background: #f7e6d2; text-align: center; `
const Subtle = styled.p` color: #666; margin-top: -8px; font-size: 12px; `
const CultureGrid = styled.div`
  max-width: 1100px; margin: 24px auto 0; display: grid; grid-template-columns: 1fr 1.6fr 1fr 1fr; gap: 18px;
`
const CultureBox = styled.div` background: #fff; border-radius: 12px; height: 150px; `
const BoxA = styled(CultureBox)` grid-column: 1 / span 1; `
const BoxB = styled(CultureBox)` grid-column: 2 / span 2; `
const BoxC = styled(CultureBox)` grid-column: 4 / span 1; `
const BoxD = styled(CultureBox)` grid-column: 1 / span 2; `
const BoxE = styled(CultureBox)` grid-column: 3 / span 1; `
const BoxF = styled(CultureBox)` grid-column: 4 / span 1; `
const Dots = styled.div` margin-top: 18px; display: flex; justify-content: center; gap: 6px; color: #8B5E3C; `
const Dot = styled.span` width: 6px; height: 6px; border-radius: 50%; background: currentColor; display: inline-block; `
export default function About() {
  return (
    <>
      <Hero style={{ background: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('/about-us/hero.png')` }}>
        <div>
          <HeroTitle>ABOUT US</HeroTitle>
          <HeroSub>Tradition That Speaks Through Taste</HeroSub>
        </div>
      </Hero>

      <BrandIntro>
        <SectionTitle>Brand Introduction</SectionTitle>
        <IntroP>At Pintexim, we believe that taste is more than just flavor — it's a connection to our roots, our values, and our culture.</IntroP>
        <IntroP>Rooted in rich cultural heritage and guided by a deep commitment to purity, Pintexim brings you products that are not just flavorful—but meaningful. Every ingredient is carefully selected, every process is thoughtfully crafted, and every product is a reflection of our values. From our hands to your home, we deliver authentic quality that stands the test of time. With a passion for preserving age-old recipes and a promise of uncompromised standards.</IntroP>
        <IntroP>More than just a product, each offering from Pintexim is a journey — one that takes you back to the comforting kitchens of your childhood, the flavors of family gatherings, and the warmth of homemade goodness. In a world that’s constantly changing, Pintexim stands as a symbol of consistency, quality, and heartfelt tradition. With every bite, sip, or sprinkle, we promise you a taste that isn’t just delicious — but meaningful.</IntroP>
      </BrandIntro>

      <ImageSection style={{ backgroundImage: "url('/about-us/carousel1.png')" }} />

      <Mission>
        <SectionTitle>Mission, Vision & Value</SectionTitle>
        <MissionGrid>
          <MissionCard>
            <MissionIcon src="/about-us/mission1.png" alt="Mission Icon" />
            <MissionText>To lead global markets with India’s organic heritage, built on trust and sustainable progress. <br /> Empowering producers and innovating responsibly from farm to future.</MissionText>
          </MissionCard>
          <MissionCard>
            <MissionIcon src="/about-us/mission2.png" alt="Vision Icon" />
            <MissionText>To take India’s organic heritage to the world through products that are pure and natural. <br /> We aim to inspire healthier living and conscious consumption globally.</MissionText>
          </MissionCard>
          <MissionCard>
            <MissionIcon src="/about-us/mission3.png" alt="Values Icon" />
            <MissionText>We stand for pure ingredients, honest practices, eco-conscious choices, and world-class quality. <br /> Our commitment is to deliver trust, care, and excellence in every experience.</MissionText>
          </MissionCard>
        </MissionGrid>
      </Mission>

      <ImageSection style={{ backgroundImage: "url('/about-us/carousel2.png')" }} />

      <WhyChoose style={{ backgroundImage: "url('/about-us/why-choose-us-bg.png')" }}>
        <WhyWrap>
          <WhyImage src="/about-us/why-choose-us.png" alt="Why Choose Us" />
          <WhyContent>
            <SectionTitleLeft>Why Choose Us?</SectionTitleLeft>
            <WhyP>At Pintexim, our commitment goes beyond just providing premium nuts and dry fruits. We offer an experience that combines quality, trust, and exceptional service. Our state-of-the-art facilities ensure that every product meets the highest standards of freshness and taste.</WhyP>
            <WhyP>We source directly from trusted farmers and suppliers, maintaining complete transparency in our supply chain. Our rigorous quality control processes guarantee that you receive only the finest products, carefully selected and processed to preserve their natural goodness.</WhyP>
            <WhyP>With years of expertise in the industry and a passionate team dedicated to excellence, we continue to innovate and improve our offerings to meet your evolving needs and preferences.</WhyP>
          </WhyContent>
        </WhyWrap>
      </WhyChoose>

      <Certs>
        <SectionTitle>Certifications</SectionTitle>
        <CertGrid>
          <CertItem>
            <CertIcon src="/about-us/certification1.png" alt="FSSAI Certification" />
            <CertLabel>FSSAI</CertLabel>
          </CertItem>
          <CertItem>
            <CertIcon src="/about-us/certification2.png" alt="IIEM Certification" />
            <CertLabel>IIEM</CertLabel>
          </CertItem>
          <CertItem>
            <CertIcon src="/about-us/certification3.png" alt="Udemy Certification" />
            <CertLabel>Udemy</CertLabel>
          </CertItem>
        </CertGrid>
        <CertGridBottom>
          <CertItem>
            <CertIcon src="/about-us/certification4.png" alt="HACCP Certification" />
            <CertLabel>HACCP</CertLabel>
          </CertItem>
          <CertItem>
            <CertIcon src="/about-us/certification5.png" alt="APEDA Certification" />
            <CertLabel>APEDA</CertLabel>
          </CertItem>
        </CertGridBottom>
      </Certs>

		{/* Team header band with large panel */}
		<TeamHead>
			<TeamWrap>
				<SectionTitle>Our Team</SectionTitle>
				<TeamSub>View Products</TeamSub>
				<TeamPanel aria-hidden="true" />
			</TeamWrap>
		</TeamHead>

		{/* Directors grid (no header) */}
		<DirectorSection>
			<DirectorGrid>
				{Array.from({ length: 4 }).map((_, i) => (
					<DirectorCard key={i}>
						<DirectorImage>
							<img src="/about-us/partner-default.png" alt="Director" />
						</DirectorImage>
						<DirectorContent>
							<DirectorName>NAME</DirectorName>
							<DirectorPosition>Position</DirectorPosition>
							<DirectorDesc>Leading with vision and passion for quality excellence in every aspect of our business operations.</DirectorDesc>
						</DirectorContent>
					</DirectorCard>
				))}
			</DirectorGrid>
		</DirectorSection>

      <Culture>
        <SectionTitle>Culture</SectionTitle>
        <Subtle>View Products</Subtle>
        <CultureGrid>
          <BoxA />
          <BoxB />
          <BoxC />
          <BoxD />
          <BoxE />
          <BoxF />
        </CultureGrid>
        <Dots>
          <Dot /><Dot /><Dot /><Dot /><Dot />
        </Dots>
      </Culture>

      <div className="image-section" style={{ width: '100%', height: 300, backgroundImage: "url('/about-us/carousel1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
      <Advantages />
    </>
  )
}


