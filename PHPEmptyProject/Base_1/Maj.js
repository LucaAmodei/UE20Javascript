function UpperCaseFirstLetter(str) {
    return  str[0].toUpperCase() + str.substring(1);
}

let str = "hello world !";
console.log(UpperCaseFirstLetter(str));