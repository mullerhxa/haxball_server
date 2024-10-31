  "use strict";

  //import {HBInit} from "../test/HBinit.js";

  //Create the class that models the red, blue and spect for the game
  class GameRoom {
    #red; //array of id's 
    #blue; //array of id's 
    #spect; //array of id's 
    #max_players; //int

    /**
    * Create a gameRoom with the given parameters
    * @param {max_players} int - The max_players in a game for team
    */
    constructor(max_players) {
        this.#red = new Array();
        this.#blue = new Array();
        this.#spect = new Array();
        this.#max_players = max_players;
    }

    get red() { return this.#red; }

    get blue() { return this.#blue; }

    get spect() { return this.#spect; }

    get redLength() { return this.#red.length; }

    get blueLength() { return this.#blue.length; }

    get spectLength() { return this.#spect.length; }

    get max_players() { return this.#max_players; }

    isGameMax() {
      return this.#red.length == this.#max_players && this.#blue.length == this.#max_players;
    }

    /**
    * If 
    * @param {id} int - The player's ID.
    * @returns {this.#auth}
    */
    addPlayer(id) {
      console.log("LLamado al addPlayer");
      this.showGameRoom();
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
            if (this.#red.length < this.#max_players) {
              this.#addPlayerRed(id);
            }
            break;
          case 2: //Blue
            if (this.#blue.length < this.#max_players) {
              this.#addPlayerBlue(id);
            }
            break;
        }
      }
    }

    /**
     * 
     * @returns the team that needs a player (between red (1), blue (2) or if no team needs a player spect (0))
     */
    movePlayerIfNeeded() {
      let res = 0;
      if (!this.isGameMax()) {
        if (this.#red.length == this.#blue.length) {
          res = 1;
        } else if (this.#red.length >= this.#blue.length) {
          res = 2;
        } else if (this.#red.length <= this.#blue.length) {
          res = 1;
        }
      }
      return res;
    }

    balanceTeams() {
      console.log("LLamado al balanceTeams")
      if (this.isGameMax()) {
        console.log("No hace falta balancear")
        return;
      } 
      console.log("Sacando gente que esta demás en el red...")
      while (this.#red.length > this.#max_players) {
        this.movePlayer(this.#red[this.#red.length - 1], 0);
      }
      console.log("Sacando gente que esta demás en el blue...")
      //Move some red player to the spects that are excedding to spects
      while (this.#blue.length > this.#max_players) {
        this.movePlayer(this.#blue[this.#blue.length - 1], 0);
      }

      if (this.#spect.length > 0) {
         while (!this.isGameMax() && this.#spect.length > 0) {
            this.addPlayer(this.#spect[0]); //Agarro el primero y lo agrego, asi hasta completar todos los teams o quedarme sin jugadores
         }
      } 

      console.log("Moviendo gente que haga que este mal el balanceo entre un club y el otro")
      //Ya esta lleno o no hay mas jugadores especteando
      if (this.#red.length - this.#blue.length > 1) { //Hay mas jugadores de un lado que del otro
        while (this.#red.length - this.#blue.length > 1) {
          this.movePlayer(this.#red[this.#red.length - 1], 2);
        } 
      } else if (this.#blue.length - this.#red.length > 1) {
        while (this.#blue.length - this.#red.length > 1) {
          this.movePlayer(this.#blue[this.#blue.length - 1], 1);
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

    /**
     * Return true iff exists the id already inside some array
     * @param {id} int - A given id to search
     * @returns {true <--> exists the id inside some array of the class}
     */
    #existID(id) {
      return this.#searchID_blue(id) != -1 || this.#searchID_red(id) != -1 || this.#searchID_spect(id) != -1;
    }

    showGameRoom() {
      console.log("GameRoom")
      console.log(this.#spect)
      console.log(this.#red)
      console.log(this.#blue)
    }
  }

  class Player {

    #id //int
    #auth //string
    #name //string
    #authorization
    #afk; //boolean
    /**
    * Create a player with the given parameters
    * @param {int} id - The player's ID.
    * @param {string} auth - The player's auth
    * @param {string} name - The player's name
    * @param {int} authorization - The level of authorization to make some commands
    */
    constructor(id, auth, name, authorization) {
        this.#id = id;
        this.#auth = auth;
        this.#name = name;
        this.#authorization = authorization;
        
        //default
        this.#afk = false;
    }

    /**
    * Get the Player's id
    * @returns {this.#id}
    */
    get id() {
        return this.#id;
    }

    /**
    * Get the Player's auth
    * @returns {this.#auth}
    */
    get auth() {
      return this.#auth;
    }

  /**
    * Get the Player's name
    * @returns {this.#name}
    */
    get name() {
      return this.#name;
    }

    get authorization() {
      return this.#authorization
    } 

    get afk() {
      return this.#afk;
    }

    set authorization(authorization) {
      if (authorization > 0 && authorization <= 3)  { //Authorization must be between 1 (player), 2 (mods), 3 (admims)
        this.#authorization = authorization;
      }
    }

    set afk(afk) {
      this.#afk = afk;
    }

    invertAFK() {
      this.#afk = !this.#afk;
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
      let index = this.#searchID;
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

  }

  class PlayerStats {
      auth;            //string
      matches_played;  //int
      won_matches;     //int
      lost_matches;    //int
      goals;           //int
      assists;         //int
      against_goals;   //int
      mvp;             //int

      /**
       * 
       * @param {string} auth 
       */
      constructor(auth) {
        this.auth = auth;
        if (LocalStorage.existsData(auth)) {
          let valores = LocalStorage.getData(id);
          this.matches_played = valores.matches_played;
          this.won_matches = valores.won_matches;
          this.lost_matches = valores.lost_matches;
          this.goals  = valores.goals;
          this.assists = valores.assists;
          this.against_goals = valores.against_goals;
          this.mvp = valores.mvp;
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
        let object = {
          matches_played: this.matches_played,
          won_matches: this.won_matches,
          lost_matches: this.lost_matches,
          goals: this.goals,
          assists: this.assists,
          against_goals: this.against_goals,
          mvp: this.mvp
        }
        LocalStorage.storeData(this.auth, JSON.stringify(object))
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
  }

  class statsTeams {
    #list_of_teams;
    #isGameFull;

    /**
     * Create a stats follow for all the people currently playing
     * @param {GameRoom} room - The room
     */
    constructor(room, players) {
      this.#list_of_teams = new Array(2);
      this.#list_of_teams[0] = new Array();
      this.#list_of_teams[1] = new Array();

      //add the stats to the red players
      for(let i = 0; i < room.redLength; i++) {
        let auth = players.getPlayerByID(room.red[i]);
        this.#list_of_teams[0].push(new PlayerStats(auth));
      }

      //Aadd the stats to the blue players
      for(let i = 0; i < room.blueLength; i++) {
        let auth = players.getPlayerByID(room.blue[i]);
        this.#list_of_teams[1].push(new PlayerStats(auth));
      }

      //Check if this game should be counted as a valid game to add stats
      console.log(room)
      this.#isGameFull = room.isGameMax();
    }

    setFalseIsGameMax() {
      this.#isGameFull = false;
    }

    storeData() {
      if (this.#isGameFull) {
        for(let i = 0; i < 2; i++) {
          for(let j = 0; j < this.#list_of_teams[i]; j++) {
            this.#list_of_teams[team].storePlayer();
          } 
        }
      }
    }

    addMatch(victoryTeam) {
      if (victoryTeam == 0) {
        this.addVictoryTo(0)
        this.addDefeatTo(1)
      } else if (victoryTeam == 1) {
        this.addVictoryTo(1)
        this.addDefeatTo(0)
      }

      for(let i = 0; i < 2; i++) {
        for(let j = 0; j < this.#list_of_teams[i]; j++) {
          this.#list_of_teams[team].incrementGames();
        } 
      }
    }
  /**
    * Add a victory to all the victory's team players
    * @param {int} team - The team id
    */
    addVictoryTo(team) {
      if (team >= 0 && team <= 1) {
        for(let i = 0; i < this.#list_of_teams[team]; i++) {
          this.#list_of_teams[team].incrementWonMatches();
        }
      }
      
    }

  /**
    * Add a defeat to all the defeated's team players
    * @param {int} team - The team id
    */
  addDefeatTo(team) {
    if (team >= 0 && team <= 1) {
      for(let i = 0; i < this.#list_of_teams[team]; i++) {
        this.#list_of_teams[team].incrementLoses();
      }
    }
  }

    addGoalTo(team, playerID) {

    }

    addAsisTo() {

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
    addPlayer(auth) {
      this.#dicc.set(auth, new PlayerStats(auth));
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
  }


  //Create variables for the room variable
  const roomName = "💊  gana sigue x4 - PastiBall 💊";
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
  room.setDefaultStadium("Small");
  room.setScoreLimit(2);
  room.setTimeLimit(1);

  //Create variables for the game
  var max_player_in_teams = 4;
  var lista_de_jugadores = new List_of_players();
  var sala = new GameRoom(max_player_in_teams);
  var ballTouched = new colaConLimit(2);
  var playerStats = new statsTeams(sala, lista_de_jugadores); //stats

  

    //Haxball events
    room.onPlayerJoin = function(player) {
    updateAdmins()
    
    console.log("El jugador " + player.name + " se unió")
    console.log(player)
    lista_de_jugadores.addPlayer(new Player(player.id, player.auth, player.name))
    sala.addPlayer(player.id)

    console.log("Al finalizar el player Join")        
    sala.showGameRoom();
    }

  room.onPlayerLeave = function(player) {
    console.log("The player " + player.name + " left the room")
    lista_de_jugadores.removePlayerByID(player.id);
    sala.deletePlayer(player.id);
    sala.showGameRoom();
    sala.balanceTeams();
  }

  room.onTeamVictory = function(scores) {
    let victoryTeam, defeatTeam;
    if (scores.red > scores.blue) {
      victoryTeam = 1
      defeatTeam = 2
    } else {
      victoryTeam = 2
      defeatTeam = 1
      
    }
    sala.moveTeamToSpect(defeatTeam);
    sala.moveSpectsToTeam(defeatTeam);
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
    ballTouched.addElement(player.id);
    ballTouched.showCola();
  }

  room.onTeamGoal = function(team) {


    ballTouched = new colaConLimit(2);
  }

  room.onGameStart = function(byPlayer) {
    playerStats = new statsTeams(sala, lista_de_jugadores);
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

    }

    /**
     * Shows the message with a format previously arranged
     * @param {Player} player 
     * @param {string} message 
     */
    function showMessage(player, message) {}


    function updateAdmins() { 
      // Get all players
      var players = room.getPlayerList();
      if ( players.length == 0 ) return; // No players left, do nothing.
      if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
      room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
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
