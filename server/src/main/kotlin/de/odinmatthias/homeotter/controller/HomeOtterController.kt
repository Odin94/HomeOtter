package de.odinmatthias.homeotter.controller

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HomeOtterController @Autowired constructor(
        private val homeOtterService: HomeOtterService
) {
    val logger: Logger = LoggerFactory.getLogger(HomeOtterController::class.java)

    @GetMapping("/api/hello", produces = ["application/json"])
    fun example() = homeOtterService.getSomeValue()

    @GetMapping("/api/log", produces = ["application/json"])
    fun log(): String {
        logger.info("~~~~log~~~~")
        return "log"
    }
}