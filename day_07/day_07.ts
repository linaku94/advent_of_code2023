import * as fs from "fs";

const rankMap = new Map<string, number>([
    ["A", 14],
    ["K", 13],
    ["Q", 12],
    ["J", 11],
    ["T", 10],
])

const rankMapPartTwo = new Map<string, number>(rankMap)
rankMapPartTwo.set("J",1)

class Hand {
    hand: string
    uniqueCards: string[]
    cardCounts: Map<string, number>
    type:number
    cardRanks:number

    constructor(hand: string, partTwo: Boolean) {
        this.hand = hand
        this.cardCounts = new Map
        for (let card of this.hand) {
            let updateValue = this.cardCounts.has(card) ? this.cardCounts.get(card) + 1 : 1
            this.cardCounts.set(card, updateValue)
        }
        let uniqueCards = new Set(this.hand.split(""))
        this.uniqueCards = Array.from(uniqueCards)
        if (partTwo){
            this.type = this.getTypePartTwo()
            this.cardRanks = this.getCardRanks(rankMapPartTwo)
        }
        else {
            this.type = this.getType()
            this.cardRanks = this.getCardRanks(rankMap)
        }
    }

    getCardRank(card: string, rankMap: Map<string,number>) {
        return rankMap.has(card) ? rankMap.get(card): +card
    }

    getCardRanks(rankMap){
        let cardRanks = 0
        Array.from(this.hand.split("")).forEach((card, index) => {
            cardRanks+=this.getCardRank(card, rankMap)*Math.pow(10,8-2*index)
        })
        return cardRanks
    }

    getTypePartTwo(): number {
        if (this.uniqueCards.includes("J")) {
            let replaceCard = "A"
            this.uniqueCards.forEach(card => {
                if (card == "J") {
                    return
                }
                let count = this.cardCounts.has(replaceCard)? this.cardCounts.get(replaceCard): 0
                if (this.cardCounts.get(card) >count) {
                    replaceCard = card
                    return
                }
                if (this.cardCounts.get(card) == this.cardCounts.get(replaceCard)) {
                    replaceCard = rankMapPartTwo.get(card) > rankMapPartTwo.get(replaceCard) ? card : replaceCard
                }
            })
            let bestHand = new Hand(this.hand.replace(RegExp(/J/g), replaceCard), false)
            return bestHand.type
        }
        else {
            return this.getType()
        }
    }

    getType(): number {
        switch (this.uniqueCards.length) {
            case 1: {
                return 6
            }
            case 2: {
                return Math.max(...Array.from(this.cardCounts.values())) == 4 ? 5 : 4
            }
            case 3: {
                return Math.max(...Array.from(this.cardCounts.values())) == 3 ? 3 : 2
            }
            case 4: {
                return 1
            }
            default: {
                return 0
            }
        }
    }

}

function compareTwoHands(hand1: Hand, hand2: Hand) {
        switch (hand1.type==hand2.type) {
            case true: {
                return hand1.cardRanks > hand2.cardRanks
            }
            default: {
                return hand1.type > hand2.type
            }
        }
    }

class SolutionDaySeven {
    handsToBids: Map<Hand,number>

    constructor(filename: string, partTwo?:Boolean) {
        this.handsToBids = this.readInput(filename, partTwo)
    }

    readInput(filename: string, partTwo: Boolean) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        let handsToBids = new Map<Hand,number>
        lines.slice(0,-1).forEach(value => {
            handsToBids.set(new Hand(value.split(" ")[0], partTwo), +value.split(" ")[1] )
        })
        return handsToBids
    }
    solution() {
        let sortedHands = Array.from(this.handsToBids.keys())
        sortedHands = sortedHands.sort((a, b) => (compareTwoHands(a,b)? 1: -1))
        let result = 0
        sortedHands.forEach((value, index) => {
            result += (index+1)*this.handsToBids.get(value)
        })
        console.log(`Solution Part Two: ${result}`)
    }
}

const solutionDaySevenPartOne = new SolutionDaySeven("input.txt", false)
solutionDaySevenPartOne.solution()
const solutionDaySevenPartTwo = new SolutionDaySeven("input.txt", true)
solutionDaySevenPartTwo.solution()