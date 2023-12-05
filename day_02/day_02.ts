import * as fs from "fs";

interface SetOfCubes {
    blue: number
    red: number
    green: number
}

interface Game {
    gameIndex: number
    sets: SetOfCubes[]
}

export class SolutionDayTwo {
    readInput() {
        let lines = fs.readFileSync("input.txt", "utf-8").split(/\n/);
        return lines.map((value, index) => <Game>{
            gameIndex: +index + 1,
            sets: this.parseStringToGameSets(value.split(": ")[1].split("; "))
        })
    }


    parseStringToGameSets(gameString: string[]): SetOfCubes[] {
        let result: SetOfCubes[] = []
    for (let game of gameString) {
            let matchGreen = new RegExp(/\d*\sgreen/).exec(game)
            let matchBlue = new RegExp(/\d*\sblue/).exec(game)
            let matchRed = new RegExp(/\d*\sred/).exec(game)
            result.push(
                <SetOfCubes>{
                    blue: matchBlue ? +matchBlue[0].split(" ")[0] : 0,
                    red: matchRed ? +matchRed[0].split(" ")[0] : 0,
                    green: matchGreen ? +matchGreen[0].split(" ")[0] : 0,
                }
            )
        }
        return result
    }


    findPossibleGames(games: Game[], referenceSet: SetOfCubes) {
        let result = 0
        for (let game of games) {
            let gameIsValid = true
            for (let gameSet of game.sets) {
                gameIsValid = (gameSet.blue <= referenceSet.blue && gameSet.red <= referenceSet.red && gameSet.green <= referenceSet.green && gameIsValid)
            }
            result += gameIsValid ? game.gameIndex : 0
        }
        return result
    }

    findMinimumSets(games: Game[]): SetOfCubes[] {
        let result: SetOfCubes[] = []
        for (let game of games) {
            let a =
                result.push(
                    <SetOfCubes>{
                        blue: Math.max(...game.sets.map((value) => value.blue)),
                        red: Math.max(...game.sets.map((value) => value.red)),
                        green: Math.max(...game.sets.map((value) => value.green)),
                    }
                )
        }
        return result
    }

    partOne() {
        let games = this.readInput()
        const fullCubeSet = <SetOfCubes>{
            red: 12,
            green: 13,
            blue: 14,
        }
        console.log(this.findPossibleGames(games, fullCubeSet))
    }

    partTwo() {
        const games = this.readInput()
        const minimumSets: SetOfCubes[] = this.findMinimumSets(games)
        const sum = (...arr: number[]) => [...arr].reduce((acc, val) => acc + val, 0);
        console.log(sum(...minimumSets.map((value, index) => {
            return value.blue * value.red * value.green
        })))
    }
}

const solutionDayTwo = new SolutionDayTwo()
solutionDayTwo.partOne()
solutionDayTwo.partTwo()