package com.fitcal.api.service;

import com.fitcal.api.enums.GoogleAuthMessages;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleAuthService {

    private static final String CLIENT_ID = "1075462838223-6r7k8rfofknaqert59tft0n2doirm1m1.apps.googleusercontent.com";
    private static final HttpTransport transport = new NetHttpTransport();
    private static final JsonFactory jsonFactory = new JacksonFactory();

    /**
     * Autentica con Google utilizando un token de ID.
     * @param idTokenString El token de ID proporcionado por Google.
     * @return Un objeto de tipo GoogleAuthMessages que indica el resultado 
     * de la autenticación.
     */
    public GoogleAuthMessages authenticateWithGoogle(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                // Autenticación exitosa
                return GoogleAuthMessages.SUCCESS;
            } else {
                // Token no válido
                return GoogleAuthMessages.INVALID;
            }
        } catch (Exception e) {
            // Error en la verificación del token
            return GoogleAuthMessages.ERROR;
        }
    }
}
