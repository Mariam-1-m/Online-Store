import ProductsCards from './components/Shop/ProductsCards.jsx'

function App() {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <ProductsCards />
    </div>
  )
}

export default App
