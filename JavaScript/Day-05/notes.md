# Lecture05: 

# 1. Why Do We Need Loops?

Imagine I ask you:

> Print "Hello" 5 times.
> 

Most beginners write:

```jsx
console.log("Hello");
console.log("Hello");
console.log("Hello");
console.log("Hello");
console.log("Hello");
```

Now imagine printing it 100 times.

Will you write 100 lines?

No.

Computers are good at repetitive work.

Loops allow us to repeat instructions automatically.

---

# 2. What Is a Loop?

A loop means:

> Repeat some work until a condition becomes false.
> 

Real-life examples:

- Brushing teeth 20 times.
- Taking attendance of all students.
- Checking every student in a classroom.
- Counting money note by note.

---

# 3. First Loop

```jsx
for(let i = 1; i <= 5; i++){
    console.log("Hello");
}
```

Output:

```
Hello
Hello
Hello
Hello
Hello
```

---

# 4. Understanding the Syntax

```jsx
for(initialization; condition; update){
    // work
}
```

Example:

```jsx
for(let i = 1; i <= 5; i++){
    console.log(i);
}
```

Breakdown:

## Initialization

```jsx
let i = 1;
```

Starting point.

---

## Condition

```jsx
i <= 5
```

Continue while true.

---

## Update

```jsx
i++
```

Increase value.

---

# 5. Dry Run

```jsx
for(let i = 1; i <= 3; i++){
    console.log(i);
}
```

| i | Condition | Output |
| --- | --- | --- |
| 1 | True | 1 |
| 2 | True | 2 |
| 3 | True | 3 |
| 4 | False | Stop |

Output:

```
1
2
3
```

---

# 6. Predict the Output

Question:

```jsx
for(let i = 5; i >= 1; i--){
    console.log(i);
}
```

Output:

```
5
4
3
2
1
```

---

Question:

```jsx
for(let i = 2; i <= 10; i += 2){
    console.log(i);
}
```

Output:

```
2
4
6
8
10
```

---

# 7. Common Mistakes

Infinite loop:

```jsx
for(let i = 1; i <= 5; ){
    console.log(i);
}
```

Why?

Because `i` never changes.

---

Off-by-one mistake:

```jsx
for(let i = 0; i < 5; i++)
```

Runs 5 times.

But:

```jsx
for(let i = 0; i <= 5; i++)
```

Runs 6 times.

---

# 8. Real Problems Using Loops

## Print Numbers 1 to 10

```jsx
for(let i = 1; i <= 10; i++){
    console.log(i);
}
```

---

## Print Numbers 10 to 1

```jsx
for(let i = 10; i >= 1; i--){
    console.log(i);
}
```

---

## Print Even Numbers

```jsx
for(let i = 2; i <= 20; i += 2){
    console.log(i);
}
```

---

## Print Odd Numbers

```jsx
for(let i = 1; i <= 20; i += 2){
    console.log(i);
}
```

---

# 9. Sum Problems

Sum from 1 to 5

```jsx
let sum = 0;

for(let i = 1; i <= 5; i++){
    sum += i;
}

console.log(sum);
```

Output:

```
15
```

---

# 10. Multiplication Table

Table of 7:

```jsx
for(let i = 1; i <= 10; i++){
    console.log(`7 × ${i} = ${7*i}`);
}
```

---

# 11. Working with Strings

Count vowels.

```jsx
let str = "javascript";
let count = 0;

for(let i = 0; i < str.length; i++){

    let ch = str[i];

    if("aeiou".includes(ch)){
        count++;
    }
}

console.log(count);
```

---

# 12. Working with Arrays

Find largest number.

```jsx
let arr = [4,7,2,9,5];

let largest = arr[0];

for(let i = 1; i < arr.length; i++){

    if(arr[i] > largest){
        largest = arr[i];
    }
}

console.log(largest);
```

---

# 13. Nested Loops

Nested loop means:

> A loop inside another loop.
> 

Example:

Every student submits every assignment.

Outer loop = students

Inner loop = assignments

---

# 14. First Pattern

```jsx
for(let row = 1; row <= 5; row++){

    let str = "";

    for(let col = 1; col <= row; col++){
        str += "*";
    }

    console.log(str);
}
```

Output:

```
*
**
***
****
*****
```

Outer loop → Rows

Inner loop → Columns

---

# 15. Practice Questions

## Level 1 (Very Easy)

1. Print numbers 1 to 20.
2. Print numbers 20 to 1.
3. Print even numbers from 1 to 50.
4. Print odd numbers from 1 to 50.
5. Print multiples of 3 up to 30.
6. Print numbers divisible by 5 up to 100.
7. Print "Coder Army" 10 times.
8. Print squares of numbers from 1 to 10.
9. Print cubes of numbers from 1 to 10.
10. Print numbers from 100 to 0.

---

## Level 2 (Dry Run and Thinking)

1. Find sum from 1 to 10.
2. Find sum from 1 to 100.
3. Find factorial of 5.
4. Find factorial of n.
5. Count digits in a number.
6. Reverse a number.
7. Check if a number is palindrome.
8. Find product of digits.
9. Find sum of digits.
10. Count how many even digits exist.

---

## Level 3 (Conditions + Loops)

1. Check if a number is prime.
2. Print all prime numbers from 1 to 100.
3. Find GCD of two numbers.
4. Find LCM of two numbers.
5. Check Armstrong number.
6. Check perfect number.
7. Find all divisors of a number.
8. Count divisors.
9. Find largest divisor.
10. Find smallest divisor greater than 1.

---

## Level 4 (Strings)

1. Count vowels.
2. Count consonants.
3. Count spaces.
4. Reverse a string.
5. Check palindrome string.
6. Count frequency of a character.
7. Remove vowels.
8. Convert lowercase to uppercase manually.
9. Count words.
10. Find longest word.

---

## Level 5 (Arrays)

1. Find largest element.
2. Find smallest element.
3. Find second largest element.
4. Calculate array sum.
5. Calculate average.
6. Count even numbers.
7. Count odd numbers.
8. Reverse an array.
9. Find frequency of a number.
10. Search element using linear search.

---

## Level 6 (Nested Loops)

1. 

```
*
**
***
****
*****
```

1. 

```
*****
****
***
**
*
```

1. 

```
1
12
123
1234
12345
```

1. 

```
11111
2222
333
22
1
```

1. 

```
A
AB
ABC
ABCD
ABCDE
```

1. 

```
1
22
333
4444
55555
```

1. 

```
*****
*****
*****
*****
*****
```

1. 

```
12345
12345
12345
12345
12345
```

1. 

```
ABCDE
ABCDE
ABCDE
ABCDE
ABCDE
```

1. 

```
54321
54321
54321
54321
54321
```

---

```jsx
for(let i = 65; i <= 90; i++){
    console.log(String.fromCharCode(i));
}
```

```jsx
for(let row = 1; row <= 5; row++){
    for(let col = 1; col <= row; col++){
        process.stdout.write("*");
    }
    console.log();
}
```

# Homework Challenge

Without using Google or AI:

Solve Questions 1–20.

Rule:

- First dry-run on paper.
- Predict the output.
- Then write code.
- Finally execute it.

If you can solve Questions 1–20 on your own, you truly understand loops.