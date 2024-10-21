"use strict";

import {HBInit} from "../test/HBinit.js";

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
    if (this.isGameMax()) {
      this.#addPlayerSpect(id);
    } else if (this.#red.length == this.#blue.length) {
      this.#addPlayerRed(id);
    } else if (this.#red.length >= this.#blue.length) {
      this.#addPlayerBlue(id);
    } else if (this.#red.length <= this.#blue.length) {
      this.#addPlayerRed(id);
    } else {
      this.#addPlayerSpect(id);
    }
  }

  /**
   * Add the player to the red if the length is less than the max players
   * @param {id} int - The id to add to red. If the length it's already max, it will not add it
   * @returns {void} 
   */
  #addPlayerRed(id) {
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
    if (this.#red.length < this.#max_players) {
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
    let index = this.#searchID_red(id)
    if (index >= 0 && index < this.#red.length) {
      this.#red.splice(index, 1);
    }

    //BLUE
    index = this.#searchID_blue(id)
    if (index >= 0 && index < this.#blue.length) {
      this.#blue.splice(index, 1);
    }

    //SPECT
    index = this.#searchID_red(id)
    if (index >= 0 && index < this.#spect.length) {
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
  }

  #searchID_blue(id) {
    let index = -1;
    for(let i = 0; i < this.#blue.length; i++) {
      if (this.#blue[i] == id) {
        index = i;
        break;
      }
    }
  }

  #searchID_spect(id) {
    let index = -1;
    for(let i = 0; i < this.#spect.length; i++) {
      if (this.#spect[i] == id) {
        index = i;
        break;
      }
    }
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

  /**
   * Return true iff exists the id already inside some array
   * @param {id} int - A given id to search
   * @returns {true <--> exists the id inside some array of the class}
   */
  #existID(id) {
    return this.#searchID_blue(id) != -1 || this.#searchID_red(id) != -1 || this.#searchID_spect(id) != -1;
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

  invertAFK() {
    this.#afk = !this.#afk;
  }

  set afk(afk) {
    this.#afk = afk;
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
      if (this.#list[i].id = id) {
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
      if (existsData) {
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
  #isGameMax;

  /**
   * Create a stats follow for all the people currently playing
   * @param {GameRoom} room - The room
   */
  constructor(room, players) {
    this.#list_of_teams = new Array(2);
    this.#list_of_teams[0] = new Array();
    this.#list_of_teams[1] = new Array();

    //add the stats to the red players
    for(let i = 0; i < room.red.length; i++) {
      let auth = players.getPlayerByID(room.red[i]);
      this.#list_of_teams[0].push(new PlayerStats(auth));
    }

    //Aadd the stats to the blue players
    for(let i = 0; i < room.blue.length; i++) {
      let auth = players.getPlayerByID(blue.red[i]);
      this.#list_of_teams[1].push(new PlayerStats(auth));
    }

    //Check if this game should be counted as a valid game to add stats
    this.#isGameMax = (room.isGameMax == room.red.length && room.isGameMax == room.blue.length);
  }

  setFalseIsGameMax() {
    this.#isGameMax = false;
  }

  storeData() {
    if (this.#isGameMax) {
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

  
  importLocalStorage(playerStatsToWrite) {
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
      if (this.#cola.length >= limit) {
          this.removeLastElement();
      }
      this.#cola.unshift(element);
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
room.setDefaultStadium("Big");
room.setScoreLimit(5);
room.setTimeLimit(0);

//Create variables for the game
var max_player_in_teams = 4;
var lista_de_jugadores = new List_of_players();
var sala = new GameRoom(max_player_in_teams);
var ballTouched = new colaConLimit(2);
var playerStats = new statsTeams(room, lista_de_jugadores); //stats


  //Haxball events
  room.onPlayerJoin = function(player) {
      lista_de_jugadores.addPlayer(new Player(player.id, player.auth, player.name))
      sala.addPlayer(player.id)
      console.log("El jugador " + player.name + " se unió")
      console.log(player)
    }

room.onPlayerLeave = function(player) {
  sala.deletePlayer(player.id);
  if (sala.movePlayerIfNeeded() == 1 && sala.spect.length > 0) {
    movePlayer()
  }
  console.log("The player " + player.name + " left the room")
}

room.onTeamVictory = function(scores) {

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
}

room.onTeamGoal = function(team) {


  ballTouched = new colaConLimit(2);
}

room.onGameStart = function(byPlayer) {
  playerStats = new statsTeams(room, lista_de_jugadores);
}

room.onGameStop = function(byPlayer) {


}

room.onPlayerAdminChange = function(changedPlayer, byPlayer) {

}

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
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



  const mockPlayer = { id: 1, name: "TestPlayer", team: 1 };
  room.onPlayerJoin(mockPlayer);
  room.onPlayerLeave(mockPlayer);
/*<><><><><><><><><><><><><><><><><><> */

// This section is for testing only. When using this script for create a haxball server, it should be commented
//TODO: pass this to a new test
/*
var lista = new List_of_players();
lista.addPlayer(new Player(1,"1", "hola"));

var lista_de_players = lista.list;

lista_de_players.push(new Player(2,"2", "Adios"));
lista.addPlayer(new Player(3,"3", "hola"));
console.log(lista.list.length)  
*/

//Export classes

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

//Export functions
