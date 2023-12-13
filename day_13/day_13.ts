import * as fs from "fs";

interface Field {
    field: string[]
}

class SolutionDayThirteen {
    fields: Field[]
    verticalIndices: number[]
    horizontalIndices: number[]

    constructor(filename: string) {
        this.fields = []
        this.verticalIndices = []
        this.horizontalIndices = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n\n/);
        lines.forEach((field, index) => {
            let fieldArray = <Field>{field: []}
            field.split(/\n/).forEach(fieldvalue => {
                if (fieldvalue == "") {
                    return
                }
                fieldArray.field.push(fieldvalue)
            })
            this.fields.push(fieldArray)

        })

    }

    findVerticalMirror(field: Field) {
        let results : number[] = []
        for (let index = 1; index < field.field.at(0).length; index++) {
            let left = field.field.map(value => value.slice(0, index))
            let right = field.field.map(value => value.slice(index).split("").reverse().join(""))
            let rightInLeft = left.map((value, leftindex) => value.slice(index - right.at(leftindex).length) == (right.at(leftindex))).reduce((a, b) => a && b)
            let LeftInRight = right.map((value, rightindex) => value.slice(right.at(rightindex).length - left.at(rightindex).length) == (left.at(rightindex))).reduce((a, b) => a && b)
            if (rightInLeft || LeftInRight) {
                results.push(index)
            }
        }
        return results.length>0?results:[0]
    }

    findHorizontalMirror(field: Field) {
        let results: number[]= []
        let fieldLength = field.field.length
        for (let index = 1; index < fieldLength; index++) {
            let top = field.field.slice(0, index);
            let bottom = field.field.slice(index,2*index).reverse();
            if (top.slice(top.length - bottom.length).map((value, topindex) => bottom.at(topindex) == value).reduce((a, b) => a && b) || bottom.map((value, bottomindex) => top.at(top.length-bottomindex) == value).reduce((a, b) => a && b)) {
                results.push(index)
            }
        }
        return results.length>0?results:[0]
    }

    partOne() {
        this.fields.forEach((field, index) => {
            let verticalMirror = this.findVerticalMirror(field).at(0)
            this.verticalIndices.push(verticalMirror);
            let horizontalMirror = this.findHorizontalMirror(field).at(0)
            this.horizontalIndices.push(horizontalMirror);

        })
        console.log(`Solution Part One: ${this.verticalIndices.reduce((prev, current)=>prev+current)+this.horizontalIndices.reduce((prev, current) => prev+current)*100}`)
    }

    partTwo() {
        let result = 0
        this.fields.forEach((field, index) => {
            try {
                field.field.forEach((fieldline, lineindex) => {
                    let chars = fieldline.split("")
                    chars.forEach((char, charindex) => {
                        chars[charindex] = chars[charindex] == "." ? "#" : "."
                        field.field[lineindex] =  chars.join("")
                        let verticalMirror = this.findVerticalMirror(field)
                        if ((verticalMirror.at(0) && !(this.verticalIndices.at(index) == verticalMirror.at(0)))||verticalMirror.length>1) {
                            this.verticalIndices[index] = verticalMirror.at(0) != this.verticalIndices.at(index)? verticalMirror.at(0): verticalMirror.at(1)
                            result += this.verticalIndices.at(index);
                            throw ("foundNewMirror")
                        }
                        let horizontalMirror = this.findHorizontalMirror(field)
                        if ((horizontalMirror.at(0) && !(this.horizontalIndices.at(index) == horizontalMirror.at(0)))||horizontalMirror.length>1) {
                            this.horizontalIndices[index] = horizontalMirror.at(0)!=this.horizontalIndices.at(index)? horizontalMirror.at(0): horizontalMirror.at(1)
                            result += this.horizontalIndices.at(index) * 100;
                            throw ("foundNewMirror")
                        }
                        chars[charindex] = chars[charindex] == "." ? "#" : "."
                        field.field[lineindex] = chars.join("")
                    })
                })
            } catch (e) {
                if (e !== "foundNewMirror") {
                    console.error(e)
                }
            }
            })
        console.log(`Solution Part Two: ${result}`)
    }
}

const solutionDayThirteen = new SolutionDayThirteen("input.txt")
solutionDayThirteen.partOne()
solutionDayThirteen.partTwo()
