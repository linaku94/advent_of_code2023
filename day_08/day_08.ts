import * as fs from "fs";

function gcd(a: number, b: number): number {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function lcm(a: number, b: number): number {
    return (a * b) / gcd(a, b);
}

class SolutionDayEight {
    instructions: string[]
    graph: Map<string, string[]>
    locations: string[]

    constructor(filename) {
        this.readInput(filename)
    }

    readInput(filename) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        this.instructions = lines[0].split("")
        this.graph = new Map
        this.locations = []
        let pattern = new RegExp(/A$/)
        lines.slice(2, -1).forEach((line, index) => {
            let location = line.split(" = ")[0]
            this.graph.set(location, line.split("(")[1].split(")")[0].split(", "))
            if (pattern.test(location)) {
                this.locations.push(location)
            }
        })
    }

    performInstruction(location: string, instruction: string) {
        return (instruction == "L") ? this.graph.get(location)[0] : this.graph.get(location)[1]
    }

    partOne(start: string, endpattern: RegExp) {
        let counter = 0
        while (!endpattern.test(start)) {
            start = this.performInstruction(start, this.instructions[counter % this.instructions.length])
            counter += 1
        }
        console.log(`Solution Part One: ${counter}`)
        return counter
    }


    partTwo() {
        console.log(this.locations)
        let counters = this.locations.map(value => this.partOne(value, /Z$/))
        console.log(`Solution Part Two: ${counters.reduce((a, b) => {
            return lcm(a, b)
        }, 1)}`)
    }
}


const solutionDayEight = new SolutionDayEight("input.txt")
solutionDayEight.partOne("AAA", /ZZZ/)
solutionDayEight.partTwo()