# Lecture 07: MongoDB internal Architecture

## 1. Start with unsorted array

Use this:

```jsx
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Rohit" },
  { id: 3, name: "Priya" }
];
```

Now ask:

> New user comes. Where do we insert?
> 

At the end.

```jsx
users.push({ id: 4, name: "Neha" });
```

Complexity:

| Operation | Complexity |
| --- | --- |
| Create | `O(1)` amortized |
| Read/search by id | `O(n)` |
| Update | `O(n)` |
| Delete | `O(n)` |

For update, explain:

> Updating value is not hard. Finding that user is hard.
> 
> 
> First we search in array, then update.
> 

For delete:

> First find the element, then remove it. If we want array compact, shifting also happens.
> 

Best line:

> Array is good for adding data, but bad for finding, updating, and deleting data.
> 

## 2. Sorted array + binary search

Now say:

> What if we keep data sorted by `id`?
> 

```jsx
[
  { id: 1, name: "Aman" },
  { id: 2, name: "Rohit" },
  { id: 3, name: "Priya" },
  { id: 4, name: "Neha" }
]
```

Now search becomes fast:

```
Find id = 3
Use binary search
```

Complexity:

| Operation | Complexity |
| --- | --- |
| Create | `O(n)` |
| Read/search | `O(log n)` |
| Update | Usually `O(log n)`, but can become `O(n)` if sorted key changes |
| Delete | `O(n)` |

Important correction: update is not always `O(n)` in a sorted array.

If you update only this:

```jsx
name: "Rohit" -> "Rohit Negi"
```

and sorting is based on `id`, then search is `O(log n)` and update is simple.

But if you update the sorted field:

```jsx
id: 5 -> id: 100
```

then the element may need to move to another place, so shifting can become `O(n)`.

Also, if you are storing actual variable-size records in a file, a bigger update can create storage problems. That is a storage-engine problem, not just array problem.

Best line:

> Sorted array improves search, but makes insert and delete costly because shifting is expensive.
> 

## 3. Normal BST

Now say:

> Can we avoid shifting? Instead of keeping everything side by side like array, let us connect data using pointers.
> 

Example:

```
        50
      /    \
    30      70
   /  \    /  \
 20   40  60   80
```

Now insert does not shift many elements.

But problem:

```
10
  \
   20
     \
      30
        \
         40
```

This becomes like a linked list.

Correct complexity:

| Operation | Average | Worst case |
| --- | --- | --- |
| Create | `O(log n)` | `O(n)` |
| Read/search | `O(log n)` | `O(n)` |
| Update key | `O(log n)` | `O(n)` |
| Delete | `O(log n)` | `O(n)` |

So do not say BST is always `O(n)`. Say:

> Normal BST is good only if it remains balanced. If it becomes skewed, it behaves like a linked list.
> 

## 4. Balanced BST

Now bring AVL Tree / Red-Black Tree.

Say:

> What if tree automatically balances itself?
> 

Then height remains around `log n`.

Complexity:

| Operation | Complexity |
| --- | --- |
| Create | `O(log n)` |
| Read/search | `O(log n)` |
| Update key | `O(log n)` |
| Delete | `O(log n)` |

Now your doubt: **is balanced BST bad for range query?**

Algorithmically, no.

Range query like:

```
Find all users with id between 30 and 70
```

Balanced BST can do:

```
Find 30: O(log n)
Then inorder traversal until 70: O(k)
```

So complexity is:

```
O(log n + k)
```

where `k` is number of results.

But here is the real problem:

> Balanced BST is good in RAM, but not great for database storage on disk.
> 

Why?

Because each node may be stored in a different place.

```
Node 50 is at disk block A
Node 30 is at disk block X
Node 40 is at disk block M
Node 60 is at disk block P
```

So for range query, it may keep jumping to different disk locations.

Best line:

> Balanced BST is not bad mathematically.
> 
> 
> It is bad for database storage because it causes too many random disk reads.
> 

## 5. Now introduce secondary storage

This is the most important transition.

Say:

> Till now we were thinking like programmers: one node, one object, one pointer.
> 
> 
> But database thinks differently because data is usually bigger than RAM.
> 
> Data lives on SSD/disk, and disk does not like tiny random reads.
> 

Disk/SSD reads data in blocks/pages.

So database asks:

> If I am reading from disk anyway, why should I bring only one key?
> 
> 
> Let me bring many nearby keys together.
> 

That is the birth of B-Tree.

## 6. B-Tree

B-Tree node is not like BST node with one value.

BST node:

```
[50]
```

B-Tree node/page:

```
[10 | 20 | 30 | 40 | 50 | 60]
```

One node contains many keys.

Think of it as a **box**.

> In BST, one box contains one item.
> 
> 
> In B-Tree, one box contains many sorted items.
> 

Example:

```
              [30 | 60]
             /    |     \
 [1..29]   [31..59]   [61..100]
```

When database reads one page from disk, it gets many keys together.

That is powerful.

Why B-Tree is better than balanced BST for databases:

```
Balanced BST:
1 disk read = 1 key/node

B-Tree:
1 disk read = many keys
```

So tree height becomes very small.

For example:

```
BST height may be around 20-30 for millions of records
B-Tree height may be 3-5
```

WiredTiger docs describe its tree as page-based: root/internal pages store keys and references, leaf pages store key/value data, and pages split when they reach their limit. (source.wiredtiger.com)

Complexity idea:

```
Search = O(log base m n)
```

where `m` is fanout, meaning one node can have many children.

But for databases, do not focus only on Big-O. Focus on disk reads.

Better teaching line:

> B-Tree reduces the number of disk jumps.
> 

### Is B-Tree bad for range query?

Not exactly bad. It is better than BST for disk.

But B+ Tree makes range queries cleaner and faster.

In a normal B-Tree, values can exist in internal nodes and leaf nodes. For range query, traversal can become less straightforward.

So B-Tree is good, but B+ Tree is more suitable for database-style range scans.

## 7. B+ Tree

Now final upgrade.

B+ Tree rule:

```
Internal nodes = only keys for navigation
Leaf nodes = actual data / record pointer
Leaf nodes = sorted and connected
```

Example:

```
              [30 | 60]
             /    |     \
          /       |       \

Leaf level:
[1, 5, 9, 20] -> [31, 35, 40, 55] -> [61, 70, 80, 99]
```

Now range query becomes beautiful.

Query:

```
Find all id between 35 and 80
```

Steps:

```
1. Use tree to reach 35: O(log n)
2. Scan leaf nodes one by one until 80
```

Because leaf nodes are sorted and linked, database can move sequentially.

Complexity:

```
O(log n + k)
```

But in database terms:

```
O(tree height + number of pages scanned)
```

Best line:

> B+ Tree is like a book index plus connected pages.
> 
> 
> First it helps you jump to the correct page, then you keep reading the next pages in order.
> 

## 8. Connect this directly to MongoDB

Now say:

> MongoDB does not search every document every time.
> 
> 
> If we create an index, MongoDB maintains a tree-like ordered structure for that field.
> 

Example:

```jsx
db.users.createIndex({ email: 1 });
```

Now simplified mental model:

```
email index:

aman@gmail.com  -> document location
neha@gmail.com  -> document location
rohit@gmail.com -> document location
```

When we run:

```jsx
db.users.find({ email: "rohit@gmail.com" });
```

MongoDB can use the index.

Without index:

```
Collection scan
Check document 1
Check document 2
Check document 3
...
```

With index:

```
Go through B-tree/B+tree style index
Find email quickly
Fetch matching document
```

MongoDB docs state indexes store a small portion of collection data in an easy-to-traverse form, ordered by indexed field values; this ordering supports equality, range queries, and sorted results. (MongoDB)

## 9. Range query example in MongoDB

Example:

```jsx
db.products.createIndex({ price: 1 });
```

Query:

```jsx
db.products.find({
  price: { $gte: 500, $lte: 1000 }
});
```

Now MongoDB can do:

```
1. Reach first price >= 500
2. Scan index entries until price > 1000
3. Fetch matching documents
```

This is why indexes are powerful for:

```
equality search
range query
sorting
pagination
```

## 10. Final complexity table for your lecture

Use this corrected table:

| Structure | Create | Read | Update | Delete | Main problem |
| --- | --- | --- | --- | --- | --- |
| Unsorted array | `O(1)` | `O(n)` | `O(n)` | `O(n)` | Search is slow |
| Sorted array | `O(n)` | `O(log n)` | `O(log n)` or `O(n)` | `O(n)` | Insert/delete shifting |
| Normal BST | Avg `O(log n)`, worst `O(n)` | Avg `O(log n)`, worst `O(n)` | Avg `O(log n)`, worst `O(n)` | Avg `O(log n)`, worst `O(n)` | Can become skewed |
| Balanced BST | `O(log n)` | `O(log n)` | `O(log n)` | `O(log n)` | Too many random disk reads |
| B-Tree | `O(log n)` | `O(log n)` | `O(log n)` | `O(log n)` | Good for disk, okay for range |
| B+ Tree | `O(log n)` | `O(log n)` | `O(log n)` | `O(log n)` | Best for database-style range scans |

For B-Tree/B+ Tree, tell them:

> Big-O looks similar to balanced BST, but real database performance improves because one node contains many keys and one disk read brings many related keys together.
> 

## Best final teaching punchline

Use this:

> Array was good for writing.
> 
> 
> Sorted array was good for searching.
> 
> BST avoided shifting.
> 
> Balanced BST controlled height.
> 
> But database data lives on disk, so we need fewer disk reads.
> 
> B-Tree puts many sorted keys in one page.
> 
> B+ Tree keeps all actual data at leaf level and connects leaves, so range queries become efficient.
> 
> That is why databases like MongoDB use B-tree/B+tree-style index structures internally.
>