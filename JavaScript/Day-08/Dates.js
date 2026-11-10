// ! Date and Functions in js 
// Create a Date object for right now. 
const nows = new Date();
console.log(nows);

// Create a Date from a timestamp 
// Date.now() is a quick way to get the CURRENT timestamp as a number. 
const currentTimestamp = Date.now(); //eg 2983471892347
console.log(currentTimestamp);

// Now, let's create a Date object from that numbers. 
const da = new Date(1793893561514);
console.log(da)  // This will show the date and time corresponding to that timestamp.

// Create a specific Date (The Recommend way )

// new Date(year, month, day, hours,minutes, seconds, ms)

const myDate = new Date(2026,8,4,10,11,123);
console.log(myDate.toDateString());

// 🚨 CRITICAL GOTCHA: Months are Zero-Indexed! 🚨 This is the most common source of bugs with JavaScript dates.

// 0 = January
// 1 = February
// ...
// 8 = September (as in the example above)
// 11 = December

// ! Geeting Information from a Date Object (Getter)


const now = new Date(); // Let's pretend it's Sep 4, 2025, a Thursday

console.log(now.getFullYear()); // 2025 (The full 4-digit year)
console.log(now.getMonth());    // 8 (Remember, 0-indexed, so 8 is September)
console.log(now.getDate());     // 4 (The day of the month, 1-31)
console.log(now.getDay());      // 4 (The day of the week: 0=Sunday, 1=Monday, ..., 4=Thursday)
console.log(now.getHours());    // e.g., 6 (The hour, 0-23)
console.log(now.getMinutes());  // e.g., 20 (The minute, 0-59)

// ! Changing a Date : Setters and Mutablility 

const dat = new Date(1759262295036); // Creating a specific date
console.log("Before",da);

// Let's change the month to May (index 4)
dat.setMonth(4);
console.log("After",dat);

// ! Date Auto Correction (Rollover)

// 2025 is not a leap year, so February has 28 days.
// You are asking for Feb 28 + 2 days.
const a = new Date(2025, 1, 30);

// The date object auto-corrects to March 2nd, 2025.
console.log(a); // Outputs: Sun Mar 02 2025 ...


// ! Formatting Dates for Display
const nows2 = new Date();

// .toString() is the default, verbose format in the local timezone.
console.log(nows2.toString());
// e.g., Mon Oct 28 2024 04:15:00 GMT+0530 (India Standard Time)

// .toDateString() gives you just the date part.
console.log(nows2.toDateString());
// e.g., Mon Oct 28 2024

// .toISOString() gives the universal, unambiguous UTC time. The 'Z' means UTC.
// This is what you send to servers.
console.log(nows2.toISOString());
// e.g., 2024-10-27T22:45:00.000Z

// .toLocaleString() formats the date and time in a way that is natural
// for the user's region and language. BEST for user display.
console.log(nows2.toLocaleString());
// e.g., in India: 28/10/2024, 4:15:00 am
// e.g., in the US: 10/27/2024, 4:15:00 PM


// Summary of Key "Gotchas"
// Months are 0-indexed. This is the #1 source of bugs.
// Dates are Mutable. Setter methods change the original object.
// String Parsing is Unreliable. Never use new Date("some-date-string").
// Timezones are Complex. Always be aware of whether you are working with local time or UTC time. Send UTC timestamps to servers.
 console.log(nows2.toString());
console.log(nows2.toDateString());
console.log(nows2.toISOString());
console.log(nows2.toLocaleString());

// Major Problems:
// 1. Months start at 0, but days start at 1 🤦
new Date(2025, 0, 1);  // January 1, 2025 (month is 0-indexed)
new Date(2025, 11, 25); // December 25, 2025Q (11 = December!)
// This is confusing and error-prone!


// 2. Mutable (can be changed accidentally)
const date = new Date(2025, 9, 1);
date.setMonth(10); // Oops! Date is modified
console.log(date); // Changed to November!
// This causes bugs in apps


// 3. Weird quirks and bugs
new Date(2025, 1, 30); // Feb 30? Becomes March 2!
new Date('2025-02-30'); // Invalid Date

// Inconsistent behavior
new Date(2025, 0); // Jan 1, 2025 00:00:00
new Date(2025);    // Jan 1, 1970 plus 2025 milliseconds! 😱


// The Solution:
// Because Date is so bad, developers use libraries:

// Day.js (lightweight, 2KB)
// date-fns (functional, tree-shakeable)
// Luxon (modern, powerful)