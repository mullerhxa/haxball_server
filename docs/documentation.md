# DOCUMENTATION
 
{{ createDocumentationToFunction(
    "MyFunction", 
    "This function does something important.", 
    [("arg1", "int", "The first argument"), ("arg2", "str", "The second argument")],
    ["True"],
    ["True"]) 
    | safe }}

{{  
    createDocumentationToClass(
        "GameRoom",
        "To create and keep track of all the players on the room",
        [("res", "list[int]", "array of ID's"),
        ("blue", "list[int]", "array of ID's"),
        ("spect", "list[int]", "array of ID's"),
        ("max_players", "list[int]", "the max players in red or blue")])
        | safe
}}

{{
    createDocumentationToMethod(
        "Constructor",
        "To create new objects of this type",
        [("max_players", "int", "The number of players for the teams (red and blue)")],
        ["True"],
        ["|res.red| = 0",
        "|res.blue| = 0",
        "|res.spect| = 0",
        "res.max_players = max_players"]
    ) 
    | safe
}}


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

