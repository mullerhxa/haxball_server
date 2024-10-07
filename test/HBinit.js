class HBInit {
    #public; //bool
    #roomName; //String
	#maxPlayers; //bool
	#noPlayer; //bool

    //Defaults values
    #scoreLimit; //int
    #playerAdmin; //Set
    #timeLimit; //int
    #stadium; //String
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
    
    //All of this are default values
    this.#playerAdmin = new Set(); //Set
    this.#timeLimit = 3; //int
    this.#stadium = "Classic"; //String
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
        @
    get playerAdmin() {
        return this.#playerAdmin;
    }

    get timeLimit() {
        return this.#timeLimit;
    }

    get stadium() {
        return this.#stadium;
    }

    /**
     * Function called for setting a player as an admin
     *  @param {Player} Player
     */
    setPlayerAdmin(player) {
        
    }
}