package testAPI;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

public class MetodosApi {
	
	
	static HttpResponse<String> response;

public void GetRestriction(String API,String cpfs) {
		
	HttpResponse<String> response = Unirest.get(API+cpfs)
			.header("Content-Type", "application/json")
			.asString();
	int status = response.getStatus();
	if (status==204) {
	System.out.println(response.getStatus()+" CPF sem restrição");
	}else if(status==200){
	System.out.println(response.getStatus()+" CPF com restrição");
	}
	
	}
	

public void PostSimulation(String API, String body) {
	HttpResponse<String> response = Unirest.post(API)
			.header("accept", "*/*")
			.header("Content-Type", "application/json")
			.body(body)

			  .asString();

	int status = response.getStatus();
	if (status==201) {
		System.out.println(response.getStatus()+" Simulação ok");
		}else if(status==400){
		System.out.println(response.getStatus()+" erro no corpo");
		}else if(status==409){
			System.out.println(response.getStatus()+" CPF já existe");
		}
			System.out.println(response.getBody());
}

public void PutSimulation(String API, String body,String CPF) {
HttpResponse<JsonNode> response = Unirest.put(API+CPF)
.header("accept", "*/*")
.header("Content-Type", "application/json")
.body(body)
.asJson();
int status = response.getStatus();
if (status==200) {
	System.out.println(response.getStatus()+" Alteração ok");
	}else if(status==404){
	System.out.println(response.getStatus()+" Simulação não encontrada");
	}
System.out.println(response.getStatus());
System.out.println(response.getBody());
}
public void GetSimulations(String API) {
	HttpResponse<String> response = Unirest.get(API)
			.header("accept", "*/*")
			.asString();
	int status = response.getStatus();
	if (status==200) {
		System.out.println(response.getStatus()+" Simulações encontradas");
		
		}
			
	System.out.println(response.getStatus());
	System.out.println(response.getBody());
	
}

public void GetSimulationCpf(String API,String CPF) {
	HttpResponse<String> response = Unirest.get(API+CPF)
			.header("accept", "*/*")
			.asString();
	int status = response.getStatus();
	if (status==200) {
		System.out.println(response.getStatus()+" Simulação encontrada");
		}else if(status==404){
		System.out.println(response.getStatus()+" Simulação não encontrada");
		}
			
	System.out.println(response.getStatus());
	System.out.println(response.getBody());
}

public void DelettRestrictionCpf(String API, String CPF) {
	HttpResponse<String> response = Unirest.delete(API+CPF)
			.header("accept", "*/*")
			.asString();
	int status = response.getStatus();
	if (status==200) {
		System.out.println(response.getStatus()+" Simulação removida com scesso");

		}
	
	System.out.println(response.getStatus());
	System.out.println(response.getBody());
}

}

