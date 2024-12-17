    "use strict";

    //import {HBInit} from "../test/HBinit.js";

    // Enums

    const Teams = {
      "RED"         : 1,
      "BLUE"        : 2,
      "SPECTATORS"  : 0
    }

    const Log = {
      "CALL_FUNCTION"   : 0,
      "PARAM_VALUE"     : 1,
      "IF_LOG"          : 2,
      "EVENT"           : 3,
      "CALL_METHOD"     : 4,
      "CHAT_MESSAGE"    : 5,
      "EXIT_FUNCTION"   : 6,
      "EXIT_EVENT"      : 7,
      "VARIABLE_VALUE"  : 8,
      "TEMP"            : 9,
      "EXIT_METHOD"     : 10
    }

    

    const Roles = {
      JUGADOR: 0,
      ADMIN: 1
  };

//Create the class that models the red, blue and spect for the game
    class Game {
      #red; //array of id's 
      #blue; //array of id's 
      #spect; //array of id's 
      #max_players; //int
      #move_activated; //boolean

      /**
      * Create a gameRoom with the given parameters
      * @param {max_players} int - The max_players in a game for team
      */
      constructor(max_players) {
        this.#red = new Array();
        this.#blue = new Array();
        this.#spect = new Array();
        this.#max_players = max_players;
        this.#move_activated = true;
    }

    get red() { return this.#red; }

    get blue() { return this.#blue; }

    get spect() { return this.#spect; }

    get redLength() { return this.#red.length; }

    get blueLength() { return this.#blue.length; }

    get spectLength() { return this.#spect.length; }

    get max_players() { return this.#max_players; }

    isGameMax() { return this.#red.length == this.#max_players && this.#blue.length == this.#max_players; }

    /**
      * Add a player when has joined
      * @param {id} int - The player's ID.
      */
    addPlayer(id) {
      //Move the player to the need place
      if (!this.#move_activated) return;

      console.log("LLamado al addPlayer");
      if (this.isGameMax()) {
        console.log("EL primer caso")
        this.#addPlayerSpect(id);
      } else if (this.#red.length == this.#blue.length) {
        console.log("EL segundo caso")
        this.#addPlayerRed(id);
      } else if (this.#red.length >= this.#blue.length) {
        console.log("EL tercero caso")
        this.#addPlayerBlue(id);
      } else if (this.#red.length <= this.#blue.length) {
        console.log("EL cuarto caso")
        this.#addPlayerRed(id);
      } else {
        console.log("EL ultimo caso")
        this.#addPlayerSpect(id);
      }
    }

    /**
       * Add the player to the red if the length is less than the max players
       * @param {id} int - The id to add to red. If the length it's already max, it will not add it
       * @returns {void} 
       */
    #addPlayerRed(id) {
      console.log("Se llamo para agregar al red");
      if (this.#red.length < this.#max_players) {
        this.deletePlayer(id);
        this.#red.push(id);
        setTeam(id, 1)
      }
    }

    /**
     * Add the player to the blue if the length is less than the max players
     * @param {id} int - The id to add to blue. If the length it's already max, it will not add it
     * @returns {void} 
     */
    #addPlayerBlue(id) {
      console.log("Se llamo para agregar al blue");
      if (this.#blue.length < this.#max_players) {
        this.deletePlayer(id);
        this.#blue.push(id);
        setTeam(id, 2)
      }
    }

  /**
     * Add the player to the spect
     * @param {id} int - The id to add to spect
     * @returns {void} 
     */
    #addPlayerSpect(id) {
      console.log("Se llamo para agregar al spect");
      this.deletePlayer(id);
      this.#spect.push(id);
      setTeam(id, 0)
    }

    /**
      * Deletes the id from all the arrays
      * @param {id} int - The player's ID.
      * @returns {this.#auth}
      */
    deletePlayer(id) {
      //RED
      console.log("Borrando el id: " + id)
      let index = this.#searchID_red(id)
      console.log("Index red is " + index )
      if (index >= 0 && index < this.#red.length) {
        console.log("Se borro en el red");
        this.#red.splice(index, 1);
      }

      //BLUE
      index = this.#searchID_blue(id)
      console.log("Index blue is " + index )
      if (index >= 0 && index < this.#blue.length) {
        console.log("Se borro en el blue");
        this.#blue.splice(index, 1);
      }

      //SPECT
      index = this.#searchID_spect(id)
      console.log("Index spect is " + index )
      if (index >= 0 && index < this.#spect.length) {
        console.log("Se borro en el spect");
        this.#spect.splice(index, 1);
      }
    }

    /**
    * If a player has that id, it will return the player object with such id
    * @returns {(EXISTS i: Z)(0 <= i < |this.#list| && this.#list.id = id && res = i) || 
    *           ((- (EXISTS i: Z)(0 <= i < |this.#list| && this.#list.id = id && res = i)) && res = -1)}
    */
    #searchID_red(id) {
      let index = -1;
      for(let i = 0; i < this.#red.length; i++) {
        if (this.#red[i] == id) {
          index = i;
          break;
        }
      }
      return index;
    }

    #searchID_blue(id) {
      let index = -1;
      for(let i = 0; i < this.#blue.length; i++) {
        if (this.#blue[i] == id) {
          index = i;
          break;
        }
      }
      return index;
    }

    #searchID_spect(id) {
      let index = -1;
      for(let i = 0; i < this.#spect.length; i++) {
        if (this.#spect[i] == id) {
          index = i;
          break;
        }
      }
      return index;
    }

    /**
      * Moves the player to a given team
      * @param {id} int - The player's ID.
      * @param {team} int - The player's team.
      */
    movePlayer(id, team) {
      if (team >= 0 && team < 3 && this.#existID(id)) {
        switch(team) {
          case 0: //Spectators
            this.#addPlayerSpect(id);
            break;
          case 1: //Red
            this.#addPlayerRed(id);
            break;
          case 2: //Blue
            this.#addPlayerBlue(id);
            break;
        }
      }
    }

    /**
     * 
     * @param {int} team - The team id. Must be between 1 and 2 
     * @returns {nothing} - Moves all the team selected to the spects
     */
    moveTeamToSpect(team) {
      if (team == 1) {
        while (this.#red.length != 0) {
          this.movePlayer(this.#red[0], 0);
        }
      } else if (team == 2) {
        while (this.#blue.length != 0) {
          this.movePlayer(this.#blue[0], 0);
        }
      }
    }

    /**
     * 
     * @param {int} team - The team's id
     */
    moveSpectsToTeam(team) {
      for(let i = 0; i < 4 && this.#spect.length > 0; i++) {
        if (team == 1) {
          this.movePlayer(this.#spect[0], 1);
        } else if (team == 2) {
          this.movePlayer(this.#spect[0], 2);
        }
      }
    }

    balanceTeams() {
      //Tengo que hacer que funcione considerando a los afks
      write("Entering game.balanceTeams", Log.CALL_METHOD);
      write(this, Log.PARAM_VALUE);
      write(diccJugadores, Log.PARAM_VALUE);
      write(this.#calcularDiferenciaEntreEquipos(), Log.PARAM_VALUE);
      write("Gente activa en spect: " + this.#calcularGenteActivaEnSpect(), Log.PARAM_VALUE);
      if (!this.#move_activated) {
        write("Leaving game.balanceTeams", Log.EXIT_METHOD);
        return;
      }
      //QUe casos hay:
      /*
        Si esta completo, no hay problema ya esta
        SI no esta completo, pero tienen una diferencia de una persona y no hay jugadores esperando, ya esta
        Si no esta completo y hay gente esperando, moverla adentro y balancear de nuevo para evitar problemas
        Si no esta completo, y tienen una diferencia de más de una persona:
          Si tienen jugadores esperando, agregalos y despues volvé a balancear
          Si no tienen jugadores esperando, move los jugadores necesarios hasta balancearlo
      */
      let cantActivos = this.#calcularGenteActivaEnSpect();
      let diferenciaEntreEquipos = this.#calcularDiferenciaEntreEquipos();

      if (this.isGameMax()) {
        write("Both teams are full", Log.EXIT_METHOD);
      }
      else if (cantActivos == 0 && diferenciaEntreEquipos <= 1) {
        write("There's no player waiting and the teams are balanced", Log.EXIT_METHOD);
      } else if (cantActivos != 0) {
        write("Caso hay jugadores activos esperando...", Log.IF_LOG);
          //Mover a los jugadores adentro
          while (cantActivos != 0 && !this.isGameMax()) {
            
            let index = 0;
            while (diccJugadores.getJugador(this.#spect[index]).afk) {
              index++;
            }
            
            console.log("El index que vamos a agregar: " + index)
            let jugador = this.#spect[index];
            this.#deleteIndexOfSpect(index);
            this.addPlayer(jugador);

            console.log(this)
            cantActivos = this.#calcularGenteActivaEnSpect();
          }
          //this.balanceTeams(); //Ya no hay jugadores esperando o esta completo el juego
      } 
      
      if (diferenciaEntreEquipos > 1) {
        write("Caso los equipos estan desbalanceados...", Log.IF_LOG);
        //Mover a los jugadores entre los equipos. Ya asumo que no hay jugadores esperando y no esta lleno
        if (this.redLength > this.blueLength) {
          while (diferenciaEntreEquipos > 1) {
            //Mover a los jugadores del red al blue hasta que se balance
            let idJugador = this.#red[this.redLength - 1];
            this.#deleteIndexOfRed(this.redLength - 1);
            this.#addPlayerBlue(idJugador)
            diferenciaEntreEquipos = this.#calcularDiferenciaEntreEquipos();
          }
        } else {
          while (diferenciaEntreEquipos > 1) {
            //Mover a los jugadores del blue al red hasta que se balance
            let idJugador = this.#blue[this.blueLength - 1];
            this.#deleteIndexOfRed(this.blueLength - 1);
            this.#addPlayerRed(idJugador);
            diferenciaEntreEquipos = this.#calcularDiferenciaEntreEquipos();
          }
        }
        //this.balanceTeams();
      }
      write("Leaving game.balanceTeams", Log.EXIT_METHOD);
    } 
    

      /**
       * Return the number of player afks in the spect
       */
    #calcularCantiadAfk() {
      let index = 0;
      this.#spect.forEach((id) => {
        if (diccJugadores.getJugador(id).afk) index++;
      })
      return index;
    }

    #calcularGenteActivaEnSpect() {
      return this.spectLength - this.#calcularCantiadAfk();
    }

    #calcularDiferenciaEntreEquipos() {
        return Math.abs(this.redLength - this.blueLength);
    }

    #deleteIndexOfSpect(index) {
      this.#spect.splice(index, 1); // 1 es la cantidad de elemento a eliminar
    }

    #deleteIndexOfRed(index) {
      this.#red.splice(index, 1); // 1 es la cantidad de elemento a eliminar
    }

    #deleteIndexOfBlue(index) {
      this.#blue.splice(index, 1); // 1 es la cantidad de elemento a eliminar
    }

    /**
     * Return true iff exists the id already inside some array
     * @param {id} int - A given id to search
     * @returns {true <--> exists the id inside some array of the class}
     */
    #existID(id) {
      return this.#searchID_blue(id) != -1 || this.#searchID_red(id) != -1 || this.#searchID_spect(id) != -1;
    }
  }

    //Class to have the list of players
    class List_of_players {
      #list; //array of players

    /**
      * Create a new player's list
      */
      constructor() {
        this.#list = new Array();
      }

    /**
      * Returns the private list with alising.
      * @returns {this.#list}
      */
      get list() {
        return this.#list;
      }

    /**
      * Add a player into the list of players to the end
      * @param {player} Player - The player's ID.
      * @returns {void}
      */
      addPlayer(player) {
        this.#list.push(player)
      }

      /**
      * If the index is in range, returns the player stored in that position
      * @param {index} int - The player's ID. Requires: needs to be in range
      * @returns {this.#list[index]}
      */
      #getPlayer(index) {
        if (index >= 0 && index < this.#list.length) {
          return this.#list[index]
        }
      }

      /**
      * If a player has that id, it will return the player object with such id
      * @param {id} int - The player's ID. Requires: needs to be in range
      * @returns {EXISTS i: Z : (0 <= i < |this.#list| && this.#list.id == id && res = this.#list[i])}
      */
      getPlayerByID(id) {
        let index = this.#searchID(id);
        return this.#getPlayer(index);
      }

    /**
      * If a player has that id, it will return the player object with such id
      * @returns {(EXISTS i: Z)(0 <= i < |this.#list| && this.#list.id = id && res = i) || 
      *           ((- (EXISTS i: Z)(0 <= i < |this.#list| && this.#list.id = id && res = i)) && res = -1)}
      */
      #searchID(id) {
        let index = -1;
        for(let i = 0; i < this.#list.length; i++) {
          if (this.#list[i].id == id) {
            index = i;
            break;
          }
        }
        return index;
      }

      /**
      * Removes the element from the indicated index
      * @param {player} Player - The player's ID.
      * @returns {void}
      */
      #removePlayer(index) {
        if (index >= 0 && index < this.#list.length) {
          this.#list.splice(index, 1);
        }
      }

      /**
      * Removes the element from the indicated index
      * @param {id} int - The player's ID.
      * @returns {void}
      */
      removePlayerByID(id) {
        //Search where is the ID
        let index = this.#searchID(id)
        //Remove the index. If there was no matches, it will be -1 and it will not delete nothing
        this.#removePlayer(index)
      }
      /**
       * Returns the auth of the player
       * @param {int} id - The player's id
       * @returns {string} The player's auth store in
       */
      getPlayerAuthByID(id) {
        //console.log("Estamos dentro del getPlayerAuth")
        let index = this.#searchID(id)
        //console.log(index);
        if (index != undefined && index != -1) {
          return this.#list[index].auth;
        } 
        return undefined;
      }

    }

    class DiccionarioJugadores {
      #jugadores

      constructor() {
        this.#jugadores = new Map();
      }

      /**
       * Creates a new pair key-value in the dictionary with the given params
       * The id must not be in the dictionary
       * @param {int} id
       * @param {PlayerStats} Player 
       */
      addJugador(id, player) {
        this.#jugadores.set(id, player);
      }

      hasJugador(id) {
        return this.#jugadores.has(id);
      }

      /**
       * Returns the player object asociatedwith the value id. the dictionary must contain the as a key id.
       * @param {int} id 
       * @returns 
       */
      getJugador(id) {
        return this.#jugadores.get(id);
      }

      deleteJugador(id) {
        this.#jugadores.delete(id);
      }
    }

    class PlayerStats {
        id;              //int
        auth;            //string
        name;            //string
        authorization;   //int
        afk;             //boolean
        matches_played;  //int
        won_matches;     //int
        lost_matches;    //int
        goals;           //int
        assists;         //int
        against_goals;   //int
        vallas;          //int
        mvp;             //int

        /**
         * 
         * @param {string} auth 
         * @param {int} id
         * @param {string} name
         */
        constructor(auth, id, name) {
          this.id = id;
          this.auth = auth;
          this.name = name;
          this.authorization = Roles.JUGADOR;
          this.afk = false;
          if (LocalStorage.existsData(auth)) {
            let valores = LocalStorage.getData(id);
            this.matches_played = valores.matches_played;
            this.won_matches = valores.won_matches;
            this.lost_matches = valores.lost_matches;
            this.goals  = valores.goals;
            this.assists = valores.assists;
            this.against_goals = valores.against_goals;
            this.mvp = valores.mvp;
            this.vallas = valores.vallas;
          } else {
            this.matches_played = 0;
            this.won_matches = 0;
            this.lost_matches = 0;
            this.goals  = 0;
            this.assists = 0;
            this.against_goals = 0;
            this.mvp = 0;
          }
        }

        storePlayer() {
          write("Entering in PlayerStats.storePlayer", Log.CALL_METHOD);
          let object = {
            matches_played: this.matches_played,
            won_matches: this.won_matches,
            lost_matches: this.lost_matches,
            goals: this.goals,
            assists: this.assists,
            against_goals: this.against_goals,
            mvp: this.mvp,
            vallas: this.vallas
          }
          LocalStorage.storeData(this.auth, JSON.stringify(object))
          write("Leaving in PlayerStats.storePlayer", Log.CALL_METHOD);
        }

        invertAFK() {
          this.afk = !this.afk;
        }
        
        incrementGoal() {
          this.goals++;
        }

        incrementGames() {
          this.matches_played++;
        }

        incrementLoses() {
          this.lost_matches++;
        }

        incrementWonMatches() {
          this.won_matches++;
        }

        incrementAssists() {
          this.assists++;
        }

        incrementAgainstGoals() {
          this.against_goals++;
        }

        incrementMVP() {
          this.mvp++;
        }

        incrementVallas() {
          this.vallas++;
        }
    }

    class estadisticasPorPartido {
      #goles // array de id
      #asistencias //array de id
      #golesEnContra //array de id

      constructor() {
        this.#goles = new Array();
        this.#asistencias = new Array();
        this.#golesEnContra = new Array();
      }

      addGoal(idGol, idAsis=null) {
        if (idAsis != null) this.#asistencias.push(idAsis);
        this.#goles.push(idGol);
      }

      addAgainstGoal(idGolEnContra) {
        this.#golesEnContra.push(idGolEnContra);
      }

      getGoles() {
        return this.#goles;
      }

      getAsistencias() {
        return this.#asistencias;
      }

      getGolesEnContra() {
        return this.#golesEnContra;
      }

      showEstadisticas() {
        console.log("Showing estadisticas del partido")
        console.log("Goles: ")
        console.log(this.#goles);
        console.log("Asistencias: ")
        console.log(this.#asistencias);
        console.log("Goles en contra: ")
        console.log(this.#golesEnContra);
      }
    }

    /*
    class matchStats {
      #goles // array de auth
      #asistencias //array de auth
      #golesEnContra //array de auth

      constructor() {
        this.#goles = new Array();
        this.#asistencias = new Array();
        this.#golesEnContra = new Array();
      }

      addGoal(authGol, authAsistencia=null) {
        if (authAsistencia != null) this.#asistencias.push(authAsistencia);
        this.#goles.push(authGol);
      }

      addAgainstGoal(authGolEnContra) {
        this.#golesEnContra.push(authGolEnContra);
      }

      getGoles() {
        return this.#goles;
      }

      getAsistencias() {
        return this.#asistencias;
      }

      getGolesEnContra() {
        return this.#golesEnContra;
      }

      showEstadisticas() {
        console.log("Showing estadisticas del partido")
        console.log("Goles: ")
        console.log(this.#goles);
        console.log("Asistencias: ")
        console.log(this.#asistencias);
        console.log("Goles en contra: ")
        console.log(this.#golesEnContra);
      }
    }

    */

    class equiposPorPartido {
      #redTeam;       // set of id
      #blueTeam;      // set of id
      #isGameFull;    // boolean

      /**
       * Initializes the values with the same id's as in the gameRoom
       * @param {GameRoom} sala
       */
      constructor(sala) {
        this.#isGameFull = sala.isGameMax();;

        this.#redTeam = new Set();
        this.#blueTeam = new Set();

        sala.red.forEach((idRed) => {
          this.#redTeam.add(idRed);
        })

        sala.blue.forEach((idBlue) => {
          this.#blueTeam.add(idBlue);
        })
      }

      

      /**
       * 
       * @param {int} id
       */
      hasID(id) {
        if (this.#redTeam.has(id)) return Teams.RED;
        if (this.#blueTeam.has(id)) return Teams.BLUE;
        return -1;
      }

      setGameFalse() {
        this.#isGameFull = false;
      }

      /**
       * Deletes the value id from both the red and blue (although it doesn't make sense to be in both at the same time)
       * @param {int} id 
       */
      deletePlayer(id) {
        this.#redTeam.delete(id);
        this.#blueTeam.delete(id);
      }

      /** 
       * Returns a set
       */
      get redTeam() {
        return this.#redTeam;
      }

      /** 
       * Returns a set
       */
      get blueTeam() {
        return this.#blueTeam;
      }

      get isGameFull() {
        return this.#isGameFull;
      }
    }

    class GoalKeeper {
      #redGk
      #blueGk
      #storeAvailable //boolean

      constructor() {
        this.#storeAvailable = true;
      }

      setValues(idGkRed, idGkBlue) {
        if (this.#storeAvailable) {
          this.#setRedGk(idGkRed);
          this.#setBlueGk(idGkBlue);
          this.#storeAvailable = false;
          write("GK red: " + this.#redGk, Log.PARAM_VALUE)
          write("GK blue: " + this.#blueGk, Log.PARAM_VALUE)
        }
      }

      #setRedGk(id) {
        this.#redGk = id;
      }

      #setBlueGk(id) {
        this.#blueGk = id;
      }

      get redGk() { return this.#redGk; }
      get blueGk() { return this.#blueGk; }
      get storeAvailable() { return this.#storeAvailable; }
    }

    class statsTeams {
      #list_of_teams;
      #isGameFull;

      /**
       * Create a stats follow for all the people currently playing
       * @param {GameRoom} room - The room
       * @param {List_of_players} players - The list of all the players
       */
      /*
      constructor(room, players) {
        this.#list_of_teams = new Array(2);
        this.#list_of_teams[0] = new Array();
        this.#list_of_teams[1] = new Array();

        //add the stats to the red players
        for(let i = 0; i < room.redLength; i++) {
          let auth = players.getPlayerAuthByID(room.red[i]);
          this.#list_of_teams[0].push(new PlayerStats(auth, room.red[i]));
        }

        //Aadd the stats to the blue players
        for(let i = 0; i < room.blueLength; i++) {
          let auth = players.getPlayerAuthByID(room.blue[i]);
          this.#list_of_teams[1].push(new PlayerStats(auth, room.blue[i]));
        }

        //Check if this game should be counted as a valid game to add stats
        console.log(room)
        this.#isGameFull = room.isGameMax();
      }
  */
      
      /**
       * Create a stats follow for all the people currently playing with their current  stats with aliasing
       * @param {GameRoom} room - The room
       * @param {List_of_players} players - The list of all the players
       */
      constructor (room, players, stats) {
        this.#list_of_teams = new Array(2);
        this.#list_of_teams[0] = new Array();
        this.#list_of_teams[1] = new Array();

        for(let i = 0; i < room.redLength; i++) {
          let auth = players.getPlayerAuthByID(room.red[i]);
          this.#list_of_teams[0].push(stats.getPlayer(auth))
        }

        for(let i = 0; i < room.blueLength; i++) {
          let auth = players.getPlayerAuthByID(room.blue[i]);
          this.#list_of_teams[1].push(stats.getPlayer(auth));
        }

        this.#isGameFull = room.isGameMax();
      }

      setFalseIsGameMax() {
        this.#isGameFull = false;
      }

      storeData() {
        console.log("LLamada a storeData")
        if (this.#isGameFull) {
          console.log("Guardando la información")
          for(let i = 0; i < 2; i++) {
            for(let j = 0; j < this.#list_of_teams[i].length; j++) {
              console.log("Guardando al jugador: ");
              console.log(this.#list_of_teams[i][j]);
              this.#list_of_teams[i][j].storePlayer();
            } 
          }
        }
        console.log("Saliendo de storeData")
      }

      addMatch(victoryTeam) {
        console.log("Se llamo al addMatch");
        //Si no era partido completo, entonces no sumo las stats
        if (!this.#isGameFull) { return; }

        console.log("El partido era completo");
        if (victoryTeam == 0) {
          console.log("La victoria era del red");
          this.addVictoryTo(0);
          this.addDefeatTo(1);
        } else if (victoryTeam == 1) {
          console.log("La victoria era del blue");
          this.addVictoryTo(1);
          this.addDefeatTo(0);
        }

        //Se agrega partidos a todos los jugadores que estaban
        for(let i = 0; i < 2; i++) {
          for(let j = 0; j < this.#list_of_teams[i]; j++) {
            this.#list_of_teams[team].incrementGames();
          } 
        }
        console.log("Se termino el addMatch");
      }
    /**
      * Add a victory to all the victory's team players
      * @param {int} team - The team id
      */
      addVictoryTo(team) {
        console.log("La lista de jugadores del partido es: ")
        console.log(this.#list_of_teams);
        console.log("Agregando victoria a: " + team)
        
        if (team >= 0 && team <= 1) {
          for(let i = 0; i < this.#list_of_teams[team].length; i++) {
            estaJug = estaIdEnSala(this.#list_of_teams[team][i].id)
            console.log(estaJug);
            if (estaJug) {
              this.#list_of_teams[team][i].incrementWonMatches();
            }
            
          }
        }
        
      }

    /**
      * Add a defeat to all the defeated's team players
      * @param {int} team - The team id
      */
    addDefeatTo(team) {
      if (team >= 0 && team <= 1) {
        for(let i = 0; i < this.#list_of_teams[team].length; i++) {
          if (estaIdEnSala(this.#list_of_teams[team][i].id)) {
            this.#list_of_teams[team][i].incrementLoses();
          }
        }
      }
    }

    /**
     * 
     * @param {int} team - Must be betwenn 0 and 1 (0 - red and 1 - blue)
     * @param {*} playerID - True
     */
      addGoalTo(team, playerID) {
        for(let i = 0; i < this.#list_of_teams[team].length; i++) {
          if (playerID == this.#list_of_teams[team][i].id) {
            this.#list_of_teams[team][i].incrementGoal();
          }
          break;
        }
      }
    /**
     * 
     * @param {int} team - ;ust be betwenn 0 and 1 (0 - red and 1 - blue)
     * @param {*} playerID - True
     */
      addAgainstGoal(team, playerID) {
        for(let i = 0; i < this.#list_of_teams[team].length; i++) {
          if (playerID == this.#list_of_teams[team][i].id) {
            this.#list_of_teams[team][i].incrementAgainstGoals();
          }
          break;
        }
      }

      /**
     * 
     * @param {int} team - ;ust be betwenn 0 and 1 (0 - red and 1 - blue)
     * @param {*} playerID - True
     */
      addAssisTo(team, playerID) {
        for(let i = 0; i < this.#list_of_teams[team].length; i++) {
          if (playerID == this.#list_of_teams[team][i].id) {
            this.#list_of_teams[team][i].incrementAssists();
          }
          break;
        }
      }

      showStatsTeams() {
        console.log("Showing statsTeams");
        for(let i = 0; i < this.#list_of_teams.length; i++) {
          console.log(this.#list_of_teams[i]);
        }

        console.log(stats)
      }
    }

    class statsPlayers {
      #dicc; //diccionary (auth - String : stats - PlayerStats)

      constructor() {
        this.#dicc = new Map();
      }

      /**
       * Add the new player to the diccionary
       * @param {string} auth - The player's auth
       */
      addPlayer(auth, id) {
        if (!this.#dicc.has(auth)) this.#dicc.set(auth, new PlayerStats(auth, id));
        
      }

      /**
       * Gets the stats for a given auth. If no auth is store, it returns undefined
       * @param {string} auth - The player's auth
       */
      getPlayer(auth) {
        if (this.#dicc.has(auth)) {
          return this.#dicc.get(auth);
        } 
        return undefined; 
      }

      /**
       * Sets the stats fro a given auth to the passed statsObhect
       * @param {string} auth - The player's auth
       * @param {PlayerStats} playerStats - The player's stats
       */
      setStats(auth, playerStats) {
        this.#dicc.set(auth, playerStats);
      }

      /**
       * Deletes from the diccionary the given auth
       * @param {string} auth - The player's auth
       */
      deletePlayer(auth) {
        this.#dicc.delete(auth);
      }
    }

    //TODO: test the class
    class LocalStorage {

      static existsData(auth) {
        return !localStorage.getItem(auth) === null
      }

      static storeData(auth, playerStats) {
        localStorage.setItem(auth, JSON.stringify(playerStats))
      }

      static getData(auth) {
        if (this.existsData(auth)) {
          return localStorage.getItem(auth)
        }
        
      }

      static getAllLocalStorage() {
        return JSON.stringify(localStorage);
      }

      
      static importLocalStorage(playerStatsToWrite) {
        var data = JSON.parse(playerStatsToWrite);
        Object.keys(data).forEach(function (k) {
          localStorage.setItem(k, data[k]);
        });
      }
    }

    class colaConLimit {
      #cola; //Cola
      #limit; //int

      constructor(limit) {
          this.#cola = new Array();
          this.#limit = limit;
      }

      length() {
          return this.#cola.length;
      }

      isEmpty() {
          return this.length() === 0;
      }

      addElement(element) {
          if (this.#cola.length >= this.#limit) {
              this.removeLastElement();
          }
          this.#cola.unshift(element);
      }

      removeLastElement() {
          this.#cola.pop();
      }

      showCola() {
        console.log("colaConLimit")
        console.log(this.#cola)
        console.log(this.#limit);
      }

      getFirstElement() {
        return this.#cola[0];
      }

      popFirstElement() {
        return this.#cola.shift();
      }
    }

    
    const map = `{"name" : "PastiBall Map",

    "canBeStored" : false,

    "width" : 765,

    "height" : 350,

    "bg" : { "type" : "normal", "width" : 500, "height" : 500, "color" : "292929" },

    "vertexes" : [
      /* 0 */ { "x" : 0, "y" : -350, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 1 */ { "x" : 0, "y" : -320, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      
      /* 2 */ { "x" : -700, "y" : -90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [-700,-80 ] },
      /* 3 */ { "x" : -735, "y" : -90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [-700,-80 ] },
      /* 4 */ { "x" : -735, "y" : 90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [-700,80 ] },
      /* 5 */ { "x" : -700, "y" : 90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [-700,80 ] },
      /* 6 */ { "x" : 700, "y" : -90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [700,-90 ] },
      /* 7 */ { "x" : 735, "y" : -90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [700,-90 ] },
      /* 8 */ { "x" : 735, "y" : 90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [700,80 ] },
      /* 9 */ { "x" : 700, "y" : 90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [700,80 ] },
      
      /* 10 */ { "x" : -700, "y" : 90, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "FFFFFF", "pos" : [-700,80 ] },
      /* 11 */ { "x" : -700, "y" : 320, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "C7C7C7" },
      /* 12 */ { "x" : -700, "y" : -90, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "FFFFFF", "pos" : [-700,-80 ] },
      /* 13 */ { "x" : -700, "y" : -320, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "C7C7C7" },
      /* 14 */ { "x" : -700, "y" : 320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "C7C7C7" },
      /* 15 */ { "x" : 700, "y" : 320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "C7C7C7" },
      /* 16 */ { "x" : 700, "y" : 90, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "pos" : [700,80 ], "color" : "FFFFFF" },
      /* 17 */ { "x" : 700, "y" : 320, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "C7C7C7" },
      /* 18 */ { "x" : 700, "y" : -320, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "C7C7C7" },
      /* 19 */ { "x" : 700, "y" : -90, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "FFFFFF", "pos" : [700,-90 ] },
      /* 20 */ { "x" : -700, "y" : -320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "color" : "C7C7C7" },
      /* 21 */ { "x" : 700, "y" : -320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "color" : "C7C7C7" },
      /* 22 */ { "x" : -706.5, "y" : 90, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "pos" : [-700,80 ], "color" : "FFFFFF" },
      /* 23 */ { "x" : -706.5, "y" : 320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "color" : "ffffff" },
      /* 24 */ { "x" : -706.5, "y" : -320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "color" : "ffffff" },
      /* 25 */ { "x" : -706.5, "y" : -90, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "pos" : [-700,-80 ], "color" : "FFFFFF" },
      /* 26 */ { "x" : 706.5, "y" : -320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "color" : "ffffff" },
      /* 27 */ { "x" : 706.5, "y" : -90, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "pos" : [700,-90 ], "color" : "FFFFFF" },
      /* 28 */ { "x" : 706.5, "y" : 90, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "pos" : [700,80 ], "color" : "FFFFFF" },
      /* 29 */ { "x" : 706.5, "y" : 320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "color" : "ffffff" },
      
      /* 30 */ { "x" : -700, "y" : -90, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "F80000" },
      /* 31 */ { "x" : -700, "y" : 90, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "F80000" },
      /* 32 */ { "x" : 700, "y" : -90, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "0000F8", "pos" : [700,-90 ] },
      /* 33 */ { "x" : 700, "y" : 90, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "0000F8" },
      /* 34 */ { "x" : -700, "y" : 280, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : -93.241608812827 },
      /* 35 */ { "x" : -480, "y" : 60, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : -93.241608812827 },
      /* 36 */ { "x" : -700, "y" : -280, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : 93.241608812827 },
      /* 37 */ { "x" : -480, "y" : -60, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : 93.241608812827 },
      /* 38 */ { "x" : 700, "y" : 280, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : 93.241608812827 },
      /* 39 */ { "x" : 480, "y" : 70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : 93.241608812827 },
      /* 40 */ { "x" : 700, "y" : -280, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : -93.241608812827 },
      /* 41 */ { "x" : 480, "y" : -70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : -93.241608812827 },
      /* 42 */ { "x" : 480, "y" : 70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : 0 },
      /* 43 */ { "x" : 480, "y" : -70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : 0 },
      /* 44 */ { "x" : 480, "y" : 1, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      /* 45 */ { "x" : 480, "y" : -1, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      /* 46 */ { "x" : 480, "y" : 3, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      /* 47 */ { "x" : 480, "y" : -3, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      /* 48 */ { "x" : 480, "y" : 2, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      /* 49 */ { "x" : -480, "y" : 1, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      /* 50 */ { "x" : -480, "y" : -1, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      /* 51 */ { "x" : -480, "y" : 3, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      /* 52 */ { "x" : -480, "y" : -3, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      /* 53 */ { "x" : -480, "y" : 2, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "curve" : 180, "color" : "C7C7C7" },
      
      /* 54 */ { "x" : -700, "y" : -90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [-700,-80 ], "vis" : false },
      /* 55 */ { "x" : -735, "y" : -90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [-700,-80 ], "vis" : false },
      /* 56 */ { "x" : -735, "y" : 90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [-700,80 ], "vis" : false },
      /* 57 */ { "x" : -700, "y" : 90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [-700,80 ], "vis" : false },
      /* 58 */ { "x" : 700, "y" : -90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [700,-90 ], "vis" : false },
      /* 59 */ { "x" : 735, "y" : -90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [700,-90 ], "vis" : false },
      /* 60 */ { "x" : 735, "y" : 90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [700,80 ], "vis" : false },
      /* 61 */ { "x" : 700, "y" : 90, "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "curve" : 0, "color" : "FFFFFF", "pos" : [700,80 ], "vis" : false },
      /* 62 */ { "x" : -765.1, "y" : 15, "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "vis" : false, "pos" : [-770.1,0 ] },
      /* 63 */ { "x" : -735, "y" : 15, "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "vis" : false, "color" : "FFFFFF" },
      /* 64 */ { "x" : -765.1, "y" : -15, "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "vis" : false, "pos" : [-770.1,0 ] },
      /* 65 */ { "x" : -735, "y" : -15, "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "vis" : false, "color" : "FFFFFF" },
      /* 66 */ { "x" : 735, "y" : -15, "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "vis" : false, "color" : "FFFFFF" },
      /* 67 */ { "x" : 765.1, "y" : -15, "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "vis" : false, "pos" : [770.1,0 ] },
      /* 68 */ { "x" : 735, "y" : 15, "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "vis" : false, "color" : "FFFFFF" },
      /* 69 */ { "x" : 765.1, "y" : 15, "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "vis" : false, "pos" : [770.1,0 ] },
      
      /* 70 */ { "x" : 0, "y" : 320, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 71 */ { "x" : 0, "y" : 350, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 72 */ { "x" : 0, "y" : 70, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "C7C7C7" },
      /* 73 */ { "x" : 0, "y" : -70, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "C7C7C7" },
      /* 74 */ { "x" : 0, "y" : 70, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "C7C7C7" },
      /* 75 */ { "x" : 0, "y" : -70, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "C7C7C7" },
      /* 76 */ { "x" : 0, "y" : -320, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "ffffff" },
      /* 77 */ { "x" : 0, "y" : 320, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "ffffff" },
      
      /* 78 */ { "x" : 0, "y" : 70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : -180 },
      /* 79 */ { "x" : 0, "y" : -70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : -180 },
      /* 80 */ { "x" : 0, "y" : 70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : 180 },
      /* 81 */ { "x" : 0, "y" : -70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : 180 },
      /* 82 */ { "x" : 0, "y" : -70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : 93.241608812827 },
      /* 83 */ { "x" : 0, "y" : 70, "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "color" : "C7C7C7", "curve" : -93.241608812827 },
      
      /* 84 */ { "x" : 0, "y" : -70, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "C7C7C7" },
      /* 85 */ { "x" : 0, "y" : -320, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "C7C7C7" },
      /* 86 */ { "x" : 0, "y" : 70, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "C7C7C7" },
      /* 87 */ { "x" : 0, "y" : 320, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "C7C7C7" },
      
      /* 88 */ { "x" : -706.5, "y" : 90, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "pos" : [-700,80 ], "color" : "FFFFFF" },
      /* 89 */ { "x" : -706.5, "y" : 320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "color" : "ffffff" },
      /* 90 */ { "x" : -706.5, "y" : -320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "color" : "ffffff" },
      /* 91 */ { "x" : -706.5, "y" : -90, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "pos" : [-700,-80 ], "color" : "FFFFFF" },
      /* 92 */ { "x" : 706.5, "y" : -320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "color" : "ffffff" },
      /* 93 */ { "x" : 706.5, "y" : -90, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "pos" : [700,-90 ], "color" : "FFFFFF" },
      /* 94 */ { "x" : 706.5, "y" : 90, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "pos" : [700,80 ], "color" : "FFFFFF" },
      /* 95 */ { "x" : 706.5, "y" : 320, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "color" : "ffffff" },
      
      /* 96 */ { "x" : -735, "y" : -350, "bCoef" : 0.5, "cMask" : ["red","blue" ] },
      /* 97 */ { "x" : -735, "y" : 350, "bCoef" : 0.5, "cMask" : ["red","blue" ] },
      /* 98 */ { "x" : 735, "y" : 350, "bCoef" : 0.5, "cMask" : ["red","blue" ] },
      /* 99 */ { "x" : 735, "y" : -350, "bCoef" : 0.5, "cMask" : ["red","blue" ] }

    ],

    "segments" : [
      { "v0" : 0, "v1" : 1, "vis" : false, "color" : "F8F8F8", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      
      { "v0" : 2, "v1" : 3, "curve" : 0, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "pos" : [-700,-80 ], "y" : -90 },
      { "v0" : 3, "v1" : 4, "curve" : 0, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "x" : -735 },
      { "v0" : 4, "v1" : 5, "curve" : 0, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "pos" : [-700,80 ], "y" : 90 },
      { "v0" : 6, "v1" : 7, "curve" : 0, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "pos" : [700,-90 ], "y" : -90 },
      { "v0" : 7, "v1" : 8, "curve" : 0, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "x" : 735 },
      { "v0" : 8, "v1" : 9, "curve" : 0, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "pos" : [700,80 ], "y" : 90 },
      
      { "v0" : 10, "v1" : 11, "vis" : true, "color" : "C7C7C7", "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -550 },
      { "v0" : 12, "v1" : 13, "vis" : true, "color" : "C7C7C7", "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -550 },
      { "v0" : 14, "v1" : 15, "vis" : true, "color" : "C7C7C7", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "y" : 240 },
      { "v0" : 16, "v1" : 17, "vis" : true, "color" : "C7C7C7", "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 550 },
      { "v0" : 18, "v1" : 19, "vis" : true, "color" : "C7C7C7", "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 550 },
      { "v0" : 20, "v1" : 21, "curve" : 0, "vis" : true, "color" : "C7C7C7", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "y" : -240 },
      { "v0" : 22, "v1" : 23, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -556.5 },
      { "v0" : 24, "v1" : 25, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -556.5 },
      { "v0" : 26, "v1" : 27, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 556.5 },
      { "v0" : 28, "v1" : 29, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 556.5 },
      
      { "v0" : 30, "v1" : 31, "curve" : 0, "vis" : true, "color" : "F80000", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : -550 },
      { "v0" : 32, "v1" : 33, "curve" : 0, "vis" : true, "color" : "0000F8", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : 550 },
      { "v0" : 34, "v1" : 35, "curve" : -93.241608812827, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line" },
      { "v0" : 36, "v1" : 37, "curve" : 93.241608812827, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line" },
      { "v0" : 35, "v1" : 37, "curve" : 0, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : -480 },
      { "v0" : 38, "v1" : 39, "curve" : 93.241608812827, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line" },
      { "v0" : 40, "v1" : 41, "curve" : -93.241608812827, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line" },
      { "v0" : 42, "v1" : 43, "curve" : 0, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : 480 },
      { "v0" : 45, "v1" : 44, "curve" : 180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : 480 },
      { "v0" : 44, "v1" : 45, "curve" : 180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : 480 },
      { "v0" : 47, "v1" : 46, "curve" : 180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : 480 },
      { "v0" : 46, "v1" : 47, "curve" : 180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : 480 },
      { "v0" : 50, "v1" : 49, "curve" : 180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : -480 },
      { "v0" : 49, "v1" : 50, "curve" : 180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : -480 },
      { "v0" : 52, "v1" : 51, "curve" : 180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : -480 },
      { "v0" : 51, "v1" : 52, "curve" : 180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : -480 },
      
      { "v0" : 54, "v1" : 55, "curve" : 0, "vis" : false, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "pos" : [-700,-80 ], "y" : -90 },
      { "v0" : 55, "v1" : 56, "curve" : 0, "vis" : false, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "x" : -735 },
      { "v0" : 56, "v1" : 57, "curve" : 0, "vis" : false, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "pos" : [-700,80 ], "y" : 90 },
      { "v0" : 58, "v1" : 59, "curve" : 0, "vis" : false, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "pos" : [700,-90 ], "y" : -90 },
      { "v0" : 59, "v1" : 60, "curve" : 0, "vis" : false, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "x" : 735 },
      { "v0" : 60, "v1" : 61, "curve" : 0, "vis" : false, "color" : "FFFFFF", "bCoef" : 0.2, "cMask" : ["red","blue","ball" ], "trait" : "goalPost", "pos" : [700,80 ], "y" : 90 },
      { "v0" : 62, "v1" : 63, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "y" : 15 },
      { "v0" : 64, "v1" : 65, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "y" : -15 },
      { "v0" : 66, "v1" : 67, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "y" : -15 },
      { "v0" : 68, "v1" : 69, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 0.5, "cMask" : ["red","blue" ], "trait" : "goalPost", "y" : 15 },
      
      { "v0" : 70, "v1" : 71, "vis" : false, "color" : "F8F8F8", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      { "v0" : 72, "v1" : 73, "curve" : 179.42829117403, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "curveF" : 0.0049891420830909 },
      { "v0" : 75, "v1" : 74, "curve" : 180, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "curveF" : 6.1232339957368e-17 },
      
      { "v0" : 78, "v1" : 79, "curve" : -180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : 0 },
      { "v0" : 80, "v1" : 81, "curve" : 180, "vis" : true, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["wall" ], "trait" : "line", "x" : 0 },
      
      { "v0" : 85, "v1" : 84, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      { "v0" : 86, "v1" : 87, "color" : "C7C7C7", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      
      { "v0" : 88, "v1" : 89, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -556.5 },
      { "v0" : 90, "v1" : 91, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -556.5 },
      { "v0" : 92, "v1" : 93, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 556.5 },
      { "v0" : 94, "v1" : 95, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 556.5 },
      
      { "v0" : 96, "v1" : 97, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 0.5, "cMask" : ["red","blue" ], "x" : -735 },
      { "v0" : 98, "v1" : 99, "curve" : 0, "vis" : false, "color" : "ffffff", "bCoef" : 0.5, "cMask" : ["red","blue" ], "x" : 735 }

    ],

    "planes" : [
      { "normal" : [0,1 ], "dist" : -350, "bCoef" : 0.1 },
      { "normal" : [-1,0 ], "dist" : -765.1, "bCoef" : 0.1 },
      { "normal" : [0,-1 ], "dist" : -320, "cMask" : ["ball" ] },
      { "normal" : [0,-1 ], "dist" : -350, "bCoef" : 0.1 },
      { "normal" : [1,0 ], "dist" : -765.1, "bCoef" : 0.1 },
      { "normal" : [0,1 ], "dist" : -320, "cMask" : ["ball" ] }

    ],

    "goals" : [
      { "p0" : [-707.5,-90 ], "p1" : [-707.5,90 ], "team" : "red", "color" : "FFFFFF" },
      { "p0" : [707.5,90 ], "p1" : [707.5,-90 ], "team" : "blue", "color" : "FFFFFF" }

    ],

    "discs" : [
      { "radius" : 0.01, "invMass" : 0, "pos" : [-765.1,0 ], "color" : "000000", "bCoef" : 440, "vis" : true, "x" : -770.1 },
      { "radius" : 0.1, "invMass" : 0, "pos" : [765.1,0 ], "color" : "000000", "bCoef" : 440, "x" : 770.1 },
      
      { "radius" : 5.5, "invMass" : 0, "pos" : [-700,90 ], "color" : "dba914", "trait" : "goalPost", "y" : 90 },
      { "radius" : 5.5, "invMass" : 0, "pos" : [-700,-90 ], "color" : "dba914", "trait" : "goalPost", "y" : -85, "x" : -560 },
      { "radius" : 5.5, "invMass" : 0, "pos" : [700,90 ], "color" : "dba914", "trait" : "goalPost", "y" : 90 },
      { "radius" : 5.5, "invMass" : 0, "pos" : [700,-90 ], "color" : "dba914", "trait" : "goalPost", "y" : -85, "vis" : true }

    ],

    "playerPhysics" : {
      "bCoef" : 0.1,
      "acceleration" : 0.11,
      "kickingAcceleration" : 0.083,
      "kickStrength" : 5,
      "radius" : 15,
      "invMass" : 0.5,
      "damping" : 0.96,
      "cGroup" : [ "red", "blue"
      ],
      "gravity" : [ 0, 0
      ],
      "kickingDamping" : 0.96,
      "kickback" : 0

    },

    "ballPhysics" : {
      "radius" : 6.25,
      "bCoef" : 0.4,
      "invMass" : 1.5,
      "color" : "FEBA01",
      "cMask" : [ "all"
      ],
      "damping" : 0.99,
      "gravity" : [ 0, 0
      ],
      "cGroup" : [ "ball"
      ]

    },

    "spawnDistance" : 200,

    "traits" : {
      

    },

    "joints" : [
      

    ],

    "redSpawnPoints" : [
      [ -400, 0
      ]

    ],

    "blueSpawnPoints" : [
      [ 400, 0
      ]

    ],

    "cameraWidth" : 0,

    "cameraHeight" : 0,

    "maxViewWidth" : 0,

    "cameraFollow" : "ball",

    "kickOffReset" : "partial"
  }`;


    //Create variables for the room variable
    const roomName = "💊  gana sigue x4 - PastiBall 💊";
    const claveAdmin = "ancelotti";
    const maxPlayers = 15;
    const isPublic = false;
    const noPlayer = true;

    var room = HBInit({
      public: isPublic,
      roomName: roomName,
      maxPlayers: maxPlayers,
      noPlayer: noPlayer // Remove host player (recommended!)
    });

    //Set the room
    room.setCustomStadium(map);
    room.setScoreLimit(2);
    room.setTimeLimit(1);

    //Create variables for the game

    var set_console_log = new Set([Log.CALL_FUNCTION, 
                                   Log.PARAM_VALUE, 
                                   Log.IF_LOG, 
                                   Log.EVENT, 
                                   Log.CALL_METHOD, 
                                   Log.CHAT_MESSAGE, 
                                   Log.EXIT_FUNCTION,
                                   Log.EXIT_EVENT,
                                   Log.VARIABLE_VALUE,
                                   Log.TEMP,
                                   Log.EXIT_METHOD
    ]);

    var max_player_in_teams = 2;
    var sala = new Game(max_player_in_teams);
    var ballTouched = new colaConLimit(2);
    var estadisticasPartido = new estadisticasPorPartido();
    var equiposPartido = new equiposPorPartido(sala);
    var diccJugadores = new DiccionarioJugadores();
    var gks = new GoalKeeper();


    var lista_de_jugadores = new List_of_players();
    
    
    var playerStats = new statsTeams(sala, lista_de_jugadores); //stats
    var stats = new statsPlayers();
    //var estadisticasDelPartido = new matchStats();

    //Haxball events
    room.onPlayerJoin = function(player) {    
      write("Entrando en room.onPlayerJoin", Log.EVENT);
      write(player, Log.PARAM_VALUE);
      write(sala, Log.VARIABLE_VALUE);
      write(diccJugadores, Log.VARIABLE_VALUE);

      diccJugadores.addJugador(player.id, new PlayerStats(player.auth, 
                                                     player.id,
                                                     player.name));
      console.log("El diccJugadores es: ")
      console.log(diccJugadores);
      sala.addPlayer(player.id);

      write(diccJugadores.getJugador(player.id), Log.VARIABLE_VALUE);
      write("Saliendo de room.onPlayerJoin", Log.EXIT_EVENT);
    }

    room.onPlayerLeave =  function(player) {
      write("Entrando en room.onPlayerLeave", Log.EVENT);
      write(player, Log.PARAM_VALUE);

      diccJugadores.deleteJugador(player.id);
      sala.deletePlayer(player.id);
      sala.balanceTeams();

      if (sala.isGameMax()) {
        equiposPartido.setGameFalse();
      }
      write("Saliendo de room.onPlayerLeave", Log.EXIT_EVENT);
    }

    room.onTeamVictory = async function(scores) { 
      write("Entrando en room.onTeamVictory", Log.EVENT);
      let victoryTeam = getVictory(scores), defeatTeam = getLoser(scores);

      //Sumando estadisticacas de goles, asistencas y goles en contra

      if (equiposPartido.isGameFull) {
        estadisticasPartido.getGoles().forEach((idGoles) => {
          let esta = estabaIdJugando(idGoles);
          if (esta != -1) {
            
            let stats = diccJugadores.getJugador(idGoles)
            console.log(stats);
            stats.incrementGoal();
          }
        })
  
        estadisticasPartido.getAsistencias().forEach((idAsis) => {
          let esta = estabaIdJugando(idAsis);
          if (esta != -1) {
            diccJugadores.getJugador(idAsis).incrementAssists();
          }
        })
  
        estadisticasPartido.getGolesEnContra().forEach((idGolesEnContra) => {
          let esta = estabaIdJugando(idGolesEnContra);
          if (esta != -1) {
            diccJugadores.getJugador(idGolesEnContra).incrementAgainstGoals();
          }
        })
  
        //Sumando a todos los que jugadores 1 partido y si ganaron o perdieron
        equiposPartido.redTeam.forEach((jugador) => {
          let stats = diccJugadores.getJugador(jugador)
          stats.incrementGames();
          if (victoryTeam == Teams.RED) {
            stats.incrementWonMatches();
          } else {
            stats.incrementLoses();
          }
        })
  
        equiposPartido.blueTeam.forEach((jugador) => {
          let stats = diccJugadores.getJugador(jugador)
          stats.incrementGames();
          if (victoryTeam == Teams.BLUE) {
            stats.incrementWonMatches();
          } else {
            stats.incrementLoses();
          }
        })

        //Sumando vallas:
        if (scores.red == 0) {
          diccJugadores.getJugador(gks.redGk).incrementVallas();
        }
        else if (scores.blue == 0) {
          diccJugadores.getJugador(gks.blueGk).incrementVallas();
        }
  
        equiposPartido.blueTeam.forEach((jugador) => {
          diccJugadores.getJugador(jugador).storePlayer();
        })
  
        equiposPartido.redTeam.forEach((jugador) => {
          diccJugadores.getJugador(jugador).storePlayer();
        })
      }
      

      //Moviendo a los perdedores
      sala.moveTeamToSpect(defeatTeam);
      await sleep(2000); //Esperamos 2 segundos para seguir
      sala.moveSpectsToTeam(defeatTeam);

      write("Saliendo de room.onTeamVictory", Log.EXIT_EVENT);
    }

    room.onPlayerChat = function(player, message) {
      if (isCommand(player, message)) {
        makeCommand(player, message);
      } else {
        showMessage(player, message);
      }
      return false;
    }

    room.onPlayerBallKick = function(player) {
      write("Entrando en room.onPlayerBallKick", Log.EVENT);
      ballTouched.addElement(player.id);
      console.log(player.position);
      //Verificamos si se toco alguna vez
      if (gks.storeAvailable) {
        //Get which player is the most away
      
        //console.log(player.position);
        let gkRed = null;
        let gkBlue = null;
        if (sala.redLength > 0) {
          let redPlayer = sala.red;
          let max = Math.abs(room.getPlayer(redPlayer[0]).position.x);
          gkRed = redPlayer[0];
          redPlayer.forEach((id) => {
            if (Math.abs(room.getPlayer(id).position.x) > max) {
               max = Math.abs(room.getPlayer(id).position.x);
               gkRed = id;
              }
          })
        }

        if (sala.blueLength > 0) {
          let bluePlayer = sala.blue;
          let max = Math.abs(room.getPlayer(bluePlayer[0]).position.x);
          gkBlue = bluePlayer[0];
          bluePlayer.forEach((id) => {
            if (Math.abs(room.getPlayer(id).position.x) > max) {
               max = Math.abs(room.getPlayer(id).position.x);
               gkBlue = id;
              }
          })
        }

        gks.setValues(gkRed, gkBlue);
        
      }

      write("Saliendo de room.onPlayerBallKick", Log.EXIT_EVENT);
      //ballTouched.showCola();
    }

    room.onTeamGoal = function(team) {
      write("Entrando en room.onTeamGoal", Log.EVENT);
      //ADD to sum the goals
      //Add a veriication to avoid any kind of execption 
      console.log("Estando en room.onTeamGoal")
      if (ballTouched.isEmpty()) {
        console.log("Saliendo del room.onTeamGoal");
        return; 
      }

      let idGol = ballTouched.popFirstElement();
      let idAsistencia = ballTouched.popFirstElement() ?? null;
      
      let teamPlayerGoal = room.getPlayer(idGol).team ?? null;
      let teamPlayerAsistencia = idAsistencia != null ? room.getPlayer(idAsistencia).team : null;
      
      //Obtengamos cual es su auth
      let authGol = lista_de_jugadores.getPlayerAuthByID(idGol);
      let authAsistencia = idAsistencia != null ? lista_de_jugadores.getPlayerAuthByID(idAsistencia) : null;
      
      if (teamPlayerGoal == team && teamPlayerGoal == teamPlayerAsistencia) {
        if (authGol == authAsistencia) {
          estadisticasPartido.addGoal(idGol);
        } else {
          estadisticasPartido.addGoal(idGol, idAsistencia);
        }
      } else if (teamPlayerGoal == team) {
        estadisticasPartido.addGoal(idGol);
      } else if (teamPlayerGoal != team) {
        estadisticasPartido.addAgainstGoal(idGol);
      }

      estadisticasPartido.showEstadisticas();
      write("Saliendo de room.onTeamGoal", Log.EXIT_EVENT);
    }

    room.onGameStart = function(byPlayer) {
      write("Entrando en room.onTeamGoal", Log.EVENT);
      estadisticasPartido = new estadisticasPorPartido();
      equiposPartido = new equiposPorPartido(sala);
      ballTouched = new colaConLimit(2);
      gks = new GoalKeeper();
      write("Saliendo de room.onTeamGoal", Log.EXIT_EVENT);
    }

    room.onGameStop = function(byPlayer) {


    }

    room.onPlayerAdminChange = function(changedPlayer, byPlayer) {

    }

    room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
      sala.movePlayer(changedPlayer.id)
      sala.balanceTeams();

    }

    room.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer) {

    }

    room.onGamePause = function(byPlayer) {

    }

    room.onGameUnpause = function(byPlayer) {

    }

    room.onPlayerReset = function() {

    }

    room.onPlayerActivity = function(player) {

    }

    room.onStadiumChange = function(newStadiumName, byPlayer) {

    }

    room.onGameLink = function(url) {

    }

    room.onTeamsLockChange = function(locked, byPlayer) {

    }

    //<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // Functions
      function setTeam(id, team) {
        room.setPlayerTeam(id, team);
        console.log("Se cambió al jugador con el id" + id + " al team " + team)
      }

      /**
       * Returns true iff message has the format of a command
       * @param {Player} player 
       * @param {string} message 
       */
      function isCommand(player, message) {
        return message.charAt(0) === '!';
      } 

      /**
       * Makes the command that is in the message. If it's not an existing command, it will make nothing
       * @param {Player} player 
       * @param {string} message 
       */
      function makeCommand(player, message) {
        const words = message.slice(1).split(' ');
        //Generales
        switch(words[0]) {
          case "afk":
            if (player.team == 0) {
              diccJugadores.getJugador(player.id).invertAFK();
              sala.balanceTeams();
              room.sendAnnouncement("Ahora estas " + diccJugadores.getJugador(player.id).afk, player.id)
            } else {
              room.sendAnnouncement("No podes ponerte afk mientras jugas", player.id);
            }
            break;
          case "stateAFK":
            room.sendAnnouncement("El estado afk es: " + diccJugadores.getJugador(player.id).afk)
            break;
          case "teams":

            break;
          case "stats":

            break;
          case "help":

            break;
          case "":

            break;
          case "":

            break;
          case "":

            break;
          case "":
            break;
        }

        if (tienePermisos) { //tiene permisos necesarios
          switch(words[0]) {
            case "login":
              if (words[1] === claveAdmin) {
                room.setPlayerAdmin(player.id, true);
                room.sendAnnouncement("Se le otorgó permisos de admin a: " + player.name);
              } else {
                room.sendAnnouncement("Contraseña incorrecta. Intente nuevamente")
              }
              break;
            case "":
    
              break;
            case "":
    
              break;
            case "":
    
              break;
            case "":
    
              break;
            case "":
    
              break;
            case "":
    
              break;
            case "":
              break;
          }
        }
      }

      function tienePermisos(id) {
        return lista_de_jugadores.getPlayerByID(id).authorization > 0;
      }


      
      function estaIdEnSala(id) {
        return diccJugadores.hasJugador(id);
      }

      function estabaIdJugando(id) {
        return equiposPartido.hasID(id);
      }

      /**
       * Shows the message with a format previously arranged
       * @param {Player} player 
       * @param {string} message 
       */
      function showMessage(player, message) {
        room.sendAnnouncement(player.name + ": " + message);
      }

      function updateAdmins() { 
        // Get all players
        var players = room.getPlayerList();
        if ( players.length == 0 ) return; // No players left, do nothing.
        if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
        room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
      }

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      function getVictory(scores) {
        return scores.red > scores.blue ? Teams.RED : Teams.BLUE;
      }

      function getLoser(scores) {
        return scores.red < scores.blue ? Teams.RED : Teams.BLUE;
      }


      function write(message, value) {
        if (set_console_log.has(value)) {
          console.log(message);
        }
      } 


    /*<><><><><><><><><><><><><><><><><><> */

    // This section is for testing only. When using this script for create a haxball server, it should be commented

    //Export classes
  /*
    export {
      Player, 
      List_of_players, 
      GameRoom,
      room,
      LocalStorage,
      isCommand,
      makeCommand,
      showMessage

    }
  */   
    //Export functions
