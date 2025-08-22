import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, updateAddress, deleteAddress, selectAddress } from '../features/addresses/addressesSlice'

const Backdrop = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,.55); display: flex; align-items: center; justify-content: center; z-index: 1100;
`
const Modal = styled.div`
  background: #fff; width: 680px; max-width: calc(100% - 16px); border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,.2);
  display: flex; flex-direction: column; max-height: 86vh;
  @media (max-width: 768px){ width: 100%; height: 100%; max-height: none; border-radius: 0; }
`
const Header = styled.div` display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; border-bottom: 1px solid #eee; `
const Title = styled.h3` margin: 0; font-family: 'Bebas Neue', sans-serif; font-size: 40px; color: var(--brand-primary); @media(max-width:768px){ font-size: 32px; } `
const Body = styled.div` padding: 1rem 1.25rem; overflow: auto; flex: 1; `
const Row = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; margin-bottom: .75rem; @media(max-width:768px){ grid-template-columns: 1fr; } `
const Full = styled.div` grid-column: 1 / -1; `
const Input = styled.input` width: 100%; padding: .75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; @media(max-width:768px){ padding: .65rem; } `
const Actions = styled.div` position: sticky; bottom: 0; background: #fff; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; @media(max-width:768px){ gap: .75rem; } `
const Btn = styled.button` background: var(--brand-primary); color: #fff; border: none; padding: .75rem 1.25rem; border-radius: 10px; font-weight: 700; cursor: pointer; @media(max-width:768px){ flex: 1; } `
const Ghost = styled.button` background: transparent; color: #444; border: 1px solid #ccc; padding: .6rem 1rem; border-radius: 10px; font-weight: 600; cursor: pointer; @media(max-width:768px){ flex: 1; } `
const AddressList = styled.div` display: grid; gap: .5rem; margin-bottom: 1rem; `
const AddressItem = styled.div` border: 1px solid #eee; border-radius: 10px; padding: .6rem; display: grid; grid-template-columns: 1fr auto; gap: .75rem; align-items: center; @media(max-width:768px){ grid-template-columns: 1fr; } `
const SmallActions = styled.div` display: inline-flex; gap: .5rem; @media(max-width:768px){ justify-content: flex-end; } `
const Radio = styled.input``
const AddNewBtn = styled(Ghost)` margin-left: auto; @media(max-width:768px){ flex: 0 0 auto; white-space: nowrap; } `

export default function AddressModal({ open, onClose, onConfirm, mode = 'cart', lineItem }) {
  const dispatch = useDispatch()
  const addresses = useSelector((s) => s.addresses.addresses)
  const selectedId = useSelector((s) => s.addresses.selectedId)

  const [form, setForm] = useState({ name: '', phone: '', line1: '', line2: '', city: '', state: '', zip: '', locationUrl: '', locationAccuracy: undefined, useCurrent: true, save: true })
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!open) return
    setEditingId(null)
    setShowForm(false)
    setForm({ name: '', phone: '', line1: '', line2: '', city: '', state: '', zip: '', locationUrl: '', locationAccuracy: undefined, useCurrent: true, save: true })
  }, [open])

  useEffect(() => {
    if (!open) return
    if (!selectedId && addresses.length > 0) {
      dispatch(selectAddress(addresses[0].id))
    }
  }, [open, addresses, selectedId, dispatch])

  useEffect(() => {
    if (!open || !form.useCurrent) return
    if (!('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        const accuracy = pos.coords.accuracy
        const link = `https://www.google.com/maps?q=${latitude},${longitude}`
        setForm((f) => ({ ...f, locationUrl: link, locationAccuracy: accuracy }))
      },
      () => {},
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }, [open, form.useCurrent])

  const selected = useMemo(() => addresses.find((a) => a.id === selectedId) || null, [addresses, selectedId])

  if (!open) return null

  const confirm = () => {
    let useAddress
    if (showForm) {
      const addr = editingId ? { ...selected, ...form, id: editingId } : { ...form }
      if (editingId) {
        dispatch(updateAddress({ id: editingId, changes: addr }))
        dispatch(selectAddress(editingId))
        useAddress = { ...selected, ...form }
      } else if (addr.save) {
        // Persist to Redux/localStorage
        const action = addAddress(addr)
        dispatch(action)
        dispatch(selectAddress(action.payload.id))
        useAddress = { ...addr }
      } else {
        // Not saving, but still use for this order
        useAddress = { ...addr }
      }
    } else {
      // Use the selected saved address; merge in current location link/accuracy
      const picked = addresses.find((a) => a.id === selectedId) || {}
      // Also update the selected address in store with fresh location if user has useCurrent
      if (picked.id && (form.locationUrl || form.locationAccuracy !== undefined)) {
        dispatch(updateAddress({ id: picked.id, changes: { locationUrl: form.locationUrl || picked.locationUrl, locationAccuracy: form.locationAccuracy ?? picked.locationAccuracy } }))
      }
      useAddress = { ...picked, locationUrl: form.locationUrl || picked.locationUrl, locationAccuracy: form.locationAccuracy ?? picked.locationAccuracy }
    }
    onConfirm?.(useAddress, { mode, lineItem })
    onClose?.()
  }

  const startEdit = (a) => {
    setEditingId(a.id)
    setShowForm(true)
    setForm({ name: a.name || '', phone: a.phone || '', line1: a.line1 || '', line2: a.line2 || '', city: a.city || '', state: a.state || '', zip: a.zip || '', locationUrl: a.locationUrl || '', locationAccuracy: a.locationAccuracy, useCurrent: true, save: true })
  }

  const toMessage = (a) => [a.name, a.phone, a.line1, a.line2, `${a.city}, ${a.state} ${a.zip}`, a.locationUrl ? `Location: ${a.locationUrl}` : ''].filter(Boolean).join('\n')

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Delivery Address</Title>
          <AddNewBtn onClick={() => { setEditingId(null); setShowForm((s) => !s) }}>{showForm ? 'Hide Form' : 'Add New Address'}</AddNewBtn>
        </Header>
        <Body>
          {addresses.length > 0 && (
            <AddressList>
              {addresses.map((a) => (
                <AddressItem key={a.id}>
                  <div>
                    <label style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                      <Radio type="radio" name="addr" checked={selectedId === a.id} onChange={() => dispatch(selectAddress(a.id))} />
                      <div style={{ whiteSpace: 'pre-wrap' }}>{toMessage(a)}</div>
                    </label>
                  </div>
                  <SmallActions>
                    <Ghost onClick={() => startEdit(a)}>Edit</Ghost>
                    <Ghost onClick={() => dispatch(deleteAddress(a.id))}>Delete</Ghost>
                  </SmallActions>
                </AddressItem>
              ))}
            </AddressList>
          )}

          {showForm && (
            <Row>
              <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
              <Full><Input placeholder="Address line 1" value={form.line1} onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))} /></Full>
              <Full><Input placeholder="Address line 2 (optional)" value={form.line2} onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))} /></Full>
              <Input placeholder="City" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
              <Input placeholder="State" value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} />
              <Input placeholder="ZIP" value={form.zip} onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <input type="checkbox" checked={form.useCurrent} onChange={(e) => setForm((f) => ({ ...f, useCurrent: e.target.checked }))} />
                I am ordering at my current location
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <input type="checkbox" checked={form.save} onChange={(e) => setForm((f) => ({ ...f, save: e.target.checked }))} />
                Save this address
              </label>
            </Row>
          )}
        </Body>

        <Actions>
          <Ghost onClick={onClose}>Cancel</Ghost>
          <Btn onClick={confirm}>Continue</Btn>
        </Actions>
      </Modal>
    </Backdrop>
  )
}


