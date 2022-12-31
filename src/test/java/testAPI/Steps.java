package testAPI;

import io.cucumber.java.en.Given;

public class Steps{
baseApi base = new baseApi();


@Given("que acesse a API {string}")
public void que_acesse_a_api(String uri) {
base.que_acesse_a_api(uri);
}
@Given("que eu faca o post na API {string}")
public void que_eu_faca_o_post_na_api(String uri) {
	base.que_eu_faca_o_post_na_api(uri);
}

@Given("que eu faca o put na API {string}")
public void que_eu_faca_o_put_na_api(String uri) {
	base.que_eu_faca_o_put_na_api(uri);

}

@Given("fazer o get Simulacoes {string}")
public void fazer_o_get_simulacoes(String uri) {
base.fazer_o_get_simulacoes(uri);
}

@Given("eu faca o get para consultar cpf {string}")
public void eu_faca_o_get_para_consultar_cpf(String Uri) {
base.eu_faca_o_get_para_consultar_cpf(Uri);

}


@Given("faca um Delete na API  {string}")
public void faca_um_delete_na_api(String Uri) {
	base.faca_um_delete_na_api(Uri);
 
}
}
	
	

