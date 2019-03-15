package de.odinmatthias.homeotter.homeotter_user.repository


import de.odinmatthias.homeotter.homeotter_user.model.HomeOtterUser
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<HomeOtterUser, Long> {
    fun findRegisteredUserByEmail(email: String): HomeOtterUser?
}