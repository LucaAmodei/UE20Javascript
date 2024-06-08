/**
 *
 * @param nbrMax Number
 */
function fizzBuzz(nbrMax) {
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
        console.log(str !== "" ? str : count);
        str = "";
    }
}

fizzBuzz(53)