import TrashIcon from '../../assets/trash.svg'
import { useCart } from '../../hooks/CartContext'
import { formatPrice } from '../../utils/formatPrice'
import { Table } from '../index'
import { ButtonGroup, EmptyCart, ProductImage, TrashImage } from './styles'

export function CartItems() {
  const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } =
    useCart()

  return (
    <Table.Root>
      <Table.Header>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Itens</Table.Th>
          <Table.Th>Preço</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Header>
      <Table.Body>
        {cartProducts?.length ? (
          cartProducts.map(product => {
            // Garante conversão segura para Number
            const quantity = Number(product.quantity) || 0
            const price = Number(product.price) || 0
            const total = quantity * price

            return (
              <Table.Tr key={product.id}>
                <Table.Td>
                  <ProductImage src={product.url} alt={product.name} />
                </Table.Td>

                <Table.Td>{product.name}</Table.Td>

                <Table.Td>{product.currencyValue}</Table.Td>

                <Table.Td>
                  <ButtonGroup>
                    <button
                      type="button"
                      onClick={() => decreaseProduct(product.id)}
                    >
                      -
                    </button>

                    {quantity}

                    <button
                      type="button"
                      onClick={() => increaseProduct(product.id)}
                    >
                      +
                    </button>
                  </ButtonGroup>
                </Table.Td>

                <Table.Td>
                  <div style={{ fontWeight: 'bold' }}>
                    {formatPrice(total)}
                  </div>
                </Table.Td>

                <Table.Td>
                  <TrashImage
                    src={TrashIcon}
                    alt="lixeira"
                    onClick={() => deleteProduct(product.id)}
                  />
                </Table.Td>
              </Table.Tr>
            )
          })
        ) : (
          <Table.Tr>
            <Table.Td colSpan={6}>
              <EmptyCart>Carrinho Vazio</EmptyCart>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Body>
    </Table.Root>
  )
}