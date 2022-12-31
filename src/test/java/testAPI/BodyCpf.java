package testAPI;

public class BodyCpf {

	String[] cpfs = { "97093236014", "60094146012", "84809766080", 
					  "62648716050", "26276298085", "01317496094", 
					  "55856777050", "19626829001", "24094592008", 
			          "58063164083", "20020020020", "30030303030" };

	String cpf11 = "20020020020";

	String bodyPost = "{\"nome\": \"Roque Pires\",\"cpf\": 20020020020,\"email\": \"rsppnet@email.com\",\"valor\":200,\"parcelas\": 4,\"seguro\": false}";

	String bodyPut = "{\"nome\": \"Roque teste\",\"cpf\": 30030030303,\"email\": \"rsppnet@email.com\",\"valor\":200,\"parcelas\": 3,\"seguro\": true}";
}
