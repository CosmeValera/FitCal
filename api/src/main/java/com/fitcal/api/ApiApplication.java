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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collections;

@SpringBootApplication
public class ApiApplication {

	private static final String CLIENT_ID = "426540645158-nrmlsa10pio3pnhnt91tpjhf8jo7p25v.apps.googleusercontent.com";

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	/*
	 * Configuración de CORS para permitir solicitudes desde cualquier origen 
	 * y cualquier método HTTP en todas las rutas de la aplicación.
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer(){
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry){
				registry.addMapping("/**").allowedMethods("*");
			}
		};
	}

	/*
	 * Configuración de la verificación del token de Google ID.
	 * Se crea un verificador de GoogleIdToken utilizando un objeto HttpTransport 
	 * y un objeto JsonFactory.
	 * El verificador se configura con la audiencia del cliente especificado 
	 * por CLIENT_ID.
	 */
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

	/*
	 * Configuración de RestTemplate.
	 * Se crea una instancia de RestTemplate que se utilizará para 
	 * realizar llamadas REST en la aplicación.
	 */
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
