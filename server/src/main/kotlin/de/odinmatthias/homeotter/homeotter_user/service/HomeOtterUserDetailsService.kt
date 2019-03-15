package de.odinmatthias.homeotter.homeotter_user.service


import de.odinmatthias.homeotter.homeotter_user.HomeOtterUserDetails
import de.odinmatthias.homeotter.homeotter_user.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service


@Service
class HomeOtterUserDetailsService(
        val userRepository: UserRepository
) : UserDetailsService {
    override fun loadUserByUsername(email: String): UserDetails {
        val user = userRepository.findRegisteredUserByEmail(email)
                ?: throw UsernameNotFoundException(email)
        return HomeOtterUserDetails(user)
    }
}