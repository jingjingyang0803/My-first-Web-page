// Task 1
function task1() {
    let num1 = Math.floor(Math.random() * 10 + 1);//draws two integer numbers 
    let num2 = Math.floor(Math.random() * 10 + 1);//between 1–10 inclusive (pseudo)randomly 

    //tells the user their mutual order of magnitude.
    if (num1 < num2) {
        console.log(num1 + ' is less than ' + num2);
    } else if (num1 > num2) {
        console.log(num1 + ' is greater than ' + num2);
    } else {
        console.log(num1 + ' is equal to ' + num2);
    }
}
task1();//check the function working as required

/* Task 2 
This function prints the numbers between min and max (these included) seperately,
first the even numbers and then the odd numbers. 
Assume that the min value is an integer not larger than max (also an integer value). 
Within the even numbers part, the mutual order of the numbers should be preserved. 
The same applies to the part of the odd numbers.  */
function task2(min, max) {
    for (let i = min; i < max + 1; i++) {
        if (i % 2 === 0)//pick the even numbers from samll to large
            console.log(i);//print the even numbers first
    }
    for (let i = min; i < max + 1; i++) {
        if (i % 2 !== 0)//pick the odd numbers from samll to large
            console.log(i);//then print the odd numbers
    }
}
task2(3, 7);//4,6,3,5,7

/* Task 3
This function prints the numbers between min and max (these included),as an array.
first the even numbers and then the odd numbers in reversed order. 
Within the even numbers part, the mutual order of the numbers should be preserved. 
The same applies to the part of the odd numbers.  */
function task3(min, max) {
    let arr = [];//define an empty array
    for (let i = min; i < max + 1; i++) {
        if (i % 2 === 0)//pick the even numbers from samll to large
            arr.push(i);//assign the even numbers to the array
    }
    for (let j = max; j > min - 1; j--) {
        if (j % 2 !== 0)//pick the even numbers from large to small
            arr.push(j);//assign the odd numbers to the array
    }
    console.log(arr);//print the sorted array
}
task3(3, 7);//[4, 6, 7, 5, 3]

/* Task 4
This function tests if a string given is a palindrome and returns true/false. 
Assume that only English alphabet (a–z, A–Z) and spaces are used. */
function task4(testString) {
    let newString = testString.toLowerCase();// The capitalization does not matter.
    let len = Math.floor(newString.length / 2);
    for (let i = 0; i < len; i++) {
        if (newString[i] !== newString[newString.length - 1 - i])
            return false;
    }
    return true;//the string reads similarly backwards and forwards
}
console.log(task4('racecar'));//true
console.log(task4('step on no pets'));//true
console.log(task4('REDder'));//true
