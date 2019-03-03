package de.odinmatthias.homeotter.controller

import org.springframework.stereotype.Service


@Service
class HomeOtterService {
    data class ExampleResponse(val message: String)

    fun getSomeValue() = ExampleResponse("Hello Service!")
}