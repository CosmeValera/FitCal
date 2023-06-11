package com.fitcal.api.controller;

import com.fitcal.api.model.User;
import com.fitcal.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Obtiene todos los usuarios
     * @return Una lista de objetos User.
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    
    /**
     * Verifica si existe un usuario con el correo electrónico especificado.
     * @param email El correo electrónico del usuario a verificar.
     * @return ResponseEntity con el cuerpo de la respuesta como el 
     * usuario encontrado (HttpStatus.OK) si existe, 
     * o una respuesta vacía (HttpStatus.NOT_FOUND) si no existe.
    */
    @GetMapping("/{email}")
    public ResponseEntity<User> checkUserExists(@PathVariable("email") String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Actualiza el perfil de un usuario existente con el ID especificado.
     * @param id   El ID del usuario a actualizar.
     * @param user El objeto User que contiene los nuevos datos del usuario.
     * @return ResponseEntity con el cuerpo de la respuesta como el usuario actualizado (HttpStatus.OK) si se actualizó correctamente,
     * o una respuesta vacía (HttpStatus.NOT_FOUND) si el usuario no se encuentra.
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    /**
     * Actualiza el perfil de un usuario existente con el ID especificado.
     * @param id   El ID del usuario a actualizar.
     * @param user El objeto User que contiene los nuevos datos del usuario.
     * @return ResponseEntity con el cuerpo de la respuesta como el usuario actualizado (HttpStatus.OK) si se actualizó correctamente,
     * o una respuesta vacía (HttpStatus.NOT_FOUND) si el usuario no se encuentra.
     */    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUserProfile(id, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Elimina un usuario existente con el ID especificado.
     * @param id El ID del usuario a eliminar.
     * @return ResponseEntity con una respuesta vacía (HttpStatus.NO_CONTENT) si se eliminó correctamente,
     * o una respuesta vacía (HttpStatus.NOT_FOUND) si el usuario no se encuentra.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        boolean deleted = userService.deleteUser(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
