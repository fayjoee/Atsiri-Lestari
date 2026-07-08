import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)
const CartDispatchContext = createContext(null)

const STORAGE_KEY = 'atsiri-lestari-cart'

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Storage full or unavailable
  }
}

function cartReducer(items, action) {
  let newItems
  switch (action.type) {
    case 'ADD': {
      const existing = items.find(item => item.id === action.product.id)
      if (existing) {
        newItems = items.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: Math.min(item.quantity + (action.quantity || 1), item.stock) }
            : item
        )
      } else {
        newItems = [...items, {
          id: action.product.id,
          name: action.product.name,
          price: action.product.price,
          unit: action.product.unit,
          image: action.product.image,
          stock: action.product.stock,
          quantity: action.quantity || 1,
        }]
      }
      break
    }
    case 'REMOVE': {
      newItems = items.filter(item => item.id !== action.id)
      break
    }
    case 'UPDATE_QUANTITY': {
      newItems = items.map(item =>
        item.id === action.id
          ? { ...item, quantity: Math.max(1, Math.min(action.quantity, item.stock)) }
          : item
      )
      break
    }
    case 'CLEAR': {
      newItems = []
      break
    }
    default:
      return items
  }
  saveCart(newItems)
  return newItems
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, null, loadCart)

  const cartInfo = {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    get shippingCost() {
      // Free shipping above 500k, otherwise flat rate
      return this.subtotal >= 500000 ? 0 : 25000
    },
    get total() {
      return this.subtotal + this.shippingCost
    },
  }

  return (
    <CartContext.Provider value={cartInfo}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext)
  if (!context) throw new Error('useCartDispatch must be used within CartProvider')
  return context
}

export function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
