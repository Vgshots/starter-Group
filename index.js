const express = require('express')
const app = express()

const express = require("express");

const compression = require("compression"); // Import compression middleware for response compression
const moment = require("moment");
const {
    ReadAllGroupLinksAll,
    addToDatabaseAPI,
} = require("./database");
const { fetchCourseData } = require("./format");
const { getRandomundewithoutFirstCharEroors } = require("./random");
// Use compression middleware to compress responses
app.use(compression());
app.use(express.json());

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Your route handler for '/api/add'
app.post("/api/add", async (req, res) => {
    console.log("hi 1");
    try {
        data = req.body;

        const courseCode = String(data.courseCode).toUpperCase();
        const section = parseInt(data.section);
        const urls = String(data.url);
        console.log("hi 2");

        console.log(courseCode, section, urls);

        console.log(courseCode.toUpperCase());

        // Use the parameters passed to the function
        const result = await addToDatabaseAPI(courseCode, section, urls);
        res.status(200).json({ message: result });
    } catch (error) {
        console.log("hi error");

        console.error("Error:", error);
        res.status(500).json({ error: "Error updating link" });
    }
});

// API to get data for a specific course code
app.get("/api/courses/:courseCode", async (req, res) => {
    const courseCode = String(req.params.courseCode).toUpperCase();

    try {
        const data = await ReadAllGroupLinksAll(courseCode);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


wss.on("connection", (ws) => {
    const userIdWithPrefix = ws._socket.remoteAddress;
    const userId = userIdWithPrefix.substring(
        userIdWithPrefix.lastIndexOf(":") + 1
    );

    connectedClients.set(userId, ws);
    const geo = geoip.lookup(userId);

    const LocalHOSTdEVICE =
        userId === "1" || userId.substring(0, 7) === "192.168" ? true : false;

    // Define the whitelist of IP addresses as an array of strings
    const whiteIp = ["167.86.141.238"];

    // Check if the user's ID matches any IP address in the whitelist
    const isWhitelisted = whiteIp.includes(userId);

    // saudia "SA"
    const UseBotCondition =
        (geo && geo.country.toUpperCase() === "BH") || isWhitelisted ? true : false;
    let tempAdmiin = false;

    if (UseBotCondition || LocalHOSTdEVICE) {
        if (UseBotCondition) {
            console.log("╭─────--------───────╮");
            console.log(
                `User ${userId} connected from ${geo.country}. Total Conected: ${connectedClients.size}`
            );
            console.log("╰─────---------──────╯");
        } else {
            console.log(`LocalHOST USER ${userId} join.`);
        }

        // Handle messages from the client
        ws.on("message", (message) => {
            if (UseBotCondition) {
                const myString = `[${moment().format("HH:mm:ss")}] ${geo.country
                    } User ${userId}: ${message}`;
                fs.appendFileSync("output.txt", "\n" + myString + "\n");
                console.log(myString);
            } else {
                console.log(
                    `[${moment().format(
                        "HH:mm:ss"
                    )}] Message from  User ${userId}: ${message}`
                );
            }

            //   if (message === 'admin') {
            //        adminSocket = ws;
            //     } else if (adminSocket) {
            //         // If message is from user, forward to admin
            //         adminSocket.send(message);
            //     }
            // ws.send("anything to");

            let userMessage = String(message);
            let userMsg = userMessage;
            let responseMessage;
            if (userMsg === "hi" || userMsg === "hello") {
                responseMessage = "Hi there! How can I assist you today?";
            } else if (userMsg === "link") {
                responseMessage = `
                
                📆 Educational Semester: Second Semester 2024

                the Main group 
               🔗 https://chat.whatsapp.com/FKAwvtuazZM4oJOsQO9LQf
               Section #1
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 1 LINK
               
               Section #2
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 2 LINK
               
               Section #3
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 3 LINK
               
               Section #4
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 4 LINK
               
               Section #5
               🔗 https://chat.whatsapp.com/Chy1JPBp9r7KQJ88IG7dGZ
               Section #6
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 6 LINK
               
               Section #7
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 7 LINK
               
               Section #8
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 8 LINK
               
               Section #9
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 9 LINK
               
               Section #10
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 10 LINK
               
               Section #11
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 11 LINK
               
               Section #12
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 12 LINK
               
               Section #13
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 13 LINK
               
               Section #14
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 14 LINK
               
               Section #15
               Link for the group is absent. 😢😢
               ✨ Ready to shine? Share your link here... 
               $ITCS114 15 LINK
               
               
                 *"Important note:"* All existing groups are scheduled for removal with the upcoming semester 
               
               
               In case of any missing section, reach out without hesitation.
               Send me a message: https://wa.me/97366992637?text=greetings `;
            }

            //-------------------------------------------------------
            //-----------------------------------------------------------------------------------------------

            function convertInput(input) {
                // Remove leading and trailing spaces, and replace multiple spaces with a single space
                input = input.trim().replace(/^#/, '').replace(/\s+/g, ' ');


                // Extract the course code, number, and URL
                const matches = input.match(/([@!A-Za-z]+[0-9]+)\s*([0-9]+)\s*(http[s]?:\/\/\S+)/);

                // If matches are found
                if (matches) {
                    const courseCode = matches[1];
                    const number = matches[2];
                    const url = matches[3];

                    const output = `${courseCode} ${number} ${url}`;


                    return output;
                } else {
                    return [input, 1];
                }
            }






            let enableLog = true;
            let isAdmin = LocalHOSTdEVICE;
            //"^itcs113"

            //"$ITCS114 3 https://chat.whatsapp.com/r7thvfvhjfb3nanjja3l7F";
            //let userCommand = "$ITCS113 3 https://chat.whatsapp.com/r7thvfvhjfb3nanjja3l7F"



            //mamas




            const [output] = convertInput(userMsg);

            const commandArray = output.trim().split(/\s+/);
            // console.log(length);

            console.log(commandArray);
            //mama

            let courseCode = String(commandArray[0]).trim().toUpperCase();
            let sectionNumber = parseInt(String(commandArray[1]).trim());
            let fullLink = String(commandArray[2]).trim();
            // Check if each variable has data and sum up

            let lengthOfThem = (courseCode.length > 0 ? 1 : 0) +
                (!isNaN(sectionNumber) ? 1 : 0) +
                (fullLink === "undefined" ? 0 : 1);





            let hoi = false;



            fetchCourseData(courseCode);



            if (courseCode.trim().toUpperCase() === "ADMIN" && (tempAdmiin || isAdmin)) {


                let loko =
                    `      🌟 Admin Permissions Overview 🌟

          🔹 Adding Links:
          Admins have the authority to add links to course sections using the command:
          
          $Course_Code Section_Number link
          Even if a link already exists, the admin can still add a new one.
          
          
          🔹 Removing Links:
          To remove a link from a section course number, admins can use the command:
          -Course_Code Section_Number
          
          
          🔹 Adding New Courses:
          Admins can add a new course code and specify the number of sections using the command:
          
          $!Course_Code_Name Number_of_Sections
          This command facilitates the addition of a course code along with its respective sections.`
                    ;
                ws.send(loko);
                return;

            }
            if (lengthOfThem < 3 && (!(courseCode[0] === "^")) && (!(courseCode[0] === "-")) && (!(courseCode[0] === "!"))) {

                if (userMsg.trim() === "8Xqihh5y9hD6tmzN%dXq8sRfu*&eG*sw5^SCT!QU^b@RkA4R8PM*ve@7QLg2aR!FaUwCr8oTKeVevVRRb%yDa!#DzSLLpQ9ZnNb^*Wb%E*oE$AzMeP^!TQcxoq$oxa6dSt3T!K6q8gLAGsnD7EK*munYw4Lz85YfZuyw2hE3ZWHcSA28!^h6mixw@@XX*54JK$bH4ThD@DdwZUx6GePeV*o*$7KB4FAcFUsH8^U5Dtk63UZpm%trp$$i*%XcZBJjEPz9oxEDP$Jwh&g%PfpKnCU25oKxS3*atTEFcBdLv&@rT6tqE4g#dVs3irVXh4m%QtLhiGoBfnJ4&WsaLE$^K@K%PPL&L^xRMf^XEqVxeg!AF*EbUFRa7v!Yk%e!EupvOutback-Unstylish-Sherry-Arbitrate-Transfer-Supremacy-Kiwi-Pushup-Arose-Cornea-Unsterile2-Niece-Viability-Tassel-Undiluted-Chamber-Catalyze-Cymbal-Poking-RadiodZTz5w63PamfApa!XqHA4ZL$AxiR5e^F*ZfbDTx7%amv4gc7RyY^G*rsQW4yQ*hx8zfJ6!L7gY39^D3TSyh8$za@!bBJjy2F4L3Tpaxq@iMmpbA^xXS^WMxFcfy8yre4") {
                    tempAdmiin = true;
                    ws.send("your admin now");
                    return;

                }

                // Example usage
                ReadAllGroupLinks(courseCode)
                    .then(result => {

                        ws.send(result);

                        if (enableLog) { console.log(`[${moment().format('HH:mm:ss')}] Bot Reply: ${result}\n\n`); }
                    })
                    .catch(error => {

                        ws.send("Error read:", error);
                        if (enableLog) { console.log(`[${moment().format('HH:mm:ss')}] Bot Reply: ${"Error read:", error}\n\n`); }

                        //console.error("Error:", error);
                    });



                console.log(courseCode + "  " + sectionNumber);
            } else if (lengthOfThem === 3 || (courseCode[0] === "!")) {
                console.log("Enter 1");
                let hoho = false;

                if (isAdmin || tempAdmiin) {
                    console.log("Enter 2");

                    let isAddBuilding = false;

                    if (courseCode[0] === "!") {
                        console.log("Enter 3");

                        addCourseCodeValue = courseCode.slice(courseCode.startsWith('!@') ? 2 : 1);
                        isAddBuilding = courseCode.startsWith('!@');
                        hoho = true;
                    }

                    if (hoho) {
                        addCourseCode(addCourseCodeValue, sectionNumber, isAddBuilding);
                    }

                    console.log("Enter 4");

                    if (!hoho) {
                        editLink(courseCode, sectionNumber, fullLink)
                            .then(() => {
                                ws.send(`Link updated successfully for ${courseCode}, section ${sectionNumber}!`);
                                if (enableLog) {
                                    console.log(`[${moment().format('HH:mm:ss')}] Bot Reply: Link updated successfully for ${courseCode}, section ${sectionNumber}!\n\n`);
                                }
                            })
                            .catch((error) => {
                                ws.send("Error editing link: " + error);
                                if (enableLog) {
                                    console.log(`[${moment().format('HH:mm:ss')}] Bot Reply: Error editing link: ${error}\n\n`);
                                }
                            });
                    }
                }
                else {

                    if (String(sectionNumber).toUpperCase().includes('ALL')) {
                        sectionNumber = 0;
                    }
                    //add
                    addToDatabase(courseCode, sectionNumber, fullLink, length)
                        .then((result) => {
                            if (enableLog) {
                                console.log(`[${moment().format('HH:mm:ss')}] Bot Reply: ${result}\n\n`);
                            }
                            ws.send(result); // Send the result once
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            ws.send("Error:", error); // Send the error once
                        });
                }


            } else if (String(courseCode)[0] === "^") {
                courseCode = courseCode.slice(1);
                ReadAllCourseInformation(courseCode)
                    .then(result => {
                        ws.send(result);
                        if (enableLog) { console.log(`[${moment().format('HH:mm:ss')}] Bot Reply: ${result}\n\n`); }
                    })
                    .catch(error => {
                        ws.send("Error editing link:" + error);
                        if (enableLog) { console.log(`[${moment().format('HH:mm:ss')}] Bot Reply: ${"Error editing link:", error}\n\n`); }
                    });
            } else if (String(courseCode)[0] === "-") {
                courseCode = courseCode.slice(1);
                if (isAdmin || tempAdmiin) {
                    deleteLink(courseCode, sectionNumber)
                        .then(() => {
                            ws.send("Link deleted successfully!");
                            if (enableLog) { console.log(`[${moment().format('HH:mm:ss')}] Bot Reply: ${"Link deleted successfully!"}\n\n`); }
                            // Further actions after successful deletion, if needed
                        })
                        .catch((error) => {
                            ws.send("Error editing link:" + error);
                            if (enableLog) { console.log(`[${moment().format('HH:mm:ss')}] Bot Reply: ${"Error editing link:", error}\n\n`); }
                            // Handle the error, if needed
                        });
                }
            }









            else {
                if (String(responseMessage) === "undefined") {
                    ws.send(getRandomundewithoutFirstCharEroors());
                    if (enableLog) {
                        console.log(
                            `[${moment().format(
                                "HH:mm:ss"
                            )}] Bot Reply: ${getRandomundewithoutFirstCharEroors()}\n\n`
                        );
                    }
                }
            }

            // Generate a random number between 0 and 1
            //const randomValue = Math.random();

            // Decide which function to call based on the random value
            // if (randomValue < 0.5) {
            //   //  fetchCourseData(UserCommandWithoutFirstChar);
            //  } else {
            //   //  checkAndUpdateSemesterAndSections(UserCommandWithoutFirstChar);
            //  }

            //
            //-----------------------------------------------------------------------------------------------

            // Function to format data

            //-------------------------------------------------------------------------------

            if (!(String(responseMessage) === "undefined")) {
                console.log(
                    `[${moment().format("HH:mm:ss")}] Bot Reply: ${responseMessage}\n\n`
                );
                //  ws.send(responseMessage);
                ws.send(responseMessage);
            }
        });

        // Handle disconnection
        ws.on("close", () => {
            connectedClients.delete(userId);

            if (geo) {
                console.log("╭─────--------───────╮");
                console.log(
                    `User ${userId} disconnected from ${geo.country}. Total Conected: ${connectedClients.size}`
                );
                console.log("╰─────---------──────╯");
            } else {
                console.log(`LocalHOST USER ${userId} left.`);
            }
        });
    }
});

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
