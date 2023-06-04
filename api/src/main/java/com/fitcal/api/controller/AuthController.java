package com.fitcal.api.controller;

import com.fitcal.api.dto.GoogleAuthDTO;
import com.fitcal.api.model.User;
import com.fitcal.api.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collections;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private static final String CLIENT_ID = "1075462838223-6r7k8rfofknaqert59tft0n2doirm1m1.apps.googleusercontent.com"; // Reemplaza con tu propio CLIENT_ID

    private final UserRepository userRepository;
    private final GoogleIdTokenVerifier verifier;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;

        // Inicializar el verificador de GoogleIdToken
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        NetHttpTransport transport = new NetHttpTransport();
        this.verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();
    }

    @PostMapping("/auth/google")
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody GoogleAuthDTO googleAuthDTO) {
        String idTokenString = googleAuthDTO.getIdToken();
        String fullName = googleAuthDTO.getName();

        // Verificar y validar el token de ID de Google
        GoogleIdToken idToken = verifyGoogleIdToken(idTokenString);
        if (idToken == null) {
            // Token inválido, manejar el error apropiadamente
            return ResponseEntity.badRequest().body("Invalid ID token");
        }

        // Obtener la información del payload
        GoogleIdToken.Payload payload = idToken.getPayload();

        // Obtener el identificador del usuario
        String userId = payload.getSubject();

        // Obtener el correo electrónico del usuario
        String email = payload.getEmail();

        // Verificar si el usuario ya existe en la base de datos
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            // El usuario ya existe en la base de datos, realizar las acciones apropiadas
            // (por ejemplo, iniciar sesión en la aplicación)
            // ...

            // Devolver una respuesta exitosa
            return ResponseEntity.ok().build();
        }

        // Crear un nuevo usuario en la base de datos
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setFullName(fullName);
        // Establecer otros atributos del usuario si es necesario
        // ...

        // Guardar el nuevo usuario en la base de datos
        userRepository.save(newUser);

        // Realizar las acciones apropiadas después de crear el usuario
        // (por ejemplo, iniciar sesión en la aplicación)
        // ...

        // Devolver una respuesta exitosa
        return ResponseEntity.ok().build();
    }

    private GoogleIdToken verifyGoogleIdToken(String idTokenString) {
        try {
            return verifier.verify(idTokenString);
        } catch (Exception e) {
            // Manejar cualquier excepción
            return null;
        }
    }
}
