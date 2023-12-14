import * as fs from "fs";

class SolutionDayThirteen {
    field: string[]

    logField() {
        console.log(`${this.field.join("\n")}\n`)
    }

    constructor(filename: string) {
        this.field = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach((fieldline) => {
            this.field.push(fieldline)
        })
        this.logField()
    }

    rotateClockwise() {
        let listField = this.field.map(line => line.split(""))
        listField = listField[0].map((col, colIndex) => listField.map(row => row[colIndex]));
        this.field = listField.map(line => line.reverse().join(""))
    }

    tiltToTop() {
        for (let lineIndex = 0; lineIndex < this.field.at(0).length; lineIndex++) {
            let fieldline = this.field.map(line => line.at(lineIndex))
            let emptySpot = -1
            fieldline.forEach((item, itemIndex) => {
                if (item == "." && emptySpot == -1) {
                    emptySpot = itemIndex;
                } else if (item == "#") {
                    emptySpot = -1;
                } else if (item == "O" && emptySpot != -1) {
                    fieldline[emptySpot] = item;
                    fieldline[itemIndex] = ".";
                    emptySpot += 1;
                }
            })
            this.field = this.field.map((value, index) => {
                let values = value.split("")
                values[lineIndex] = fieldline[index]
                return values.join("")
            })
        }
    }

    performCycle() {
        for (let i = 0; i < 4; i++) {
            this.tiltToTop()
            this.rotateClockwise()
        }
    }

    getLoad() {
        return this.field.map((line, index) => (line.split("O").length - 1) * (line.length - index)).reduce((prev, cur) => prev + cur)
    }

    partOne() {
        this.tiltToTop()
        console.log(`Solution Part One: ${this.getLoad()}`)
    }

    partTwo() {
        let loads = []
        let iterations = 1000000000
        for (let i = 0; i < iterations; i++) {
            if (loads.includes(this.field.join(""))) {
                console.log(i)
                break;
            }
            loads.push(this.field.join(""))
            this.performCycle()
        }
        const period = loads.length - loads.findIndex(value => value == this.field.join(""));
        for (let i = 0; i < ((iterations - loads.length) % period); i++) {
            this.performCycle()
        }
        console.log(`Solution Part Two: ${this.getLoad()}`)
    }

}

const solutionDayThirteen = new SolutionDayThirteen("input.txt")
solutionDayThirteen.partOne()
solutionDayThirteen.partTwo()
