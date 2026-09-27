import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51U81Dd1PAjIkMpkwVpBoFcO0LV6wvY35stavvISydlDcdiiRWMOZ9SusZt4LoScBVcMnCjfjY1rUsontz6DNOulT007OYcU2OB'
);

export default stripePromise