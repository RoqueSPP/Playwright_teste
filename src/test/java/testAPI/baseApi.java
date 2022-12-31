package testAPI;

public class baseApi {
	
	MetodosApi metodo = new MetodosApi();
	BodyCpf body = new BodyCpf();

	public void que_acesse_a_api(String uri) {
		
		for (String cpf : body.cpfs)
			
	metodo.GetRestriction(uri,cpf);

	}
   
	public  void que_eu_faca_o_post_na_api(String uri) {
	metodo.PostSimulation(uri, body.bodyPost);
		
	}

	public  void que_eu_faca_o_put_na_api(String uri) {
	metodo.PutSimulation(uri, body.bodyPut,body.cpf11);
		
	}
	public  void fazer_o_get_simulacoes(String uri) {
		metodo.GetSimulations(uri);
		
	}

	public void eu_faca_o_get_para_consultar_cpf(String uri) {
	metodo.GetSimulationCpf(uri, body.cpf11);
		
	}

	public void faca_um_delete_na_api(String uri) {
		metodo.DelettRestrictionCpf(uri, body.cpf11);
		
		
	}
}

