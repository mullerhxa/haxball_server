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
        [],
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
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "deletePlayer",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "#searchID_red/blue/spect",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "movePlayer",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "movePlayerIfNeeded",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "#existID",
        "",
        [("", "", "")],
        [""],
        [""]
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
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}

{{
    createDocumentationToMethod(
        "invertAFK",
        "",
        [("", "", "")],
        [""],
        [""]
    ) 
    | safe
}}


<!--- Class List_of_players --->

{{  
    createDocumentationToClass(
        "List_of_players",
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
        "addPlayer",
        "",
        [("", "", "")],
        [""],
        [""]
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

