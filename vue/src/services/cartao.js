import { http } from './config'

export default	{

	salvar:(cartao)=>{
		return http.post('cart',cartao);
  },
    
	atualizar:(cartao)=>{
		return http.put('cart',cartao);
  },

    listar:()=>{
		return http.get('cart')
  },
    
	apagar:(cartao)=>{
		return http.delete('cart', { data: cartao })
	}
}