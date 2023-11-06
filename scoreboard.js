class Scoreboard {
    p1score = 0;
    p2score = 0;

    constructor() {
        this.p1score = 0;
        this.p2score = 0;
    }

    getP1Score() {
        return this.p1score;
    }

    getP2Score() {
        return this.p2score;
    }

    incrementScore(player, draw) {
        if (draw) {
            this.p1score += 0.5;
            this.p2score += 0.5;
        }

        else {
            if (player === 0) {
                //player 1 has won, increment their score
                this.p1score += 1;
            }
            else if (player === 1) {
                //player 2 won, increment their score
                this.p2score += 1;
            }
        }
    }
}