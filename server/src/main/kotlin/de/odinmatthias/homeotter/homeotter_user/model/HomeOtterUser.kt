package de.odinmatthias.homeotter.homeotter_user.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.NotBlank

@Entity
data class HomeOtterUser(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

        @get: NotBlank
        val email: String = "",

        @get: NotBlank
        val firstName: String = "",
        @get: NotBlank
        val lastName: String = "",

        @get: NotBlank
        var passwordHash: String = ""
)