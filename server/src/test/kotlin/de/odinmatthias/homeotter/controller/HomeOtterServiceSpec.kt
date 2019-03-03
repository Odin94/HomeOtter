package de.odinmatthias.homeotter.controller

import com.natpryce.hamkrest.and
import com.natpryce.hamkrest.assertion.assertThat
import com.natpryce.hamkrest.equalTo
import com.natpryce.hamkrest.startsWith
import org.jetbrains.spek.api.Spek
import org.jetbrains.spek.api.dsl.describe
import org.jetbrains.spek.api.dsl.it

object HomeOtterServiceSpec : Spek({
    describe("a very good service") {
        val homeOtterService = HomeOtterService()

        it("should return the correct value") {
            val value = homeOtterService.getSomeValue()

            assertThat(value.message, equalTo("Hello Service!") and startsWith("Hello"))
        }

        it("should not return the not correct value") {
            val value = homeOtterService.getSomeValue()

            assertThat(value.message, !equalTo("Something completely different!"))
        }
    }
})