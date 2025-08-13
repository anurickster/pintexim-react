import styled from 'styled-components'

const Section = styled.section` padding: 100px 5%; background: #fff; text-align: center; `
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(4, max-content); gap: 2.4rem; width: fit-content; max-width: 100%; margin: 0 auto; justify-content: center;
  @media (max-width: 1024px){ grid-template-columns: repeat(2, max-content); gap: 2rem; }
  @media (max-width: 768px){ grid-template-columns: 1fr; gap: 1.25rem; }
`
const Item = styled.div`
  display: inline-flex; align-items: center; gap: 16px; text-align: left; padding: .75rem .5rem;
  h3{ font-family: 'Open Sans', sans-serif; font-size: 18px; line-height: 26px; font-weight: 600; color: #333; margin: 0; white-space: nowrap; }
  img{ width: 78px; height: 78px; object-fit: contain; }
  @media (max-width: 1024px){ img{ width: 70px; height: 70px; } h3{ font-size: 17px; line-height: 24px; } }
  @media (max-width: 768px){ img{ width: 64px; height: 64px; } h3{ font-size: 16px; line-height: 24px; } }
`

export default function Advantages() {
  return (
    <Section>
      <Grid>
        <Item><img src="/assets/icons/icon-shipping.svg" alt="Free Shipping" /><h3>Free Shipping PAN India</h3></Item>
        <Item><img src="/assets/icons/icon-badge.svg" alt="Hand Picked" /><h3>Hand Picked Ingredients</h3></Item>
        <Item><img src="/assets/icons/icon-agent.svg" alt="24/7 Support" /><h3>24 hours a day, 7 days a week</h3></Item>
        <Item><img src="/assets/icons/icon-payment.svg" alt="Multiple Cards" /><h3>Pay with multiple Cards</h3></Item>
      </Grid>
    </Section>
  )
}


