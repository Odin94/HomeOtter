package de.odinmatthias.homeotter

import com.allanditzel.springframework.security.web.csrf.CsrfTokenResponseHeaderBindingFilter
import de.odinmatthias.homeotter.homeotter_user.service.HomeOtterUserDetailsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.AuthenticationFailureHandler
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.csrf.CsrfFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


@Configuration
@EnableWebSecurity
class WebSecurityConfig(
        @Autowired
        val userDetailsService: HomeOtterUserDetailsService
) : WebSecurityConfigurerAdapter() {


    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
                .authorizeRequests()
                .antMatchers("/*", "/user_api/**", "/api/log").permitAll()  // permit free access to match
//                .anyRequest().authenticated()  // all others require auth
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
                .successHandler(successHandler())
                .failureHandler(failureHandler())
                .permitAll()
                .and()

                .logout()
                .logoutUrl("/user_api/logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
    }

    @Autowired
    @Throws(Exception::class)
    fun configureGlobal(auth: AuthenticationManagerBuilder) {
        auth.parentAuthenticationManager(null)
    }

    private fun successHandler(): AuthenticationSuccessHandler {
        return AuthenticationSuccessHandler { httpServletRequest, httpServletResponse, authentication ->
            httpServletResponse.writer.append("Authentication success")
            httpServletResponse.writer.append(authentication.name)
            httpServletResponse.status = 200
        }
    }

    private fun failureHandler(): AuthenticationFailureHandler {
        return AuthenticationFailureHandler { httpServletRequest, httpServletResponse, e ->
            httpServletResponse.writer.append("Authentication failure")
            httpServletResponse.status = 401
        }
    }

    @Bean
    @Throws(Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    @Bean
    fun authenticationProvider(): DaoAuthenticationProvider {
        val authProvider = DaoAuthenticationProvider()
        authProvider.setUserDetailsService(userDetailsService)
        authProvider.setPasswordEncoder(encoder())
        return authProvider
    }

    @Bean
    fun encoder(): PasswordEncoder {
        return BCryptPasswordEncoder(11)
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