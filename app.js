new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        hayGanador: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },

        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
            this.hayGanador = false
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos = []
        },

        atacar: function () {
            let danio = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo = Math.max(this.saludMonstruo-danio, 0) 
            this.registrarEvento({ esJugador: true, text: `El jugador golpea con un ataque normal al monstruo por ${danio}`})

            if(this.verificarGanador())
                return

            this.ataqueDelMonstruo()
        },

        ataqueEspecial: function () {
            let danio = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo = Math.max(this.saludMonstruo-danio, 0) 
            this.registrarEvento({ esJugador: true, text: `El jugador golpea con un ataque especial al monstruo por ${danio}`})

            if(this.verificarGanador())
                return

            this.ataqueDelMonstruo()
        },

        curar: function () {
            this.saludJugador = Math.min(this.saludJugador+10, 100)
            this.registrarEvento({ esJugador: true, text: `El jugador se cura 10`})

            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {
            this.turnos.unshift(evento)
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo: function () {
            let danio = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador = Math.max(this.saludJugador-danio, 0)
            this.registrarEvento({ esJugador: false, text: `El monstruo lastima al jugador por ${danio}`})

            this.verificarGanador()
        },

        calcularHeridas: function (rango) {
            let min = Math.ceil(rango[0]);
            let max = Math.floor(rango[1]);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
 
        verificarGanador: function () {
            if(this.saludJugador == 0 || this.saludMonstruo == 0)
                this.hayGanador = true;
            
            return this.hayGanador
        },
 
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});