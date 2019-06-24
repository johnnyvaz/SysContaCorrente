import { http } from '../../global'

export default	{

	salvar:(cartao)=>{
		return http.post('cart',cartao)
  },
    
	atualizar:(cartao)=>{
		return http.put('cart/'+cartao.id);
  },

    listar:()=>{
		return http.get('cart')
  },
    
	apagar:(cartao)=>{
		return http.delete('cart/'+cartao.id)
	}
}
