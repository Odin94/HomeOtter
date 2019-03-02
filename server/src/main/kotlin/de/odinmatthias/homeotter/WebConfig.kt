package de.odinmatthias.homeotter

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
import org.springframework.boot.web.server.ErrorPage
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus


@Configuration
class WebConfig {

    // Redirect to / for all not-found urls so everything leads you to the React SPA
    @Bean
    fun webServerFactory(): ConfigurableServletWebServerFactory {
        val factory = TomcatServletWebServerFactory()
        factory.errorPages.add(ErrorPage(HttpStatus.NOT_FOUND, "/"))
        return factory
    }
}