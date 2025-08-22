import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddressModal from '../components/AddressModal.jsx'
import { clearCart, removeItem, updateQty } from '../features/cart/cartSlice'

const Page = styled.section` padding: 120px 5% 60px; background: #f8f9fa; `
const Title = styled.h1`
  font-family: 'Bebas Neue', sans-serif; font-size: 64px; color: var(--brand-primary); margin-bottom: 2rem;
  @media (max-width: 768px){ font-size: 44px; margin-bottom: 1rem; }
`
const List = styled.div` display: grid; gap: 1rem; max-width: 1000px; margin: 0 auto; `
const Row = styled.div`
  display: grid; align-items: center; gap: 1rem; background: #fff; border-radius: 16px; padding: 1rem;
  grid-template-columns: 80px 1fr 120px 140px 140px 40px;
  grid-template-areas: 'img name price qty action remove';
  @media (max-width: 1024px){ grid-template-columns: 70px 1fr 110px 120px 130px 32px; }
  @media (max-width: 768px){
    grid-template-columns: 70px 1fr 32px;
    grid-template-areas:
      'img name remove'
      'price price price'
      'qty action action';
  }
`
const Img = styled.img` grid-area: img; width: 80px; height: 80px; object-fit: cover; border-radius: 12px; background: #eee; @media (max-width:768px){ width: 70px; height: 70px; } `
const Name = styled.div` grid-area: name; font-weight: 600; `
const Price = styled.div` grid-area: price; font-weight: 600; display: flex; flex-direction: column; align-items: flex-end; line-height: 1.2; @media (max-width:768px){ align-items: flex-start; } `
const Sub = styled.span` font-weight: 400; color: #666; font-size: .9rem; `
const QtyWrap = styled.div` grid-area: qty; display: inline-flex; align-items: center; gap: .5rem; `
const Btn = styled.button` background: var(--brand-primary); color: #fff; border: none; padding: .7rem 1.4rem; border-radius: 25px; cursor: pointer; font-weight: 600; @media (max-width:768px){ padding: .6rem 1rem; } `
const Small = styled.button` background: #eee; border: none; width: 28px; height: 28px; border-radius: 6px; font-weight: 700; cursor: pointer; `
const Remove = styled.button` grid-area: remove; background: transparent; border: none; color: crimson; font-weight: 700; cursor: pointer; justify-self: end; `
const ActionBtn = styled(Btn)` grid-area: action; `
const Footer = styled.div`
  display: flex; justify-content: space-between; align-items: center; max-width: 1000px; margin: 1.5rem auto 0;
  @media (max-width: 768px){ position: sticky; bottom: 0; background: #f8f9fa; padding-bottom: .75rem; flex-direction: column; gap: .75rem; }
`
const FooterButtons = styled.div`
  display: flex; gap: 1rem;
  @media (max-width: 768px){ width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
  & > button { @media (max-width: 768px){ width: 100%; border-radius: 14px; } }
`

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector((s) => s.cart.items)
  const total = items.reduce((acc, it) => acc + (it.price || 0) * it.qty, 0)
  const [showModal, setShowModal] = useState(false)
  const [singleItem, setSingleItem] = useState(null)

  const openForItem = (it) => { setSingleItem(it); setShowModal(true) }
  const openForCart = () => { setSingleItem(null); setShowModal(true) }

  const handleConfirm = (address) => {
    // Build WhatsApp message
    const formatLine = (it) => `- ${it.name} × ${it.qty} @ $${(it.price || 0).toFixed(2)} = $${(((it.price||0)*it.qty)).toFixed(2)}`
    const selected = singleItem ? [singleItem] : items
    const lines = [
      `New order request`,
      ``,
      `Customer: ${address.name}`,
      `Phone: ${address.phone}`,
      `Address: ${[address.line1, address.line2, `${address.city}, ${address.state} ${address.zip}`].filter(Boolean).join(', ')}`,
      ...(address.locationUrl ? [`Location: ${address.locationUrl}`] : []),
      ...(address.locationAccuracy !== undefined ? [`Location accuracy: ±${Math.round(address.locationAccuracy)} m`] : []),
      ``,
      `Items:`,
      ...selected.map(formatLine),
    ]
    if (!singleItem) lines.push('', `Cart total: $${total.toFixed(2)}`)
    const msg = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/+918483806059?text=${msg}`, '_blank')
  }

  return (
    <Page>
      <Title>My Cart</Title>
      <List>
        {items.length === 0 && <div>Your cart is empty.</div>}
        {items.map((it) => (
          <Row key={it.id}>
            <Img src={it.image || '/products/img-product-default.png'} alt={it.name} />
            <Name>{it.name}</Name>
            <Price>
              ${(((it.price || 0) * it.qty) || 0).toFixed(2)}
              <Sub>{it.qty} × ${((it.price || 0)).toFixed(2)}</Sub>
            </Price>
            <QtyWrap>
              <Small onClick={() => dispatch(updateQty({ id: it.id, qty: Math.max(1, it.qty - 1) }))}>-</Small>
              <span>{it.qty}</span>
              <Small onClick={() => dispatch(updateQty({ id: it.id, qty: it.qty + 1 }))}>+</Small>
            </QtyWrap>
            <ActionBtn onClick={() => openForItem(it)}>Order Now</ActionBtn>
            <Remove onClick={() => dispatch(removeItem(it.id))}>✕</Remove>
          </Row>
        ))}
      </List>
      <Footer>
        <div><strong>Total:</strong> ${total.toFixed(2)}</div>
        <FooterButtons>
          <Btn onClick={() => dispatch(clearCart())}>Clear Cart</Btn>
          <Btn onClick={openForCart}>Place Order</Btn>
        </FooterButtons>
      </Footer>
      <AddressModal open={showModal} onClose={() => setShowModal(false)} onConfirm={handleConfirm} mode={singleItem ? 'single' : 'cart'} lineItem={singleItem} />
    </Page>
  )
}


