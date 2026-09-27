import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import "../styles.css"

import { useCart } from '../../../hooks/CartContext'
import { api } from '../../../services/api'

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const {
    state: { dpmCheckerLink },
  } = useLocation()

  const navigate = useNavigate()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { cartProducts, clearCart } = useCart()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      console.error("Stripe ou Elements com falha.")
      return
    }

    setIsLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })

    if (error) {
      setMessage(error.message)
      toast.error(error.message)
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        const products = cartProducts.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          }
        })

        const { status } = await api.post(
          "/orders",
          { products },
          {
            validateStatus: () => true,
          },
        )

        if (status === 200 || status === 201) {
          setTimeout(() => {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)
            clearCart()
          }, 2000)
          toast.success("Pedido Realizado com Sucesso!")
        } else if (status === 409) {
          toast.error("Falha ao realizar o seu pedido")
        } else {
          throw new Error()
        }
      } catch (_error) {
        toast.error("Falha no sistema! Tente Novamente")
      }
    } else {
      navigate(
        `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
      )
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: 'accordion',
  }

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
        />

        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="button"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pagar agora'
            )}
          </span>
        </button>

        {message && (
          <div id="payment-message">
            {message}
          </div>
        )}
      </form>

      <div id="dpm-annotation">
        <p>
          Os métodos de pagamentos são disponibilizados de acordo com sua região.&nbsp;

          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Ver métodos de Pagamento
          </a>
        </p>
      </div>
    </div>
  )
}