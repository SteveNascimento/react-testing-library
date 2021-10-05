import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    email: Yup.string().required('Obrigatório!').email('Digite um e-mail válido!'),
    password: Yup.string().required('Obrigatório!').min(4, 'Password muito curto!'),
})
