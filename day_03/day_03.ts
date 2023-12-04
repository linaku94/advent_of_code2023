import * as fs from "fs";

function findAllMatchIndices(pattern: RegExp, line: string) {
    pattern.lastIndex = 0
    let match = pattern.exec(line);
    let matchIndices: number[] = [];
    while(match) {
        matchIndices.push(match.index);
        match = pattern.exec(line);
    }
    return matchIndices
}

export class SolutionDayThree {
    numberArray: string[];

    constructor(inputFilename: string) {
        this.numberArray = this.readInputAndPad(inputFilename)
    }

    readInputAndPad(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/).map(value => value.padEnd(value.length+1, ".").padStart(value.length+2, "."));
        lines.push(new Array(lines[0].length+1).join("."))
        lines.unshift(new Array(lines[0].length+1).join("."))
        return lines
    }


    findValidNumbers(controlPattern: RegExp) {
        const numberRegExp = new RegExp(/\d+/, "g")
        let validNumbers = []
        let signIndicesToNeighouringNumbers = new Map<string,number[]>
        this.numberArray.slice(1, -1).forEach((line, index) => {
            index +=1;
            let match = numberRegExp.exec(line)
            while (match) {
                let matchIndices = []
                for (let idx of [index-1, index, index+1]) {
                    matchIndices = matchIndices.concat(findAllMatchIndices(controlPattern, this.numberArray[idx].slice(match.index - 1, match.index + match[0].length + 1)).map(value => [idx, value+match.index-1]))
                }
                if (matchIndices.length>0) {
                    validNumbers.push(+match[0])
                    signIndicesToNeighouringNumbers.has(matchIndices[0].toString())? signIndicesToNeighouringNumbers.get(matchIndices[0].toString()).push(+match[0]) : signIndicesToNeighouringNumbers.set(matchIndices[0].toString(), [+match[0]])
                }
                match = numberRegExp.exec(line)
            }
        })
        return {validNumbers: validNumbers, signIndicesToNeighbouringNumbers: signIndicesToNeighouringNumbers}
    }

    findGearRatios() {
        let validNumbersAndGearIndices = this.findValidNumbers(new RegExp(/\*/, "g"))
        let result: number = 0
        validNumbersAndGearIndices.signIndicesToNeighbouringNumbers.forEach((neighbourNumbers, indices) =>{
            if (neighbourNumbers.length == 2) {result += neighbourNumbers[0]*neighbourNumbers[1]}
        })
        return result
    }

    partOne() {
        console.log(`part one: ${this.findValidNumbers(new RegExp(/[^.d]/, "g")).validNumbers.reduce((sum, current) => {return sum + current}, 0)}`)
    }

    partTwo() {
        console.log(`part two ${this.findGearRatios()}`)
    }
}

const solutionDayThree = new SolutionDayThree("input.txt");
solutionDayThree.partOne()
solutionDayThree.partTwo()