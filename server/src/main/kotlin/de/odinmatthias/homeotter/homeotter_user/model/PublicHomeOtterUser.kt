package de.odinmatthias.homeotter.homeotter_user.model


data class PublicHomeOtterUser(
        val email: String,
        val firstName: String,
        val lastName: String
)

fun toPublicUser(user: HomeOtterUser): PublicHomeOtterUser {
    return PublicHomeOtterUser(user.email, user.firstName, user.lastName)
}