package de.odinmatthias.homeotter.homeotter_user.controller

import de.odinmatthias.homeotter.EmailAlreadyInUseException
import de.odinmatthias.homeotter.InvalidSessionException
import de.odinmatthias.homeotter.homeotter_user.model.HomeOtterUser
import de.odinmatthias.homeotter.homeotter_user.model.PublicHomeOtterUser
import de.odinmatthias.homeotter.homeotter_user.model.toPublicUser
import de.odinmatthias.homeotter.homeotter_user.repository.UserRepository
import org.mindrot.jbcrypt.BCrypt
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid


@RestController
@RequestMapping("/user_api")
class UserController(
        private val userRepository: UserRepository,
        private val authenticationManager: AuthenticationManager
) {
    val logger: Logger = LoggerFactory.getLogger(UserController::class.java)

    @GetMapping("/users")
    fun getAllUsers(): List<HomeOtterUser> = userRepository.findAll()

    @PostMapping("/users")
    fun createNewUser(@Valid @RequestBody homeOtterUser: HomeOtterUser, httpServletRequest: HttpServletRequest): HomeOtterUser {
        if (userRepository.findRegisteredUserByEmail(homeOtterUser.email) == null) {
            val hashedPassword = BCrypt.hashpw(homeOtterUser.passwordHash, BCrypt.gensalt())
            val savedUser = userRepository.save(homeOtterUser.copy(passwordHash = hashedPassword))

            httpServletRequest.login(savedUser.email, homeOtterUser.passwordHash)

            return savedUser
        } else {
            logger.warn("Failed to create user, email already in use!")
            throw EmailAlreadyInUseException()
        }
    }

    @PostMapping("/session/{providedSessionId}")
    fun getUserFromSession(principal: UsernamePasswordAuthenticationToken?,
                           httpServletRequest: HttpServletRequest,
                           @PathVariable("providedSessionId") providedSessionId: String): PublicHomeOtterUser {
        if (principal == null) {
            logger.warn("Tried to access $providedSessionId without being logged in")
            throw InvalidSessionException()
        }

        val sessionId = httpServletRequest.requestedSessionId

        if (sessionId == providedSessionId) {
            val email = principal.name
            val foundUser = userRepository.findRegisteredUserByEmail(email)
                    ?: throw UsernameNotFoundException("$email not found")

            return toPublicUser(foundUser)
        } else {
            logger.warn("Tried to access $providedSessionId with different sessionId: $sessionId")
            throw InvalidSessionException()
        }
    }

    @GetMapping("/users/{id}")
    fun getUserById(@PathVariable(value = "id") userId: Long): ResponseEntity<HomeOtterUser> {
        return userRepository.findById(userId).map { user ->
            ResponseEntity.ok(user)
        }.orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("/users/{id}")
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

    @DeleteMapping("/users/{id}")
    fun deleteUserById(@PathVariable(value = "id") UserId: Long): ResponseEntity<Void> {

        return userRepository.findById(UserId).map { User ->
            userRepository.delete(User)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())

    }
}