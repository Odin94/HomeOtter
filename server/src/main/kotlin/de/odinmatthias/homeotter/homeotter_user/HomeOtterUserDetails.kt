package de.odinmatthias.homeotter.homeotter_user

import de.odinmatthias.homeotter.homeotter_user.model.HomeOtterUser
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails


class HomeOtterUserDetails(private val user: HomeOtterUser) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf()
    }

    override fun isEnabled(): Boolean {
        return true
    }

    override fun getUsername(): String {
        return user.email
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun getPassword(): String {
        return user.passwordHash
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }
}