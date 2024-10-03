import {Player} from "../src/script.js"
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