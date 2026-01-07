package com.project.core.exceptions;

public class OpenAIException extends RuntimeException {
    public OpenAIException(String message) {
        super(message);
    }

    public OpenAIException(String message, Throwable cause) {
        super(message, cause);
    }

    public OpenAIException(Throwable cause) {
        super(cause);
    }
}
