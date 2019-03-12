package de.odinmatthias.homeotter.controller

import de.odinmatthias.homeotter.model.HomeOtterUser
import de.odinmatthias.homeotter.repository.UserRepository
import org.mindrot.jbcrypt.BCrypt
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/user_api")
class UserController(
        private val userRepository: UserRepository
) {
    @GetMapping("/users")
    fun getAllUsers(): List<HomeOtterUser> = userRepository.findAll()

    @PostMapping("/users")
    fun createNewUser(@Valid @RequestBody homeOtterUser: HomeOtterUser): HomeOtterUser {
        homeOtterUser.passwordHash = BCrypt.hashpw(homeOtterUser.passwordHash, BCrypt.gensalt())

        return userRepository.save(homeOtterUser)
    }
    // for login: BCrypt.checkpw(plainPassword, hashedPassword)

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