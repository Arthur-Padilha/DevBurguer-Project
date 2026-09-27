import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const updateLocalStorage = products => {
    localStorage.setItem('devburger:cartInfo', JSON.stringify(products))
  }

  const putProductInCart = product => {
    const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)
    let newProductsInCart = []

    if (cartIndex >= 0) {
      newProductsInCart = cartProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newProductsInCart = [...cartProducts, { ...product, quantity: 1 }]
    }

    setCartProducts(newProductsInCart)
    updateLocalStorage(newProductsInCart)
  }

  const clearCart = () => {
    setCartProducts([])
    updateLocalStorage([])
  }

  const deleteProduct = productId => {
    const newCart = cartProducts.filter(prd => prd.id !== productId)

    setCartProducts(newCart)
    updateLocalStorage(newCart)
  }

  const increaseProduct = productId => {
    const newCart = cartProducts.map(prd => {
      return prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd
    })

    setCartProducts(newCart)
    updateLocalStorage(newCart)
  }

  const decreaseProduct = productId => {
    const product = cartProducts.find(prd => prd.id === productId)

    if (product && product.quantity > 1) {
      const newCart = cartProducts.map(prd => {
        return prd.id === productId
          ? { ...prd, quantity: prd.quantity - 1 }
          : prd
      })

      setCartProducts(newCart)
      updateLocalStorage(newCart)
    } else {
      deleteProduct(productId)
    }
  }

  useEffect(() => {
    const clientCartData = localStorage.getItem('devburger:cartInfo')

    if (clientCartData) {
      setCartProducts(JSON.parse(clientCartData))
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        putProductInCart,
        increaseProduct,
        decreaseProduct,
        clearCart,
        deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used with a context')
  }

  return context
}