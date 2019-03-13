package de.odinmatthias.homeotter.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HomeOtterController @Autowired constructor(
        private val homeOtterService: HomeOtterService
) {
    @GetMapping("/api/hello", produces = ["application/json"])
    fun example() = homeOtterService.getSomeValue()
}