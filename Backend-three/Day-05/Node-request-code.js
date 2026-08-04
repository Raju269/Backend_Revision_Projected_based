 import http from "http";

const database = [
    { name: "Raju", age: 10, email: "raju@gmail.com", amount: 90 },
    { name: "Kumar", age: 30, email: "kumar@gmail.com", amount: 190 },
    z
];

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json");

    // ================= GET =================

    if (req.method === "GET" && req.url === "/user") {
        res.end(JSON.stringify(database, null, 2));
    }

    // ================= POST =================

    else if (req.method === "POST" && req.url === "/user") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const user = JSON.parse(body);

            database.push(user);

            res.end(JSON.stringify({
                message: "User Created Successfully",
                user
            }));
        });
    }

    // ================= PATCH =================

    else if (req.method === "PATCH" && req.url === "/user") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const user = JSON.parse(body);

            const findUser = database.find(
                u => u.email === user.email
            );

            if (!findUser) {

                res.end(JSON.stringify({
                    message: "User Not Found"
                }));

                return;
            }

            Object.assign(findUser, user);

            res.end(JSON.stringify({
                message: "User Updated Successfully",
                user: findUser
            }));
        });
    }

    // ================= DELETE =================

    else if (req.method === "DELETE" && req.url === "/user") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const user = JSON.parse(body);

            const index = database.findIndex(
                u => u.email === user.email
            );

            if (index === -1) {

                res.end(JSON.stringify({
                    message: "User Not Found"
                }));

                return;
            }

            database.splice(index, 1);

            res.end(JSON.stringify({
                message: "User Deleted Successfully"
            }));
        });
    }

    else {

        res.end(JSON.stringify({
            message: "Invalid Route"
        }));
    }

});

server.listen(3000, () => {

    console.log("Server Running at http://localhost:3000");

});