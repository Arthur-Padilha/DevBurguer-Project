import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import Logo from '../../assets/logo.svg'
import { Button } from '../../components/Button'
import { useUser } from '../../hooks/UserContext'
import { api } from '../../services/api'

import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  Link,
  RightContainer,
  Title,
} from './styles'

export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();


  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um email válido')
        .required('O email é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Digite uma senha'),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

 const onSubmit = async (data) => {
  try {
    const { data: userData } = await toast.promise(
      api.post('/session', {
        email: data.email,
        password: data.password,
      }),
      {
        pending: 'Verificando seus dados',
        success: 'Seja bem-vindo(a)',
        error: 'Email ou senha incorretos',
      },
    );

    putUserData(userData);

    if (userData.admin) {
      navigate('/admin/pedidos');
    } else {
      navigate('/');
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburguer" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Dev Burguer!</span>
          <br />
          Acesse com seu <span>login e senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label htmlFor="email"> Email </label>
            <input id="email" type="email" {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label htmlFor="password"> Senha </label>
            <input id="password" type="password" {...register('password')} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
          <p>
            Não tem conta? <Link to="/cadastro">Clique aqui</Link>
          </p>
        </Form>
      </RightContainer>
    </Container>
  )
}
