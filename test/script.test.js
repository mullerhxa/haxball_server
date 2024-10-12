import {HBinit} from "./HBinit.js";
import {Player, isCommand} from "../src/script.js";

import { describe, it, expect } from "vitest";

describe('Player Class', () => {
  it('should store the id, auth, and name passed to the constructor', () => {
    const id = 1;
    const auth = 'auth_de_ejemplo';
    const name = 'Player1';
    let player;
    player = new Player(id, auth, name)
    console.log(player)
    expect(player.id).toBe(id);
    expect(player.auth).toBe(auth);
    expect(player.name).toBe(name);
  });
});

describe('isCommand', () => {
  it('should return true iff the first letter in this string is !', () => {
    expect(isCommand(new Player(1, "hola", "player1", 1), "mensaje que no es comando")).toBe(false)
    expect(isCommand(new Player(1, "hola", "player1", 1), "!mensaje que sí es comando")).toBe(true)
    expect(isCommand(new Player(1, "hola", "player1", 1), "!")).toBe(true)
    expect(isCommand(new Player(1, "hola", "player1", 1), "")).toBe(false)
    expect(isCommand(new Player(1, "hola", "player1", 1), "hola")).toBe(false)
  });
})

