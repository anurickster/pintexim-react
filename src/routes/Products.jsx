import styled from 'styled-components'
import Advantages from '../components/Advantages.jsx'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchCategory } from '../features/products/productsSlice'
import { productSources } from '../features/products/sources'
import { addItem } from '../features/cart/cartSlice'

export default function Products() {
  const Header = styled.section`
    background: #f8f8f8; padding: 120px 5% 30px; text-align: center;
    h1{ font-family: 'Bebas Neue', sans-serif; font-size: 72px; line-height: 86px; color: var(--brand-primary); }
  `
  const Section = styled.section` padding: 40px 5% 60px; background: #f8f9fa; `
  const Grid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem; max-width: 1400px; margin: 0 auto; `
  const Card = styled.div` background: #ffffff; border-radius: 25px; padding: 1.5rem; text-align: center; transition: transform .3s ease, box-shadow .3s ease; position: relative; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid rgba(0, 0, 0, 0.05); overflow: hidden; &:hover{ transform: translateY(-8px); box-shadow: 0 12px 40px rgba(0,0,0,.15); } `
  const ImgWrap = styled.div` width: 100%; height: 220px; background: #f8f9fa; border-radius: 20px; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; img{ width: 100%; height: 100%; object-fit: cover; border-radius: 20px; } `
  const Info = styled.div` display: flex; justify-content: space-between; align-items: center; text-align: left; `
  const Actions = styled.div` flex-shrink: 0; margin-left: 1rem; `
  const ViewBtn = styled.button` background: var(--brand-primary); color: white; border: none; padding: .85rem 2.5rem; border-radius: 25px; cursor: pointer; font-weight: 600; font-size: .9rem; transition: all .3s ease; text-transform: uppercase; letter-spacing: .5px; box-shadow: 0 4px 15px rgba(218,117,39,.3); &:hover{ background: var(--brand-accent-dark); transform: translateY(-2px); } `
  const AddBtn = styled(ViewBtn)``
  const Wish = styled.div` position: absolute; top: 1.25rem; right: 1.25rem; width: 40px; height: 40px; background: rgba(255,255,255,.95); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .3s ease; box-shadow: 0 2px 10px rgba(0,0,0,.1); z-index: 2; &:before{ content: "\2661"; font-size: 1.4rem; color: #666; } &:hover{ background: var(--brand-primary); transform: scale(1.1); } &:hover:before{ content: "\2665"; color: #fff; } `
  const Adv = styled.section` padding: 100px 5%; background: #fff; text-align: center; `
  const AdvGrid = styled.div` display: grid; grid-template-columns: repeat(4, max-content); gap: 2.4rem; width: fit-content; max-width: 100%; margin: 0 auto; justify-content: center; `
  const AdvItem = styled.div` display: inline-flex; align-items: center; gap: 16px; text-align: left; padding: .75rem .5rem; h3{ font-size: 18px; line-height: 26px; font-weight: 600; color: #333; margin: 0; white-space: nowrap; } img{ width: 78px; height: 78px; object-fit: contain; } `

  // CARES FOR YOU (ported from HTML/CSS to styled-components)
  const CaresWrap = styled.section` padding: 100px 5%; background: #f7e6d2; text-align: center; `
  const CaresHead = styled.h2` font-family: 'Bebas Neue', sans-serif; font-size: 72px; line-height: 86px; color: var(--brand-primary); margin-bottom: 3.5rem; @media(max-width:768px){ font-size: 44px; line-height: 1.1; margin-bottom: 2rem; } `
  const CaresGrid = styled.div`
    display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center; max-width: 1200px; margin: 0 auto; justify-items: center;
    @media(max-width:1024px){ grid-template-columns: 1fr 1fr; grid-template-areas: 'list image' 'ing ing'; }
    @media(max-width:640px){ grid-template-columns: 1fr; grid-template-areas: 'list' 'image' 'ing'; }
  `
  const CookieListWrap = styled.div`
    text-align: left; justify-self: end; grid-area: list; width: 100%; max-width: 420px;
    @media(max-width:640px){ text-align: center; justify-self: center; margin: 0 auto; }
  `
  const CookieList = styled.ul` list-style: none; padding: 0; margin: 0; `
  const CookieItem = styled.li`
    font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 22px; color: #333; margin-bottom: .7rem; white-space: nowrap;
    @media(max-width:900px){ font-size: 20px; }
    @media(max-width:640px){ font-size: 16px; white-space: normal; }
  `
  const CookieItemHi = styled(CookieItem)`
    font-weight: 700; font-size: 28px; color: #8B4513; position: relative; margin-bottom: .9rem;
    &::after{ content:''; position:absolute; right:-.5rem; top:50%; width:1.25rem; height:2px; background:#8B4513; transform:translateY(-50%); }
    &::before{ content:''; position:absolute; right:-.8rem; top:50%; width:6px; height:6px; background:#8B4513; border-radius:50%; transform:translateY(-50%); z-index:1; }
    @media(max-width:640px){ font-size: 20px; }
  `
  const CookieImage = styled.img` grid-area: image; width: clamp(180px, 42vw, 420px); height: auto; object-fit: contain; `
  const IngWrap = styled.div` text-align: left; justify-self: start; grid-area: ing; width: 100%; max-width: 420px; @media(max-width:640px){ text-align: center; justify-self: center; } `
  const IngTitle = styled.h3` font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; margin-bottom: 1.2rem; text-underline-offset: .5rem; `
  const IngList = styled.ul` list-style: none; padding: 0; margin-bottom: 1.5rem; `
  const IngItem = styled.li` font-size: 1.05rem; line-height: 1.5; margin-bottom: .6rem; padding-left: 1.2rem; position: relative; &::before{ content:'\2022'; position:absolute; left:0; font-weight:bold; font-size:1.2rem; } @media(max-width:640px){ padding-left: 0; &::before{ display:none; } } `
  const OrderBtn = styled.button` background: var(--brand-primary); color: #fff; border: none; padding: .9rem 2.2rem; border-radius: 25px; cursor: pointer; font-weight: 600; font-size: .95rem; transition: background .3s ease; text-transform: uppercase; margin-top: 1.2rem; &:hover{ background: var(--brand-accent-dark); } `

  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const validCategories = useMemo(() => Object.keys(productSources), [])
  const selectedCategory = useMemo(() => {
    const qp = (searchParams.get('product') || '').toLowerCase()
    return validCategories.includes(qp) ? qp : 'cookies'
  }, [searchParams, validCategories])

  const items = useSelector((state) => state.products.products[selectedCategory] || [])
  const loading = useSelector((state) => state.products.loading[selectedCategory])
  const error = useSelector((state) => state.products.error[selectedCategory])

  useEffect(() => {
    // Always attempt to fetch on category change; the thunk prefers Drive via proxy
    // and falls back to local JSON if Drive fails. This will overwrite any stale local data
    // once Drive succeeds.
    dispatch(fetchCategory(selectedCategory))
  }, [dispatch, selectedCategory])

  return (
    <>
      <Header><h1>{selectedCategory.toUpperCase()}</h1></Header>
      <Section>
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading {selectedCategory}…</div>
        )}
        {error && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'crimson' }}>{String(error)}</div>
        )}
        {!loading && !error && (
          <Grid>
            {items.map((p) => (
              <Card key={p.id}>
                <Wish />
                <ImgWrap>
                  <img src={p.image || '/products/img-product-default.png'} alt={p.name} />
                </ImgWrap>
                <Info>
                  <div className="product-details">
                    <h3>{p.name}</h3>
                    {p.price !== undefined && <div className="product-price">${p.price}</div>}
                    {p.rating !== undefined && (
                      <div className="product-rating">
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star empty">★</span>
                      </div>
                    )}
                  </div>
                  <Actions>
                    <AddBtn onClick={() => dispatch(addItem({ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 }))}>Add to Cart</AddBtn>
                  </Actions>
                </Info>
              </Card>
            ))}
          </Grid>
        )}
      </Section>

      <CaresWrap>
        <CaresHead>CARES FOR YOU</CaresHead>
        <CaresGrid>
          <CookieListWrap>
            <CookieList>
              <CookieItem>Jowar Cookies</CookieItem>
              <CookieItem>Bajra Cookies</CookieItem>
              <CookieItem>Oats Cookies</CookieItem>
              <CookieItemHi>Choco Cookies</CookieItemHi>
              <CookieItem>Mix Dry Fruits Cookies</CookieItem>
              <CookieItem>Rajgira Cookies</CookieItem>
              <CookieItem>Coconut Cookies</CookieItem>
              <CookieItem>Ragi Cookies</CookieItem>
              <CookieItem>Dry Fruit Jaggery Cookies</CookieItem>
            </CookieList>
          </CookieListWrap>
          <div>
            <CookieImage src="/products/img-cookie.png" alt="Cookie" />
          </div>
          <IngWrap>
            <IngTitle>INGREDIENTS</IngTitle>
            <IngList>
              <IngItem>Chocolate Chips</IngItem>
              <IngItem>Coco Powder</IngItem>
              <IngItem>Wheat Flour</IngItem>
              <IngItem>Ragi Flour</IngItem>
              <IngItem>Black Jaggery</IngItem>
              <IngItem>Ghee</IngItem>
            </IngList>
            <OrderBtn>ORDER HERE</OrderBtn>
          </IngWrap>
        </CaresGrid>
      </CaresWrap>

      <Advantages />
    </>
  )
}


