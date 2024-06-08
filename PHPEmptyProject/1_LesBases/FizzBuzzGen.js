function* fizzBuzz(nbrMax) {
    let count = 0;
    let str = "";
    while (count <= nbrMax) {
        count++;
        if ((count + "").includes("3")) {
            str = "fizz";
        }
        if ((count + "").includes("5")) {
            str += "buzz";
        }
        yield (str !== "" ? str : count);
        str = "";
    }
}

let i = 0;
let fun = fizzBuzz(70);
while (i < 50) {
    console.log(fun.next().value);
    i++;
}