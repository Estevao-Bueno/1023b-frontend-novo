import './App.css'
import { useEffect, useState } from 'react'
type ProdutoType = {
  _id: string;
  nome: string;
  preco: number;
  urlfoto: string;
  descricao: string;
}


function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  //const [nome, setNome] = useState('')
  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then((data) => setProdutos(data))
  }, [])

  function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    
    fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
  } // precisa dicionar mais linhas

  console.log(produtos)

    
  return (
    <>
    <div>Cadastro de Produtos</div>
    <form onSubmit={handleForm}>
    <input type="text" name="nome" placeholder="Nome" /><br />
    <input type="number" name="preco" placeholder="Preço" /><br />
    <input type="text" name="urlfoto" placeholder="URL da Foto" /><br />
    <textarea name="descricao" placeholder="Descrição"></textarea><br />
    <button type="submit">Adicionar Produto</button>
    </form>

    <div>Lista de Produtos</div>
    {
    produtos.map((produto) => (
      <div key={produto._id}>
        <h2>{produto.nome}</h2>
        <p>R$ {produto.preco}</p>
        <img src={produto.urlfoto} alt={produto.nome} width="200" />
        <p>{produto.descricao}</p>
      </div>
    ))
  }
    </>
  )

}

export default App
