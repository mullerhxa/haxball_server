//Create variables for the room variable
const roomName = "💊  gana sigue x4 - PastiBall 💊";
const maxPlayers = 15;
const isPublic = false;
const noPlayer = true;

var room = HBInit({
	roomName: "My room",
	maxPlayers: 16,
	noPlayer: true, // Remove host player (recommended!),
    public: false
});

//Set the room
room.setDefaultStadium("Big");
room.setScoreLimit(5);
room.setTimeLimit(0);


//Haxball events
room.onPlayerJoin = function(player) {
    room.setPlayerAdmin(player.id, true);
    room.setPlayerTeam(player.id, 1);
  }

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
    console.log("Se movio al jugador")
    console.log(changedPlayer)
    if (changedPlayer.team != 0) {
        room.setPlayerTeam(changedPlayer.id, 0);
    } else {
        room.setPlayerTeam(changedPlayer.id, 1);
    }
}
