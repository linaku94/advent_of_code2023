import * as fs from "fs";

const pipeMap: Map<string, string> = new Map([
    ["|", "NS"],
    ["-", "OW"],
    ["L", "NO"],
    ["J", "NW"],
    ["7", "SW"],
    ["F", "SO"],
    [".", ""],
    ["S", ""]
])

const oppositeDirection: Map<string, string> = new Map ([
    ["N", "S"],
    ["O", "W"],
    ["S", "N"],
    ["W", "O"],
])

const directionMap: Map<string,number[]> = new Map ([
    ["N", [1, 0]],
    ["O", [0, -1]],
    ["S", [-1, 0]],
    ["W", [0, 1]],
])


class SolutionDayTen {
    field: string[][]
    direction: string
    position: number[]
    loopPositions: number[][]
    constructor(filename: string) {
        this.field = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        this.loopPositions = []
        lines.slice(0,-1).forEach((line, index) => {
            let fieldline = []
            let xindex = 0
            for(let node of line) {
                fieldline.push(node)
                if (node == "S") {this.position = [index, xindex]; this.loopPositions.push(this.position)}
                xindex+=1
            }
            this.field.push(fieldline)
        })
        this.direction = this.getPossibleStartDirections()
        console.log(this.direction)
        // console.log(this.field)
    }

    getCurrentPipeline(){
        return this.field.at(this.position[0]).at(this.position[1])
    }

    move() {
        this.position = this.position.map((value, index) => value-=directionMap.get(this.direction)[index])
        this.direction = pipeMap.get(this.getCurrentPipeline()).replace(oppositeDirection.get(this.direction), "")
    }

    getPossibleStartDirections() {
        // for (let direction of "WSON") {
        for (let direction of "NOSW") {
            let position = this.position
            position = position.map((value, index) => value-=directionMap.get(direction)[index])
            let possibleStartPipe = this.field.at(position[0]).at(position[1])
            if (pipeMap.get(possibleStartPipe).includes(oppositeDirection.get(direction))) {return direction}
        }
    }
    partTwo(){
        console.log(this.loopPositions)
    }

    partOne() {
        let counter = 1
        this.position = this.position.map((value, index) => value-=directionMap.get(this.direction)[index])
        this.direction = pipeMap.get(this.getCurrentPipeline()).replace(oppositeDirection.get(this.direction), "")
        while (this.getCurrentPipeline()!="S") {
            this.loopPositions.push(this.position)
            counter+=1
            this.move()
        }
        console.log(`Solution Part One: ${counter/2}`)
    }
}

const solutionDayTen = new SolutionDayTen("input.txt")
solutionDayTen.partOne()
solutionDayTen.partTwo()