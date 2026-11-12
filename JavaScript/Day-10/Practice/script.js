// Script.js attached with html file

// TODO How do I change "Hello World " to "Goodbye World"
// TODO How do I make the paragraph red ? 
//  TODO How do I add a new button ? 


//?  1. Everything is a Node
//?  Types of Nodes:
//?  - Element Nodes: <div>, <p>, <h1>
//?  - Text Nodes: The actual text content
//?  - Document Node: The root (document)
 
 
//?  2. HTML Elements Become Objects
//?  <h1 id="title">Hello</h1>
 
 
//?  Becomes:

//?  {
//?    tagName: "H1",
//?    id: "title",
//?    textContent: "Hello",
//?    style: { color: "", fontSize: "" },
//?    parentElement: body,
//?    children: [],
//?    // ... many more properties and methods
//?  }
 
 
//?  Tell students: "Every HTML tag becomes a JavaScript object with properties and methods!"

//?  3. The window and document Objects
//?  Draw this hierarchy:

//?  Window (global object - the browser API)
//?      └── document (your HTML page as objects)
//?          └── documentElement (the <html> tag)
//?              ├── head
//?              └── body
//?                  └── (all your elements)
 
 
//?  Key Points:
 
//?  window = The browser environment (has alert, setTimeout, localStorage, etc.)
//?  document = Your HTML page (the DOM tree)