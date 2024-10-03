"use strict";

const roomName = "PastiBall";
const maxPlayers = 15;
const isPublic = false;
const noPlayer = true;
/*
var room = HBInit({
    public: isPublic,
	roomName: roomName,
	maxPlayers: maxPlayers,
	noPlayer: noPlayer // Remove host player (recommended!)
});

room.setDefaultStadium("Big");
room.setScoreLimit(5);
room.setTimeLimit(0);


room.onPlayerJoin = function(player) {
    room.sendAnnouncement("Hola player")
  }
*/
class GameRoom {
    constructor() {
        this.red = new Array();
        this.blue = new Array();
        this.spect = new Array();
    }

    addPlayer(id) {

    }

    deletePlayer() {

    }

    movePlayer(id, team) {

    }
}

class Player {

  #id
  #auth
  #name

  constructor(id, auth, name) {
      this.#id = id;
      this.#auth = auth;
      this.#name = name;
  }

  get id() {
      return this.#id;
  }

  get auth() {
    return this.#auth;
  }
    
  get name() {
    return this.#name;
  }
}

class List_of_players {
  #list;

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
  * Removes the element from the indicated index
  * @param {player} Player - The player's ID.
  * @returns {void}
  */
  removePlayer(index) {
    if (index >= 0 && index < this.#list.length) {
      this.#list.splice(index, 1);
    }
  }

  /**
  * If the index is in range, returns the player stored in that position
  * @param {index} int - The player's ID. Requires: needs to be in range
  * @returns {this.#list[index]}
  */
  getPlayer(index) {
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
    return this.getPlayer(index);
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
  * @param {id} int - The player's ID.
  * @returns {void}
  */
  removePlayerByID(id) {
    //Search where is the ID
    let index = this.#searchID
    //Remove the index. If there was no matches, it will be -1 and it will not delete nothing
    this.removePlayer(index)
  }

}


var lista = new List_of_players();
lista.addPlayer(new Player(1,"1", "hola"));

var lista_de_players = lista.list;

lista_de_players.push(new Player(2,"2", "Adios"));
lista.addPlayer(new Player(3,"3", "hola"));
console.log(lista.list.length)

/*<><><><><><><><><><><><><><><><><><> */

// This section is for testing only. When using this script for create a haxball server, it should be commented
//TODO: pass this to a new test
var lista = new List_of_players();
lista.addPlayer(new Player(1,"1", "hola"));

var lista_de_players = lista.list;

lista_de_players.push(new Player(2,"2", "Adios"));
lista.addPlayer(new Player(3,"3", "hola"));
console.log(lista.list.length)


//Export classes
//export {Player, List_of_players, GameRoom}

//Export functions
