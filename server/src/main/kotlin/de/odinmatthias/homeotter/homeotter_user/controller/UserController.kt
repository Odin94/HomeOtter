package de.odinmatthias.homeotter.homeotter_user.controller

import de.odinmatthias.homeotter.EmailAlreadyInUseException
import de.odinmatthias.homeotter.homeotter_user.model.HomeOtterUser
import de.odinmatthias.homeotter.homeotter_user.repository.UserRepository
import org.mindrot.jbcrypt.BCrypt
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.web.bind.annotation.*
import javax.validation.Valid


@RestController
@RequestMapping("/user_api")
class UserController(
        private val userRepository: UserRepository,
        private val authenticationManager: AuthenticationManager
) {
    @GetMapping("/users")
    fun getAllUsers(): List<HomeOtterUser> = userRepository.findAll()

    @PostMapping("/users")
    fun createNewUser(@Valid @RequestBody homeOtterUser: HomeOtterUser): HomeOtterUser {
        if (userRepository.findRegisteredUserByEmail(homeOtterUser.email) == null) {
            homeOtterUser.passwordHash = BCrypt.hashpw(homeOtterUser.passwordHash, BCrypt.gensalt())

            return userRepository.save(homeOtterUser)
        } else {
            throw EmailAlreadyInUseException()
        }
    }

    @GetMapping("/users/{id}")
    fun getUserById(@PathVariable(value = "id") userId: Long): ResponseEntity<HomeOtterUser> {
        return userRepository.findById(userId).map { user ->
            ResponseEntity.ok(user)
        }.orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("/Users/{id}")
    fun updateUserById(@PathVariable(value = "id") UserId: Long,
                       @Valid @RequestBody newHomeOtterUser: HomeOtterUser): ResponseEntity<HomeOtterUser> {

        return userRepository.findById(UserId).map { existingUser ->
            val updatedHomeOtterUser: HomeOtterUser = existingUser
                    .copy(email = newHomeOtterUser.email,
                            firstName = newHomeOtterUser.firstName,
                            lastName = newHomeOtterUser.lastName,
                            passwordHash = newHomeOtterUser.passwordHash)
            ResponseEntity.ok().body(userRepository.save(updatedHomeOtterUser))
        }.orElse(ResponseEntity.notFound().build())

    }

    @DeleteMapping("/Users/{id}")
    fun deleteUserById(@PathVariable(value = "id") UserId: Long): ResponseEntity<Void> {

        return userRepository.findById(UserId).map { User ->
            userRepository.delete(User)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())

    }
}