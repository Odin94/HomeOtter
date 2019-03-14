package de.odinmatthias.homeotter

import com.allanditzel.springframework.security.web.csrf.CsrfTokenResponseHeaderBindingFilter
import de.odinmatthias.homeotter.controller.HomeOtterUserDetailsService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.BeanIds
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.csrf.CsrfFilter


@Configuration
@EnableWebSecurity
class WebSecurityConfig(
        val userService: HomeOtterUserDetailsService
) : WebSecurityConfigurerAdapter() {
    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
                .authorizeRequests()
                .antMatchers("/**").permitAll()  // permit free access to match
//                .antMatchers("/api/hello").authenticated()
//                .anyRequest().authenticated()  // all others require auth
                .and()

                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .addFilterAfter(CsrfTokenResponseHeaderBindingFilter(), CsrfFilter::class.java)

                .formLogin()
                .permitAll()
                .and()

                .httpBasic()
                .and()

                .logout()
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
    }

    @Bean(name = [BeanIds.AUTHENTICATION_MANAGER])
    @Throws(Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    @Bean
    public override fun userDetailsService(): UserDetailsService {
        return userService
    }
}