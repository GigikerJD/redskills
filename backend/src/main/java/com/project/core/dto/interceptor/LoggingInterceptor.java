package com.project.core.dto.interceptor;

import java.time.Duration;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.project.core.services.LogService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LoggingInterceptor implements HandlerInterceptor {

    private final LogService logService;

    private static final String START_TIME = "startTime";

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {

        logService.createLog(request.getMethod(), request.getRequestURI());
        request.setAttribute(START_TIME, System.nanoTime());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler,
                                @Nullable Exception ex) {

        long startTime = (long) request.getAttribute(START_TIME);
        Duration buildTime = Duration.ofNanos(System.nanoTime() - startTime);

        String method = request.getMethod();
        String endpoint = request.getRequestURI();
        int statusCode = response.getStatus();

        // Optional: resolve userId from JWT / SecurityContext
        String userId = null;

        logService.createLog(method, endpoint, userId, statusCode, buildTime);
    }
}
