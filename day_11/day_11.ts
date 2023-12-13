import * as fs from "fs";

function manhattan(a:number[], b: number[]) {
    return Math.abs(...[a[0]-b[0]])+ Math.abs(...[a[1]-b[1]])
}

class SolutionDayEleven {
    field: boolean[][]
    locations: number[][]
    xLinesToInsert: number[]
    yLinesToInsert: number[]
    constructor(filename: string) {
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        this.field = []
        this.yLinesToInsert = []
        this.xLinesToInsert = []
        lines.slice(0, -1).forEach((line, yindex) => {
            let fieldline: boolean[] = []
            for (let space of line) {
                fieldline.push(space == ".");
            }
            this.field.push(fieldline)
            if (fieldline.reduce((a,b) => a&&b)) {this.yLinesToInsert.push(yindex)}
        })
        let yDim = this.field.length
        let xDim = this.field.at(0).length
        for (let xindex=0; xindex<xDim; xindex++) {
            let insert = true
            for (let yindex:number=0; yindex<yDim; yindex++) {
                insert = insert&&this.field.at(yindex).at(xindex)
            }
            if (insert) {this.xLinesToInsert.push(xindex)}
        }
    }
    computeLocations(scale: number) {
        this.locations = []
        let xOffset = 0
        let yOffset = 0
        scale -=1
        this.field.forEach((line, lineIndex) => {
            this.yLinesToInsert.forEach((yvalue) => {yOffset+=lineIndex==yvalue?scale:0})
            line.forEach((location, locationIndex) => {
                this.xLinesToInsert.forEach((xvalue) => {xOffset+=locationIndex==xvalue?scale:0})
                if (!this.field.at(lineIndex).at(locationIndex)) {
                    this.locations.push([lineIndex+yOffset, locationIndex+xOffset])
                }
            })
            xOffset = 0
        })
    }

    getDistances() {
        let result = 0
        this.locations.forEach((location) => {
            result += this.locations.map(line => manhattan(line, location)).reduce((p, a) => p + a, 0)
        })
        return result/2
    }
    partOne() {
        let scale = 2
        this.computeLocations(scale)
        console.log(`solution part one: ${this.getDistances()}`)
    }

    partTwo() {
        let scale = 1000000
        this.computeLocations(scale)
        console.log(`solution part one: ${this.getDistances()}`)
    }

}

const solutionDayEleven = new SolutionDayEleven("input.txt")
solutionDayEleven.partOne()
solutionDayEleven.partTwo()