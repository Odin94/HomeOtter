package de.odinmatthias.homeotter.controller

import com.natpryce.hamkrest.and
import com.natpryce.hamkrest.assertion.assertThat
import com.natpryce.hamkrest.endsWith
import com.natpryce.hamkrest.equalTo
import com.nhaarman.mockitokotlin2.doReturn
import com.nhaarman.mockitokotlin2.mock
import org.jetbrains.spek.api.Spek
import org.jetbrains.spek.api.dsl.describe
import org.jetbrains.spek.api.dsl.it

object HomeOtterControllerSpec : Spek({
    describe("a very good controller") {
        val mockedHomeOtterService = mock<HomeOtterService> {
            /* Define that when getSomeValue is invoked, return this
               value instead of executing the original code */
            on { getSomeValue() } doReturn HomeOtterService.ExampleResponse("Mocked Message Wahoo!")
        }

        val controller = HomeOtterController(homeOtterService = mockedHomeOtterService)

        it("should return invoke service but return mocked message") {
            val value = controller.example()

            assertThat(value.message, equalTo("Mocked Message Wahoo!") and endsWith("Wahoo!"))
        }
    }
})