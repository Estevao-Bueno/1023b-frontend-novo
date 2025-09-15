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
  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then((data) => setProdutos(data))
  }, [])

  console.log(produtos)

    
  return (
    <>
    <div>Estêvão</div>
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
