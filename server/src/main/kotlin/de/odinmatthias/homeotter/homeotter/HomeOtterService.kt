package de.odinmatthias.homeotter.homeotter

import org.springframework.stereotype.Service


@Service
class HomeOtterService {
    data class ExampleResponse(val message: String)

    fun getSomeValue() = ExampleResponse("Hello Service!")
}