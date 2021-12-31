export const getByteCount = (string: string) => {
    if(typeof string === "undefined") return 0;
    let count = 0,
        stringLength = string.length,
        i;
        string = String(string || "");
    for (i = 0; i < stringLength; i++) {
        let partCount = encodeURI(string[i]).split("%").length;
        count += partCount == 1 ? 1 : partCount - 1;
    }
    return count;
}
export const removeItems = (input: [], item: number) => {
    let arr:[] = [];
    for (let i = item - 1; i < input.length; i++) {
        arr.push(input[i]);
    }
    return arr;
}