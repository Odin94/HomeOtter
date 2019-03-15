package de.odinmatthias.homeotter

import com.allanditzel.springframework.security.web.csrf.CsrfTokenResponseHeaderBindingFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.csrf.CsrfFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


@Configuration
@EnableWebSecurity
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
                .authorizeRequests()
                .antMatchers("/", "/*", "/user_api/**", "/api/log", "/user_api/login").permitAll()  // permit free access to match
                .anyRequest().authenticated()  // all others require auth
                .and()

                .httpBasic()
                .and()

                .cors()
                .and()

                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .addFilterAfter(CsrfTokenResponseHeaderBindingFilter(), CsrfFilter::class.java)

                .formLogin()
                .loginPage("/")
                .loginProcessingUrl("/user_api/login")
                .usernameParameter("email")
                .permitAll()
                .and()

                .httpBasic()
                .and()

                .logout()
                .logoutUrl("/user_api/logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("*")
        configuration.allowedMethods = listOf("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH")
        configuration.allowCredentials = true
        configuration.allowedHeaders = listOf("Authorization", "Cache-Control", "Content-Type", "x-xsrf-token")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }
}