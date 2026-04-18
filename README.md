Cuando el usuario es de tipo Cine y además tiene permisos para ese cine en concreto (2 puntos)
1.¿Qué haría falta para esto?

Hay que añadir una FK de user hacia threater que sea CinemaId, haría falta comprobar que el user es de tipo CINEMA.
Deberíamos hacer una autenticación de Cinema para comprobar que es el cine al que pertenece cuando queramos editar añadiendo un campo en el jwtPayload.
También deberíamos añadir en el registro una opción para que si marcamos que somos un cine se nos asigne un cinemaId en el user.
