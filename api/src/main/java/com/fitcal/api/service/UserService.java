package com.fitcal.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitcal.api.model.User;
import com.fitcal.api.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    /**
     * Obtiene todos los usuarios.
     * @return Una lista de todos los usuarios existentes en la base de datos.
    */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Obtiene un usuario por su ID de token.
     * @param idToken El ID de token del usuario a obtener.
     * @return El usuario encontrado o null si no se encuentra.
     */
    public Optional<User> getUserByIdToken(String idToken) {
        return userRepository.findByGoogleId(idToken);
    }

    /**
     * Obtiene un usuario por su dirección de correo electrónico.
     * @param email La dirección de correo electrónico del usuario a obtener.
     * @return El usuario encontrado o null si no se encuentra.
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Crea un nuevo usuario.
     * @param user El objeto User a crear.
     * @return El usuario creado.
     */
    public User createUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Actualiza un usuario existente por su ID.
     * @param id El ID del usuario a actualizar.
     * @param updatedUser El objeto User actualizado.
     * @return El usuario actualizado, si existe; de lo contrario, devuelve null.
     */
    public User updateUser(Long id, User updatedUser) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setEmail(updatedUser.getEmail());
            return userRepository.save(user);
        }
        return null; // or throw an exception
    }

    /**
     * Actualiza el perfil de un usuario existente por su ID.
     * @param id El ID del usuario a actualizar.
     * @param updatedUser El objeto User actualizado con los nuevos datos de perfil.
     * @return El usuario actualizado, si existe; de lo contrario, devuelve null.
     */
    public User updateUserProfile(Long id, User updatedUser) {
        if (userRepository.existsById(id)) {
            updatedUser.setId(id);
            return userRepository.save(updatedUser);
        } else {
            return null;
        }
    }

    /**
     * Elimina un usuario existente por su ID.
     * @param id El ID del usuario a eliminar.
     * @return true si el usuario se eliminó correctamente; 
     * false si no se encontró el usuario.
     */
    public boolean deleteUser(Long id) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            userRepository.delete(existingUser.get());
            return true;
        }
        return false;
    }

    /**
     * Busca un usuario por su dirección de correo electrónico.
     * @param email La dirección de correo electrónico del usuario a buscar.
     * @return El usuario encontrado o null si no se encuentra.
     */
    public Optional<User> findByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

}
