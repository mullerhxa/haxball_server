# DOCUMENTATION
 
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

