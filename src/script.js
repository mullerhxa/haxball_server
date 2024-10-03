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
  constructor() {
    this._list = new Array();
  }

  this

}

/*<><><><><><><><><><><><><><><><><><> */
// This section is for testing only. When using this script for create a haxball server, it should be commented

//Export classes
export {Player, List_of_players, GameRoom}

//Export functions
