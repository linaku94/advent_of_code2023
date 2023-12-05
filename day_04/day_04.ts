import * as fs from "fs";
import {findAllMatches} from "../utils";


interface CardSet {
    winningNumbers: Set<number>
    ownNumbers: Set<number>
    }

function parseCardSet(setString: string[]) {
    let winningNumbers = new Set(findAllMatches(new RegExp(/\d+/, "g"), setString[0]).map(value => +value))
    let ownNumbers = new Set(findAllMatches(new RegExp(/\d+/, "g"),setString[1]).map(value => +value))
    return <CardSet>{
        winningNumbers: winningNumbers,
        ownNumbers: ownNumbers,
    }
}

export class SolutionDayFour {
    sets: Map<number, CardSet>
    numberOfSets: Map<number, number>

    constructor(filename: string) {
        this.sets = new Map
        this.numberOfSets = new Map
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0,-1).forEach((line, index) => {
            let setStrings = line.split(": ")[1].split(" | ")
            this.sets.set(index+1, parseCardSet(setStrings))
            this.numberOfSets.set(index+1, 1)
        })
    }

    intersectSets(set1: Set<number>, set2: Set<number>) {
        let lengthOfIntersection = 0
        set1.forEach(card => {
            if(set2.has(card)) {lengthOfIntersection +=1}
        })
        return lengthOfIntersection
    }

    partOne() {
        let points = 0
        this.sets.forEach((cardSet, index) => {
            let numberOfWinningCards = this.intersectSets(cardSet.ownNumbers, cardSet.winningNumbers)
            if (numberOfWinningCards>0) {points += Math.pow(2, numberOfWinningCards-1)}
        })
        console.log(`Solution Part 1: ${points}`)
    }

    partTwo() {
        this.sets.forEach((cardSet, index) => {
            let numberOfWinningCards = this.intersectSets(cardSet.ownNumbers, cardSet.winningNumbers)
            for (let i=0; i<numberOfWinningCards; i++) {
                this.numberOfSets.set(index+i+1, this.numberOfSets.get(index+i+1)+this.numberOfSets.get(index))
            }
        })
        let numberOfTotalCards = 0
        this.numberOfSets.forEach(value => numberOfTotalCards+=value)
        console.log(`Solution Part 2: ${numberOfTotalCards}`)
    }

}

const solutionDayFour = new SolutionDayFour("input.txt")
solutionDayFour.partOne()
solutionDayFour.partTwo()