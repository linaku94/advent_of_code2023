import * as fs from "fs";

export class SolutionDayOne {

    readInput() {
        return fs.readFileSync("input.txt", "utf-8").split(/\n/);
    }

    findAllMatches(pattern: RegExp, line: string) {
        let match = pattern.exec(line);
        let matches: string[] = [];
        while(match) {
            matches.push(match[0]);
            match = pattern.exec(line);
        }
        return matches
    }

    getCalibrationValue(numbers: string[]): number {
        return this.stringToNumber(numbers.at(0))*10 + this.stringToNumber(numbers.at(-1));
    }

    stringToNumber(stringNumber: string): number {
        const numberLiterals = new Map([
            ["one",1],["two",2],["three",3],["four",4],["five",5],["six",6],["seven",7],["eight",8],["nine",9],["zero",0]
        ])
        return numberLiterals.has(stringNumber)? (numberLiterals.get(stringNumber)): (+stringNumber)
    }

    computeSolution(pattern: RegExp) {
        const numbersInLines: string[][] = this.readInput().map((value: string, index: number) => {return this.findAllMatches(pattern, value)});
        const calibrationValues: number[] = numbersInLines.map((value: string[], index: number) => {return this.getCalibrationValue(value)});
        return calibrationValues.reduce((sum: number, p: number) => sum + p );
    }

    partOne() {
        const patternPartOne: RegExp = new RegExp(/\d/, "g",);
        return this.computeSolution(patternPartOne);
    }

    partTwo() {
        const patternPartTwo: RegExp = new RegExp(/(?=(one|two|three|four|five|six|seven|eight|nine|zero|\d))/, "g");
        return this.computeSolution(patternPartTwo);
    }
}

const solutionDayOne = new SolutionDayOne();
console.log(solutionDayOne.partOne());
console.log(solutionDayOne.partTwo());

