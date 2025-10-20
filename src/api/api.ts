import axios from 'axios'

const api = axios.create({
  baseURL:'http://localhost:8000'
})

//Nós vamos criar um middware para adicionar o token na requisição

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token)
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

//Redirecionarpara o Login quando o usuário não estiver autenticado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Teste: Erro na resposta da API:', error)
    const status = error?.response?.status;
    if (status === 401 &&!(error?.config?.url?.endsWith('/login'))) {
      localStorage.removeItem('token')
      window.location.href = '/login?message=Token Invalido'
    }
    return Promise.reject(error)
  }
)


export default api