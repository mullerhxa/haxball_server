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



