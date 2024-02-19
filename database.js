//database.js
const sqlite3 = require("sqlite3");






// --------------------------------------------------------------------------------------

async function createCoursesTable() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./databases/courseDatabase.db");
    const createTableQuery = `CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      courseCode TEXT,
      FinalExamDate,
      sectionNumber INTEGER,
      instructor TEXT,
      day TEXT,
      startTime TEXT,
      endTime TEXT,
      totalTimeInMinutes INTEGER,
      classType TEXT,
      room TEXT,
      year TEXT,
      semester TEXT,
      position INTEGER,
      GroupLink TEXT
    );`;
    db.run(createTableQuery, (err) => (err ? reject(err) : resolve()));
    db.close();
  });
}
exports.createCoursesTable = () => createCoursesTable();
// Function to read data from the database without caching
exports.ReadAllGroupLinksAll = async (courseCode) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./databases/courseDatabase.db");

    let query;
    let params;
    if (courseCode === "*") {
      query = `
                  SELECT courseCode, sectionNumber, GroupLink, year, semester
                  FROM courses
                  WHERE position = 1;
              `;
      params = [];
    } else {
      query = `
                  SELECT courseCode, sectionNumber, GroupLink, year, semester, FinalExamDate, day
                  FROM courses
                  WHERE courseCode = ? AND position = 1;
              `;
      params = [courseCode];
    }

    db.all(query, params, (err, rows) => {
      db.close();

      if (err) {
        console.error("Error reading data:", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Function to edit a link in the database

function checkExistingLink(courseCode, sectionNumber, fullLink) {
  const db = new sqlite3.Database("./databases/courseDatabase.db");
  return new Promise((resolve, reject) => {
    const selectStatement = db.prepare(`
              SELECT GroupLink
              FROM courses
              WHERE courseCode = ? AND sectionNumber = ? AND position = 1;
          `);

    selectStatement.get(courseCode, sectionNumber, (err, row) => {
      selectStatement.finalize();
      if (err) {
        reject("Error checking existing link.");
      } else {
        resolve(row ? row.GroupLink : null);
      }
    });
  });
}

exports.checkIfCourseExists = async (courseCode) => {
  const db = new sqlite3.Database("./databases/courseDatabase.db");
  return new Promise((resolve, reject) => {
    const checkIfExistsQuery =
      "SELECT * FROM courses WHERE courseCode = ? LIMIT 1;";
    db.get(checkIfExistsQuery, [courseCode], (err, row) =>
      err ? reject(err) : resolve(!!row)
    );
    db.close();
  });
};















async function insertDataIntoCoursesTable(lecturesInfo) {
  const db = new sqlite3.Database("./databases/courseDatabase.db");

  const insertQuery = `
    INSERT INTO courses (
      id, courseCode, sectionNumber, instructor, day, startTime, endTime, totalTimeInMinutes,
      classType, room, year, semester, position, GroupLink, FinalExamDate
    )
    SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    WHERE NOT EXISTS (
      SELECT 1 FROM courses
      WHERE courseCode = ? AND sectionNumber = ? AND position = ? AND year = ? AND semester = ?
    );
  `;
  const existCheckQuery = `
  SELECT 1 FROM courses
  WHERE courseCode = ? AND sectionNumber = ? AND position = ? AND year = ? AND semester = ?
`;


  const existCheck = (values) => {
    return new Promise((resolve, reject) => {
      db.get(existCheckQuery, values, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? true : false);
        }
      });
    });
  };
  for (const lecture of lecturesInfo) {

    const exists = await existCheck([
      lecture.courseCode,
      parseInt(lecture.sectionNumber),
      lecture.position,
      lecture.YER,
      lecture.SMS
    ]);
    console.log(exists);
    if (lecture.instructor !== "To Be Announced" || !exists && lecture.instructor === "To Be Announced") {

      const values = [
        null,
        lecture.courseCode,
        lecture.sectionNumber.toString(), // Ensure sectionNumber is a string
        lecture.instructor || null, // Handle null values
        lecture.day || null,
        lecture.startTime || null,
        lecture.endTime || null,
        lecture.totalTimeInMinutes || null,
        lecture.classType || null,
        lecture.room || null,
        lecture.YER,
        lecture.SMS,
        lecture.position, // Ensure position is correct
        lecture.GroupLink || null,
        lecture.FinalExamDate
      ];

      // Duplicate check values
      const duplicateCheckValues = [
        lecture.courseCode,
        lecture.sectionNumber.toString(), // Ensure sectionNumber is a string
        lecture.position, // Ensure position is correct
        lecture.YER,
        lecture.SMS
      ];

      await new Promise((resolve, reject) => {
        db.run(insertQuery, [...values, ...duplicateCheckValues], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  }

  db.close();
}











exports.insertDataIntoCoursesTable = async (lecturesInfo) =>
  insertDataIntoCoursesTable(lecturesInfo);









async function updatedCoursesTable(lecturesInfo) {
  const db = new sqlite3.Database("./databases/courseDatabase.db");

  const updateQuery = `
    UPDATE courses
    SET
      instructor = COALESCE(?, instructor),
      day = COALESCE(?, day),
      startTime = COALESCE(?, startTime),
      endTime = COALESCE(?, endTime),
      totalTimeInMinutes = COALESCE(?, totalTimeInMinutes),
      classType = COALESCE(?, classType),
      room = COALESCE(?, room),
      year = COALESCE(?, year),
      semester = COALESCE(?, semester),
      FinalExamDate = COALESCE(?, FinalExamDate)
    WHERE
      courseCode = ? AND
      sectionNumber = ? AND
      position = ? AND
      year = ? AND
      semester = ?
  `;

  for (const lecture of lecturesInfo) {
    if (lecture.instructor !== "To Be Announced") {

      const values = [
        lecture.instructor || null, // Handle null values
        lecture.day || null,
        lecture.startTime || null,
        lecture.endTime || null,
        lecture.totalTimeInMinutes || null,
        lecture.classType || null,
        lecture.room || null,
        lecture.YER,
        lecture.SMS,
        lecture.FinalExamDate,
        lecture.courseCode,
        lecture.sectionNumber.toString(), // Ensure sectionNumber is a string
        lecture.position, // Ensure position is correct
        lecture.YER,
        lecture.SMS
      ];

      await new Promise((resolve, reject) => {
        db.run(updateQuery, values, function (err) {
          if (err) {
            reject(err);
          } else {
            // If no rows were affected, it means the WHERE condition wasn't met,
            // so we need to perform an INSERT instead
            if (this.changes === 0) {
              resolve();
            } else {
              // The row was updated, so we skip the INSERT
              resolve();
            }
          }
        });
      });
    }
  }

  db.close();
}







exports.updateDataIntoCoursesTable = async (lecturesInfo) => updatedCoursesTable(lecturesInfo);








exports.ReadAllGroupLinks = async (courseCode) => {
  return new Promise((resolve, reject) => {
    // Open the database connection
    const db = new sqlite3.Database("./databases/courseDatabase.db");

    // Build the query
    const query = `
                    SELECT courseCode, sectionNumber, GroupLink, year, semester,FinalExamDate,day
                    FROM courses
                    WHERE courseCode = ? AND position = 1;
                `;

    // Execute the query
    db.all(query, [courseCode], (err, rows) => {
      // Close the database connection after reading
      db.close();

      if (err) {
        console.error("Error reading data:", err);
        reject(err);
      } else {
        // Format and display the result
        resolve(formatData(courseCode, rows));
      }
    });
  });
};

exports.ReadAllCourseInformation = (courseCode, EnableFormating = false) => {
  return new Promise((resolve, reject) => {
    // Open the database connection
    const db = new sqlite3.Database("./databases/courseDatabase.db");
    // Check if courseCode is provided
    if (!courseCode || courseCode.trim() === "") {
      console.error("No course code provided");
      reject("No course code provided");
      return; // Exit the function early
    }
    // Build the query
    const query = `
                    SELECT FinalExamDate, sectionNumber, instructor, day, startTime, endTime, totalTimeInMinutes, classType, room, position, GroupLink, year, semester
                    FROM courses
                    WHERE courseCode = ? AND sectionNumber > 0;
                `;

    // Execute the query
    db.all(query, [courseCode], (err, rows) => {
      // Close the database connection after reading
      db.close();

      if (err) {
        console.error("Error reading data:", err);
        reject(err);
      } else {
        // Format and display the result
        if (!EnableFormating) {
          const formattedData = formatDataforCourseInformation(courseCode, rows);
          resolve(formattedData);
        } else {
          const jsonData = JSON.stringify(rows); // Convert rows to JSON format
          resolve(jsonData); // Resolve with JSON data
        }

      }
    });
  });
};

// ADMIN METHOD'S
async function editLink(courseCode, sectionNumber, newLink) {
  const db = new sqlite3.Database("./databases/courseDatabase.db");
  return new Promise((resolve, reject) => {
    const updateLinkQuery = `
                      UPDATE courses 
                      SET GroupLink = ? 
                      WHERE courseCode = ? AND sectionNumber = ? AND position = 1;
                  `;

    db.run(updateLinkQuery, [newLink, courseCode, sectionNumber], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    db.close();
  });
}
exports.editLink = (courseCode, sectionNumber, newLink) =>
  editLink(courseCode, sectionNumber, newLink);

exports.deleteLink = (courseCode, sectionNumber) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./databases/courseDatabase.db");
    const deleteLinkQuery = `
                    UPDATE courses 
                    SET GroupLink = NULL 
                    WHERE courseCode = ? AND sectionNumber = ? AND position = 1;
                `;

    db.run(deleteLinkQuery, [courseCode, sectionNumber], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    db.close();
  });
};

//  -----------------------------------------------------------------\

exports.addCourseCode = (courseCode, numberOfSections = 0, isAddBilding) => {
  let courseData = [];
  let days = isAddBilding ? "Colages" : null;
  //MAKE IF numberOfSections NO VALUE IT WILL BE 0
  for (let i = 0; i <= numberOfSections; i++) {
    courseData.push({
      courseCode,
      FinalExamDate: isAddBilding ? `major name ${i}` : null, // Adjust this as per your requirement
      sectionNumber: i,
      instructor: null,
      day: days,
      startTime: null,
      endTime: null,
      totalTimeInMinutes: null,
      classType: null,
      room: null,
      YER: "2023", // Adjust this as per your requirement
      SMS: "2", // Adjust this as per your requirement
      position: 1,
      GroupLink: null,
    });
  }

  insertDataIntoCoursesTable(courseData);
};

// Add data to the database
exports.addToDatabaseAPI = (
  UserCommandWithoutFirstChar,
  sectionNumber,
  fullLink
) => {
  console.log("im here eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  console.log();
  const isValidWhatsAppLink = (link) =>
    /^https:\/\/chat\.whatsapp\.com\/(.+)$/i.test(link);
  let resultString;

  if (sectionNumber >= 0) {
    if (isValidWhatsAppLink(fullLink)) {
      return checkExistingLink(
        UserCommandWithoutFirstChar,
        sectionNumber,
        fullLink
      )
        .then((existingLink) => {
          if (existingLink === null || existingLink === "") {
            return editLink(
              UserCommandWithoutFirstChar,
              sectionNumber,
              fullLink
            );
          } else {
            return Promise.reject("Course already has a link.");
          }
        })
        .then(() => {
          resultString = `Link updated successfully for ${UserCommandWithoutFirstChar}, section ${sectionNumber}!`;
          return resultString; // Return the result string
        })
        .catch((error) => {
          resultString = error;
          return resultString; // Return the error message
        });
    } else {
      resultString =
        "Invalid WhatsApp link format. Please use a valid link starting with 'https://chat.whatsapp.com/' and having the required length.";
    }
  } else {
    resultString =
      sectionNumber < 0
        ? "Invalid section number. Please provide a non-negative section number."
        : "Invalid command format. Please use $courseCode Number link.";
  }

  // Return the result string immediately
  return Promise.resolve(resultString);
};

exports.addToDatabase = (
  UserCommandWithoutFirstChar,
  sectionNumber,
  fullLink,
  commandArrayLength
) => {
  const isValidWhatsAppLink = (link) =>
    /^https:\/\/chat\.whatsapp\.com\/(.+)$/i.test(link);
  let resultString;

  if (sectionNumber >= 0 && commandArrayLength === 3) {
    if (isValidWhatsAppLink(fullLink)) {
      return checkExistingLink(
        UserCommandWithoutFirstChar,
        sectionNumber,
        fullLink
      )
        .then((existingLink) => {
          if (existingLink === null || existingLink === "") {
            return editLink(
              UserCommandWithoutFirstChar,
              sectionNumber,
              fullLink
            );
          } else {
            return Promise.reject("Course already has a link.");
          }
        })
        .then(() => {
          resultString = `Link updated successfully for ${UserCommandWithoutFirstChar}, section ${sectionNumber}!`;
          return resultString; // Return the result string
        })
        .catch((error) => {
          resultString = error;
          return resultString; // Return the error message
        });
    } else {
      resultString =
        "Invalid WhatsApp link format. Please use a valid link starting with 'https://chat.whatsapp.com/' and having the required length.";
    }
  } else {
    resultString =
      sectionNumber < 0
        ? "Invalid section number. Please provide a non-negative section number."
        : "Invalid command format. Please use $courseCode Number link.";
  }

  // Return the result string immediately
  return Promise.resolve(resultString);
};
