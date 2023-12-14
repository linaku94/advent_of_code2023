import * as fs from "fs";

class SolutionDayNine {
    lines: number[][]
    constructor(filename: string) {
        this.lines = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0,-1).forEach(value => {
            this.lines.push(value.split(" ").map(num => +num))
        })
    }

    computeFuture(values: number[]) {
        let lastValues = []
        while (values.reduce((cur, prev) => cur+prev)!=0) {
            lastValues.push(values.at(-1))
            values = values.slice(1).map((val, index) => val-values[index])
        }
        return -lastValues.reduce((res, cur) => res-cur, 0)
    }

    computePast(values: number[]) {
        let firstValues = []
        while (values.reduce((cur, prev) => cur+prev)!=0) {
            firstValues.push(values.at(0))
            values = values.slice(1).map((val, index) => val-values[index])
        }
        return firstValues.reverse().reduce((res, cur) => cur-res)
    }

    partOne() {
        console.log(`Solution Part One: ${this.lines.map(line => this.computeFuture(line)).reduce((p, c) => p+c)}`)
    }

    partTwo() {
        console.log(`Solution Part Two: ${this.lines.map(line => this.computePast(line)).reduce((p, c) => p+c)}`)
    }

}

const solutionDayNine = new SolutionDayNine("input.txt")
solutionDayNine.partOne()
solutionDayNine.partTwo()
