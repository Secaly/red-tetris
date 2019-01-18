class Game {
  constructor(name) {
    this.name = name;
    this.playerlist = [];
  }

  addPlayer(player) {
    this.playerlist.push(player);
  }

  removePlayer(player) {
    this.playerlist.filter(players => players !== player);
  }
}

export default Game;
