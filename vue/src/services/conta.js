import { http } from '../../global'

export default	{

	salvar:(conta)=>{
		return http.post('cc',conta);
  },
    
	atualizar:(conta)=>{
		return http.put('cc/:id',conta);
  },

    listar:()=>{
		return http.get('cc')
  },
    
	apagar:(conta)=>{
		return http.delete('cc/'+conta.id)
	}
}