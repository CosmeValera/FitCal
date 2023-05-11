package com.fitcal.api.user.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Excepcion personalizada de usuario no encontrado
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionID = 1L;

    public ResourceNotFoundException(String msg) {
        super(msg);
    }
}
