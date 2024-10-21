class HBInit_class {
    #public; //bool
    #roomName; //String
	#maxPlayers; //bool
	#noPlayer; //bool

    //Defaults values
    #scoreLimit; //int
    #playerAdmin; //Set
    #timeLimit; //int
    #stadium; //String
    #chat; //A message's FIFO that contains at the maximium 50 elements
    #password; //Password to enter the game
    #players; //set of players
    #playersBanned; //Set of players banned
    /**
    * Create a gameRoom with the given parameters
    * @param {Object} settings - The max_players in a game for team
    * @param {String} settings.roomName - Opcional. The room name
    * @param {bool} settings.public - Opcional. If the room is public or not
    * @param {int} settings.maxPlayers - Opcional. The maxPlayers in the room
    * @param {bool} settings.noPlayer - Opcional. If the host needs to be in the server to keep running
    */
  constructor(settings) {
    if (Object.hasOwn(settings, 'roomName')) {
        this.#roomName = settings.roomName;
    } else {
        this.#roomName = "Haxball room";
    }
    if (Object.hasOwn(settings, 'playerName')) {
        this.#public = settings.public;
    } else {
        this.#public = true;
    }

    if (Object.hasOwn(settings, 'maxPlayers')) {
        this.#maxPlayers = settings.maxPlayers;
    } else {
        this.#maxPlayers = 8;
    }

    if (Object.hasOwn(settings, 'noPlayer')) {
        this.#noPlayer = settings.noPlayer;
    } else {
        this.#noPlayer = false;
    }

    if (Object.hasOwn(settings, 'password')) {
        this.#password = settings.password;
    } else {
        this.#password = null;    
    }
    
    //All of this are default values
    this.#playerAdmin = new Set(); //Set
    this.#timeLimit = 3; //int
    this.#stadium = "Classic"; //String
    this.#chat = new colaConLimit(50); //colaConLimit
}

    get public() {
        return this.#public;
    }

    get roomName() {
        return this.#roomName;
    }

    get maxPlayers() {
        return this.#maxPlayers;
    }

    get noPlayer() {
        return this.#noPlayer;
    }

    get scoreLimit() {
        return this.#scoreLimit;
    }

    /**
     * This returns the playerAdmins as a set. Avoid aliasing
     * @param {void}
     * @returns {this.#playerAdmin}
     */
    get playerAdmin() {
        return this.#playerAdmin;
    }

    get timeLimit() {
        return this.#timeLimit;
    }

    get stadium() {
        return this.#stadium;
    }

    sendChat(message, targetID) {
        this.#chat.addElement(new Message(message, targetID, 0xFFFFFF, "normal", 1))
    }

    /**
     * Function called for setting a player as an admin
     *  @param {Player} Player
     */
    setPlayerAdmin(player) {
        
    }

    setPlayerTeam(playerID, team) {}


    //
    kickPlayer(playerID, reason, ban) {
        if (ban) {
            this.#playersBanned.add(playerID);
        }
        this.onPlayerKicked()
    }
    
    clearBan(playerID) {}

    clearBans() {}

    /**
     * Sets the scoreLimit to the limit if limit's positive and non zero 
     * @param {int} limit 
     */
    setScoreLimit(limit) {
        if (limit > 0) {
            this.#scoreLimit = limit;
        }
    }

    /**
     * Sets the timeLimit to the limitInMinutes if it's positive and non zero
     * @param {int} limitInMinutes 
     */
    setTimeLimit(limitInMinutes) {
        if (limitInMinutes > 0) {
            this.#timeLimit = limitInMinutes;
        }
    }

    /**
     * Sets the stadium to the stadiumFileContents
     * @param {string} stadiumFileContents 
     */
    setCustomStadium(stadiumFileContents) {
        this.#stadium = stadiumFileContents;
    }

    setDefaultStadium(stadiumName) {
        this.#stadium = stadiumName;
    }

    setTeamsLock(locked) {}

    setTeamColors(team, angle, textColor, colors) {}

    startGame() {}

    stopGame() {}

    pauseGame() {}

    getPlayer(playerID) {}

    getScores() {}

    setPassword(pass) { 
        if (pass == undefined) {
            this.#password = null;
        } else {
            this.#password = pass; 
        }   
    }

    reorderPlayers(playerIdList, moveToTop) {}

    sendAnnouncement(msg, targetID, color, style, sound) {
        this.#chat.addElement(new Message(msg, targetID, color, style, sound));
    }

    setPlayerAvatar(playerId, avatar) {}

    onPlayerJoin(player) {}

    onPlayerLeave(player) {}

    onTeamVictory(scores) {}

    onPlayerChat(player, message) {}

    onPlayerBallKick(player) {}

    onTeamGoal(team) {}

    onGameStart(byPlayer) {}

    onGameStop(byPlayer) {}

    onPlayerAdminChange(changedPlayer, byPlayer) {}

    onPlayerTeamChange(changedPlayer, byPlayer) {}

    onPlayerKicked(kickedPlayer, reason, ban, byPlayer) {  }
    
    onGamePause(byPlayer) {}

    onGameUnpause(byPlayer) {}

    onPositionsReset() {}

    onPlayerActivity(player) {}

    onStadiumChange() {}

    onRoomLink(url) {}

    onTeamsLockChange(locked, byPlayer) {}
}

class Message {
    #msg; //string
    #targetId; //int
    #color; //int
    #style; //string. Must be betwenn this: "normal","bold","italic", "small", "small-bold", "small-italic"
    #sound; //int. Must be: 0 (no sound), 1 (normal sound), 2 (notification sound)


    /**
     * 
     * @param {string} msg 
     * @param {int} targetId 
     * @param {int} color 
     * @param {string} style 
     * @param {int} sound 
     */
    constructor(msg, targetId, color, style, sound) {
        this.#msg = msg;
        this.#targetId = targetId;
        this.#color = color;
        this.#style = style;
        this.#sound = sound;
    }

    get msg() { return this.#msg; }

    get targetID() {return this.#targetId; }

    get color() { return this.#color; }

    get style() { return this.#style;}

    get sound() { return this.#sound; }
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

    removeLastElement() {
        element = this.#cola[this.#cola.length - 1];
        this.#cola = this.#cola.slice(0, this.#cola.length - 1);
        return element;
    }
}
function HBInit(object) {
    return new HBInit_class(object)
}
export {HBInit_class, HBInit}