package com.fitcal.api;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@SpringBootApplication
public class ApiApplication {

	private static final String CLIENT_ID = "426540645158-nrmlsa10pio3pnhnt91tpjhf8jo7p25v.apps.googleusercontent.com";

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Bean
	public GoogleIdTokenVerifier googleIdTokenVerifier() {
		// Crea el objeto HttpTransport
		HttpTransport transport = new NetHttpTransport();

		// Crea el objeto JsonFactory
		JsonFactory jsonFactory = new JacksonFactory();

		// Crea y configura el verificador de GoogleIdToken
		return new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
				.setAudience(Collections.singletonList(CLIENT_ID))
				.build();
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
