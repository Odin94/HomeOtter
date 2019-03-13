package de.odinmatthias.homeotter.repository


import de.odinmatthias.homeotter.model.HomeOtterUser
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<HomeOtterUser, Long> {
    fun findRegisteredUserByEmail(email: String): HomeOtterUser?
}