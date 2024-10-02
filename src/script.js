const roomName = "PastiBall";
const maxPlayers = 15;
const public = false;
const noPlayer = true;

var room = HBInit({
    public: public,
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
    constructor(id, auth, name) {
        this.id = id;
        this.auth = auth;
        this.name = name;
    }

    get id() {
        return this.id;
      }

    get auth() {
      return this.auth;
    }
    
    get name() {
      return this.name;
    }
}

