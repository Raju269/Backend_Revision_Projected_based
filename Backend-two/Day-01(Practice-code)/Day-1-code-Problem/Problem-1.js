// Problem 1 — You Are Parsing the URL Manually
const str = request.url;
let str1 = "";
for(let i = 1; i < str.length; i++)
    str1 += str[i];
let number = Number(str1);

// This works. But JavaScript already has a built in way to do this —


const numbers = Number(request.url.slice(1));


// `slice(1)` removes the first character which is `/`. Same result. One line.