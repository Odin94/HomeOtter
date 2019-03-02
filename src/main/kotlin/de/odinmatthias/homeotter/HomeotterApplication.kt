package de.odinmatthias.homeotter

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HomeotterApplication

fun main(args: Array<String>) {
	runApplication<HomeotterApplication>(*args)
}
