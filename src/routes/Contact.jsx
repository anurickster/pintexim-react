import styled from 'styled-components'

const Section = styled.section` padding: 140px 5% 40px; text-align: center; background-size: cover; `
const Title = styled.h1` font-family: 'Bebas Neue', sans-serif; font-size: 72px; line-height: 86px; color: var(--brand-primary); margin-bottom: 10px; `
const Sub = styled.p` color: #666; max-width: 720px; margin: 0 auto 28px; font-size: .98rem; `
const Wrap = styled.div` max-width: 980px; margin: 0 auto; `
const Grid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 18px 28px; margin-bottom: 16px; @media (max-width: 768px){ grid-template-columns: 1fr; }
  input{ width: 100%; padding: 14px 18px; border: none; border-radius: 24px; background: #EDEDED; font-size: .95rem; outline: none; }
`
const Legend = styled.legend` font-weight: 600; font-size: .95rem; color: #333; margin: 12px 0 8px; `
const Pills = styled.div` display: grid; grid-template-columns: repeat(4, max-content); gap: 18px; justify-content: center; margin-bottom: 12px; @media (max-width:768px){ grid-template-columns: 1fr 1fr; } `
const Pill = styled.label` display: inline-flex; align-items: center; gap: 10px; padding: 10px 18px; border-radius: 24px; background: #EDEDED; cursor: pointer; user-select: none; font-weight: 600; color: #333; input{ appearance: none; width: 0; height: 0; position: absolute; } .dot{ width: 14px; height: 14px; border-radius: 50%; display: inline-block; border: 2px solid #bbb; background: #fff; } input:checked + .dot { border-color: var(--brand-primary); background: radial-gradient(var(--brand-primary) 55%, #fff 56%); } `
const Note = styled.div` font-style: italic; color: #666; font-size: .9rem; margin: 4px 0 18px; `
const Submit = styled.button` background: var(--brand-primary); color: #fff; border: none; padding: .9rem 2.6rem; border-radius: 24px; cursor: pointer; font-weight: 700; letter-spacing: .4px; text-transform: uppercase; transition: background .3s ease, transform .2s ease; &:hover{ background: var(--brand-accent-dark); transform: translateY(-1px); } `
export default function Contact() {
  return (
    <>
      <Section style={{ backgroundImage: "url('/contact-us/contact-us-bg.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center top' }}>
        <Title>WE WOULD LOVE TO HEAR FROM YOU.</Title>
        <Sub>If you’ve got great products your making or looking to work with us then drop us a line.</Sub>
        <Wrap>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! We’ve received your enquiry and will contact you shortly.'); }}>
            <Grid>
              <label className="sr-only" htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Name" autoComplete="name" required />

              <label className="sr-only" htmlFor="email">Email Id</label>
              <input id="email" name="email" type="email" placeholder="Email Id" autoComplete="email" required />

              <label className="sr-only" htmlFor="phone">Number</label>
              <input id="phone" name="phone" type="tel" placeholder="Number" autoComplete="tel" required />

              <label className="sr-only" htmlFor="city">City</label>
              <input id="city" name="city" type="text" placeholder="City" autoComplete="address-level2" />

              <label className="sr-only" htmlFor="state">State</label>
              <input id="state" name="state" type="text" placeholder="State" autoComplete="address-level1" />

              <label className="sr-only" htmlFor="pincode">Pincode</label>
              <input id="pincode" name="pincode" type="text" placeholder="Pincode" inputMode="numeric" pattern="[0-9]{5,6}" />
            </Grid>

            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <Legend>Product Selection :</Legend>
              <Pills>
                <Pill><input type="radio" name="product" value="Cookies" defaultChecked /><span className="dot" aria-hidden="true"></span>Cookies</Pill>
                <Pill><input type="radio" name="product" value="Ghee" /><span className="dot" aria-hidden="true"></span>Ghee</Pill>
                <Pill><input type="radio" name="product" value="Honey" /><span className="dot" aria-hidden="true"></span>Honey</Pill>
                <Pill><input type="radio" name="product" value="Dry Fruits" /><span className="dot" aria-hidden="true"></span>Dry Fruits</Pill>
              </Pills>
            </fieldset>

            <Note>“Thank you! We’ve received your enquiry and will contact you shortly.”</Note>
            <Submit type="submit">Submit</Submit>
          </form>
        </Wrap>
      </Section>

      <Advantages />
    </>
  )
}


