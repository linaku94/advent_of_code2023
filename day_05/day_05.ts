import * as fs from "fs";

interface ResourceRange {
    sourceStart: number
    targetStart: number
    size: number
}

export class ResourceMap {
    name: string
    ranges: ResourceRange[]

    constructor() {
        this.name = "";
        this.ranges = [];
    }

    getTargetResource(source: number):number {
        for (let resourceRange of this.ranges) {
            if (source >= resourceRange.sourceStart && source < resourceRange.sourceStart + resourceRange.size) {
                return resourceRange.targetStart + source - resourceRange.sourceStart;
            }
        }
        return source
    }

    getSourceResource(target:number): number {
        for (let resourceRange of this.ranges) {
            if (target >= resourceRange.targetStart && target < resourceRange.targetStart + resourceRange.size) {
                return resourceRange.sourceStart + target - resourceRange.targetStart;
            }
        }
        return target
    }

}

export function parseMapFromString(parseString: string): ResourceMap {
    let newResourceMap = new ResourceMap()
    newResourceMap.name = parseString.split(":")[0].split(" ")[0]
    for (let rangeString of parseString.split("\n").slice(1)) {
        let numbers = rangeString.split(" ").map(value => +value)
        newResourceMap.ranges.push(<ResourceRange>{
                targetStart : numbers[0],
                sourceStart : numbers[1],
                size: numbers[2],
            }
        )
    }
    return newResourceMap
}

export class SolutionDayFive {
    resourceMaps: ResourceMap[]
    seeds: number[]
    seedRanges : Map<number,number>

    constructor(inputFilename: string) {
        this.resourceMaps = []
        this.seeds = []
        this.seedRanges = new Map
        this.readInput(inputFilename)
    }
    readInput(inputFilename: string) {
        let lines = fs.readFileSync(inputFilename, "utf-8").split(/\n\n/);
        this.seeds = lines[0].split(": ")[1].split(" ").map(value => +value)
        this.seeds.forEach((seed, index) => {
            if (index%2==0) {
                this.seedRanges.set(seed, this.seeds[index + 1])
            }
        })
        for(let line of lines.slice(1)) {
            this.resourceMaps.push(parseMapFromString(line))
        }
    }

    isInSeedRange(seed: number) {
        let result = false
        this.seedRanges.forEach((range, start) => {
            if (seed >= start && seed <= start+range) {
                result = true
            }
        })
        return result
    }

    partOne() {
        let results: number[] = []
        for (let seed of this.seeds) {
            this.resourceMaps.forEach(resourceMap => {
                seed = resourceMap.getTargetResource(seed)
            })
            results.push(seed)
        }
        console.log(`solution part 1: ${Math.min(...results)}`)
    }

    partTwo() {
        for (let i=0; i<=1000000000; i++){
            let target = i
            this.resourceMaps.reverse().forEach(resourceMap => {
                target = resourceMap.getSourceResource(target)
            })
            this.resourceMaps.reverse()
            if (this.isInSeedRange(target)) {
                console.log(`solution Part 2: ${i}`)
                return i
            }
        }
    }

}

const solutionDayFive = new SolutionDayFive("input.txt")
solutionDayFive.partOne()
solutionDayFive.partTwo()
