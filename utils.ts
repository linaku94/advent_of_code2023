export function findAllMatches(pattern: RegExp, line: string) {
    let match = pattern.exec(line);
    let matches: string[] = [];
    while(match) {
        matches.push(match[0]);
        match = pattern.exec(line);
    }
    return matches
}