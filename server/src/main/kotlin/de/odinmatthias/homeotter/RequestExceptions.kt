package de.odinmatthias.homeotter

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus


@ResponseBody
@ResponseStatus(value = HttpStatus.CONFLICT, reason = "email already in use")
class EmailAlreadyInUseException : RuntimeException()