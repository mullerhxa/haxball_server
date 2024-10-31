# DOCUMENTATION

<!--- Class gameRoom --->


{{  
    createDocumentationToClass(
        "GameRoom",
        "To create and keep track of all the players on the room",
        [("red", "list[int]", "array of ID's"),
        ("blue", "list[int]", "array of ID's"),
        ("spect", "list[int]", "array of ID's"),
        ("max_players", "list[int]", "the max players in red or blue")])
        | safe
}}

{{
    createDocumentationToMethod(
        "constructor",
        "To create new objects of this type",
        [("max_players", "int", "The number of players for the teams (red and blue)")],
        ["True"],
        ["|res.red| = 0",
        "|res.blue| = 0",
        "|res.spect| = 0",
        "res.max\_players = max_players"]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "isGameMax",
        "Returns if both teams are full",
        [("c", "gameRoom", "the Game Room")],
        ["True"],
        ["res=True \iff (|this.red|=this.max\_player \land |this.blue|=this.max\_player)"]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "addPlayer",
        "Adds a player to the teams that needs a player. If both teams have the exact same number of 
        players and they are less than the max_players, the player is added to red. If both the teams are full, the player is set to the spect's teams",
        [("id", "int", "The player's ID.")],
        [" ( \\forall x: \\mathbb{Z}) (0 \\leq x < |c.red| \\to_{L} c.red[x] \\neq id) ",
        " c = C_{0} (this)"],
        [" ( |c.red| = c.max\_players \\land |c.blue| = this.max\_players ) \\to \\\\
        (c.red = C_{0}.red \\land c.blue = C_{0}.blue \\land c.spect = concat(C_{0}.spect, (id))  )",
        " (|c.red| == |c.blue| \\land |c.red| < c.max\\_players) \\to  \\\\
        ( c.red = concat(C_{0}.red, (this.id)) \\land c.blue = C_{0}.blue \\land c.spect = C_{0}.spect )",
        " (|c.red| > |c.blue| \\land |c.red| \\leq  c.max\\_players) \\to \\\\
        (c.red = C_{0}.red \\land c.blue = concat(C_{0}.blue, (id)) \\land c.spect = C_{0}.spect)",
        " (|c.red| < |c.blue| \\land |c.blue| \\leq  c.max\\_players) \\to \\\\
        (c.red = concat(C_{0}.red, (id)))  \\land c.blue = C_{0}.blue \\land c.spect = C_{0}.spect"]
    ) 
    | safe
}}


{{
    createDocumentationToMethod(
        "#addPlayerRed/Blue/Spect",
        "Deletes the player from all the teams and set it to the selected (red, blue or spect)",
        [("c", "gameRoom", "the Game Room"),
        ("id", "int", "The player's id to set to the given team")],
        ["c = C_{0}"],
        ["c.red = concat(C_{0}.red, (id)) \\text{Red/blue/spect. Depends on the method that was called}",
        "c.blue = C_{0}.blue",
        "c.spect = C_{0}.spect"]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "deletePlayer",
        "Deletes the player from all the teams. It don't affect the orders in the arrays. All the elements after this are set with an index befero they were originally placed",
        [("id", "int", "The player's ID")],
        ["c = C_{0}"],
        ["(\\exists! x: \\mathbb{Z}) (0 \\leq x < |C_{0}.red| \\land_{L} C_{0}[x] = id \\land \\\\
         c.red = concat(subseq(C_{0}.red, 0, x), subseq(C_{0}.red, x + 1, |C_{0}.red|))) \\\\
         \\lor c.red = C_{0}.red \\\\
         \\text{I asume that it will not be undefined the x + 1}",
         "(\\exists! x: \\mathbb{Z}) (0 \\leq x < |C_{0}.blue| \\land_{L} C_{0}[x] = id \\land \\\\
         c.blue = concat(subseq(C_{0}.blue, 0, x), subseq(C_{0}.blue, x + 1, |C_{0}.blue|))) \\\\
         \\lor c.blue = C_{0}.blue \\\\
         \\text{I asume that it will not be undefined the x + 1}",
         "(\\exists! x: \\mathbb{Z}) (0 \\leq x < |C_{0}.spect| \\land_{L} C_{0}[x] = id \\land \\\\
         c.spect = concat(subseq(C_{0}.spect, 0, x), subseq(C_{0}.spect, x + 1, |C_{0}.spect|))) \\\\
         \\lor c.spect = C_{0}.spect \\\\
         \\text{I asume that it will not be undefined the x + 1}"
         ]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "#searchID_red/blue/spect",
        "Gets the index in the given team. If no player has this id, it returns -1",
        [("c", "gameRoom", "the Game Room"),
        ("id", "int", "The player's id")],
        ["True"],
        ["(\\exists i : \\mathbb{Z}) (0 \\leq i < |c.red| \\land_{L} c.red[i] = id\\land red = i) \\lor \\\\
        \\neg (\\exists i : \\mathbb{Z})(0 \\leq i < |c.red| \\land_{L} c.red) = id \\land res = -1"]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "movePlayer",
        "Moves the player to the team passed",
        [("c", "gameRoom", "the Game Room"),
        ("id", "int", "The player's ID"),
        ("team", "id", "The player's team")],
        ["0 \\leq team \\leq 2"],
        ["team = 0 \\to c.red = C_{0}.red \\land c.blue = C_{0}.blue \\land c.spect = concat(C_{0}.spect, (id))",
        "team = 1 \\to c.red = concat(C_{0}.red, (id)) \\land c.blue = C_{0}.blue \\land c.spect = C_{0}.spect",
        "team = 2 \\to c.red = C_{0}.red \\land c.blue = concat(C_{0}.blue, (id)) \\land c.spect = C_{0}.spect"]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "movePlayerIfNeeded",
        "",
        [("c", "gameRoom", "the Game Room"),
        ("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "#existID",
        "",
        [("c", "gameRoom", "the Game Room"),
        ("id", "int", "The player's id")],
        ["True"],
        ["res = True \\iff \\\\ 
         (\\exists i : \\mathbb{Z}) (0 \\leq i < |c.red| \\land_{L} c.red[i] = id) \\\\
        (\\exists i : \\mathbb{Z}) (0 \\leq i < |c.blue| \\land_{L} c.blue[i] = id) \\\\
        (\\exists i : \\mathbb{Z}) (0 \\leq i < |c.spect| \\land_{L} c.spect[i] = id)"]
    ) 
    | safe
}}

<!--- Class Player --->

{{  
    createDocumentationToClass(
        "Player",
        "To create and keep track of all the players on the room",
        [("res", "list[int]", "array of ID's"),
        ("blue", "list[int]", "array of ID's"),
        ("spect", "list[int]", "array of ID's"),
        ("max_players", "list[int]", "the max players in red or blue")])
        | safe
}}

{{
    createDocumentationToMethod(
        "constructor",
        "Creates the player object with the given parameters and afk set to false",
        [("id", "int", "The player's ID"), 
         ("auth", "string", "The player's auth"), 
         ("name", "string", " The player's name"), 
         ("authorization", "int", "The level of authorization to make some commands")],
        ["True"],
        ["res.id  = id \\land \\\\res.auth = auth \\land \\\\ res.name = name  \\land \\\\res.authorization = authorization  \\land \\\\res.afk = false"]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "invertAFK",
        "Set the afk state to the negative of the afk parameter",
        [("Pla", "Player", "The player object")],
        ["True"],
        ["Pla.id = Pla_{0}.id",
         "Pla.auth = Pla_{0}.auth",
         "Pla.name = Pla_{0}.name",
         "Pla.authorization = Pla_{0}.authorization",
         "Pla.afk = \\neg Pla_{0}.afk"]
    )    
    | safe
}}

{{
    createDocumentationToMethod(
        "set authorization",
        "Sets the authorization of the player to a given authorization",
        [("Pla", "Player", "The player object"),
         ("authorization", "int", "The player's authorization")],
        ["0 \\leq authorization \\leq 3"],
        ["Pla.id = Pla_{0}.id",
         "Pla.auth = Pla_{0}.auth",
         "Pla.name = Pla_{0}.name",
         "Pla.authorization = authorization"]
    )    
    | safe
}}


<!--- Class List_of_players --->

{{  
    createDocumentationToClass(
        "List_of_players",
        "To create and keep track of all the players on the room",
        [("list", "array()", "A list of the players")])
        | safe
}}

{{
    createDocumentationToMethod(
        "constructor",
        "Creates the object List_of_players",
        [],
        ["True"],
        ["res.list = \\{\\}"]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "addPlayer",
        "Adds a player to the list",
        [("list", "List_of_players", "The list of players' object"),
         ("player", "Player", "Player to add to the list")],
        ["(\\forall x: \\mathbb{Z}) (0 \\leq x < |list.list| \\to_{L} list.list[x].auth \\neq player.auth)"],
        ["list.list = concat(list_{0}.list, (player))"]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "#getPlayer",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "getPlayerByID",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "#searchID",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "#removePlayer",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "#removePlayerByID",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}


<!--- Class PlayerStats --->

{{  
    createDocumentationToClass(
        "PlayerStats",
        "To create and keep track of all the players on the room",
        [("res", "list[int]", "array of ID's"),
        ("blue", "list[int]", "array of ID's"),
        ("spect", "list[int]", "array of ID's"),
        ("max_players", "list[int]", "the max players in red or blue")])
        | safe
}}

{{
    createDocumentationToMethod(
        "constructor",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "storePlayer",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "incrementGoal",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "incrementGames",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "incrementLoses",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "incrementWonMatches",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "incrementAssists",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "incrementAgainstGoals",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "incrementMVP",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

<!--- Class statsTeams --->

{{  
    createDocumentationToClass(
        "statsTeams",
        "To create and keep track of all the players on the room",
        [("res", "list[int]", "array of ID's"),
        ("blue", "list[int]", "array of ID's"),
        ("spect", "list[int]", "array of ID's"),
        ("max_players", "list[int]", "the max players in red or blue")])
        | safe
}}

{{
    createDocumentationToMethod(
        "constructor",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "setFalseIsGameMax",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "storeData",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "addMatch",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "addVictoryTo",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "addDefeatTo",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "addGoalTo",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "addAsisTo",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

<!--- Class LocalStorage --->

{{  
    createDocumentationToClass(
        "LocalStorage",
        "To create and keep track of all the players on the room",
        [("res", "list[int]", "array of ID's"),
        ("blue", "list[int]", "array of ID's"),
        ("spect", "list[int]", "array of ID's"),
        ("max_players", "list[int]", "the max players in red or blue")])
        | safe
}}

{{
    createDocumentationToMethod(
        "existsData",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "storeData",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "getData",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "getAllLocalStorage",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "importLocalStorage",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}


<!--- Class colaConLimit --->

{{  
    createDocumentationToClass(
        "colaConLimit",
        "To create and keep track of all the players on the room",
        [("res", "list[int]", "array of ID's"),
        ("blue", "list[int]", "array of ID's"),
        ("spect", "list[int]", "array of ID's"),
        ("max_players", "list[int]", "the max players in red or blue")])
        | safe
}}

{{
    createDocumentationToMethod(
        "constructor",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "length",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "isEmpty",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "addElement",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

<!--- Functions --->

## Functions 

{{ createDocumentationToFunction(
    "setTeam", 
    "", 
    [("", "", "")],
    [""],
    [""]) 
    | safe }}

{{ createDocumentationToFunction(
    "isCommand", 
    "", 
    [("", "", "")],
    [""],
    [""]) 
    | safe }}

{{ createDocumentationToFunction(
    "makeCommand", 
    "", 
    [("", "", "")],
    [""],
    [""]) 
    | safe }}

{{ createDocumentationToFunction(
    "showMessage", 
    "", 
    [("", "", "")],
    [""],
    [""]) 
    | safe }}

## class GameRoom

### Params
| name       | type                | description                    |
| ---------- | ------------------- | ------------------------------ |
|red         | int                 | array of ID's                  | 
|blue        | int                 | array of ID's                  |
|spect       | int                 | array of ID's                  |
|max_players | int                 | the max players in red or blue |

### Methods
<span style="background-color:#111;">Uses</span>
This object is for keep a track of the players in all the room and to move them from one team to another

* #### <span style="background-color:#111;">constructor</span>

    * params: 
        + <span style="background-color:#111120">max_players : int</span>
        The number of players for the teams (red and blue)
    * pre-condition: 
        + True
    * post-condition: 
        + |res.red| = 0
        + |res.blue| = 0
        + |res.spect| = 0
        + res.max_players = max_players

* #### <span style="background-color:#111;">getters</span> 

* #### <span style="background-color:#111;">isGameMax</span>  

* #### <span style="background-color:#111;">addPlayer</span> 

* #### <span style="background-color:#111;">addPlayerRed</span>  

* #### <span style="background-color:#111;">addPlayerBlue</span> 

* #### <span style="background-color:#111;">addPlayerSpect</span>  

* #### <span style="background-color:#111;">deletePlayer</span>  

* #### <span style="background-color:#111;">searchID_red</span> 

* #### <span style="background-color:#111;">searchID_blue</span>  

* #### <span style="background-color:#111;">searchID_spect</span>  

* #### <span style="background-color:#111;">movePlayer</span>  

* #### <span style="background-color:#111;">movePlayerIfNeeded</span>  

* #### <span style="background-color:#111;">existID</span>  

