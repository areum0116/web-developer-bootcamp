const bcrypt = require('bcrypt');

// const hashPassword = async(pw) => {
//     const salt = bcrypt.genSalt(10);
//     // saltRounds : 해시 난이도. 낮아질수록 해시 과정 더 빠르게 처리.
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async(pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

const login = async(pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if(result) {
        console.log("LOGGED YOU IN! SUCCESSFUL MATCH.");
    } else {
        console.log("INCORRECT!");
    }
}

// hashPassword('monkey');

login('monkey', '$2b$12$49b6tQWafDtSYOeGCwDsv.NehdDr8VU4Av9lkdwvlcIu03gZ0fP.i');