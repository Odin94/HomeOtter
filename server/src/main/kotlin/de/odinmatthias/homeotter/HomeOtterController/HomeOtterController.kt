package de.odinmatthias.homeotter.HomeOtterController

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController()
class HomeOtterController {

    @GetMapping("/api/hello", produces = ["application/json"])
    fun example() = "Hello World!"
}