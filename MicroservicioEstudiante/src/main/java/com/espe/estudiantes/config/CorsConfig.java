package com.espe.estudiantes.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://172.190.203.120") // Specific origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Include OPTIONS
                        .allowedHeaders("*") // Be more specific in production
                        .allowCredentials(true); // If you're using cookies for authentication
            }
        };
    }
}