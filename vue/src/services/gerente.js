import { http } from '../../global'

export default	{

	salvar:(gerente)=>{
		console.log(gerente)
		return http.post('ge', gerente);
  },
    
	atualizar:(gerente)=>{
		return http.put('ge',gerente);
  },

    listar:()=>{
		return http.get('ge')
  },
    
	apagar:(gerente)=>{
		return http.delete('ge/'+gerente.id )
	}
}