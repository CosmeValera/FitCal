package com.fitcal.api.controller;

import com.fitcal.api.dto.GoogleAuthDTO;
import com.fitcal.api.enums.GoogleAuthMessages;
import com.fitcal.api.model.User;
import com.fitcal.api.service.GoogleAuthService;
import com.fitcal.api.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.Optional;

@RestController
@CrossOrigin(value = "*")
public class AuthController {

    private static final String CLIENT_ID = "1075462838223-6r7k8rfofknaqert59tft0n2doirm1m1.apps.googleusercontent.com"; // Reemplaza con tu propio CLIENT_ID

    private final UserService userService;
    private final GoogleIdTokenVerifier verifier;
    private final GoogleAuthService googleAuthService;

    /**
     * Constructor de la clase AuthController.
     * @param userService Servicio de usuarios.
     * @param googleAuthService Servicio de autenticación de Google.
     */
    @Autowired
    public AuthController(UserService userService, GoogleAuthService googleAuthService) {
        this.userService = userService;
        this.googleAuthService = googleAuthService;
        // Inicializar el verificador de GoogleIdToken
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        NetHttpTransport transport = new NetHttpTransport();
        this.verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();
    }

    /**
     * Controlador para autenticarse con Google.
     * @param googleAuthDTO El objeto GoogleAuthDTO que contiene el ID de token de Google.
     * @return Un objeto ResponseEntity que contiene el DTO de autenticación de Google.
     * @throws ResponseStatusException Si la autenticación falla o el usuario no está autorizado.
     */
    @PostMapping("/auth/google")
    public ResponseEntity<GoogleAuthDTO> authenticateWithGoogle(@RequestBody GoogleAuthDTO googleAuthDTO) {
        String idTokenString = googleAuthDTO.getIdToken();


        GoogleAuthMessages result = this.googleAuthService.authenticateWithGoogle(idTokenString);
        if (result == GoogleAuthMessages.SUCCESS) {
            Optional<User> user = this.userService.findByEmail(googleAuthDTO.getEmail());
            if (user.isPresent()) {
                GoogleAuthDTO userPresent = new GoogleAuthDTO(user.get().getId(), user.get().getGoogleId(), user.get().getName(), user.get().getEmail(), user.get().getPhotoUrl());
                return ResponseEntity.ok().body(userPresent);
            }

            User newUser = this.userService.createUser(new User(null, googleAuthDTO.getEmail(), googleAuthDTO.getIdToken(), googleAuthDTO.getName(), googleAuthDTO.getPhotoUrl()));
            googleAuthDTO.setId(newUser.getId());

            return ResponseEntity.ok().body(googleAuthDTO);
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "USUARIO NO AUTORIZADO");
    }

}
