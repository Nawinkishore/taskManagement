import conn from '../config/db.js';
import sqlString from 'sqlstring';
import bcrypt from 'bcrypt';
export class authController {
    static async login(req, res) {
        let userData = req.body;
        let query = sqlString.format("SELECT * FROM USER WHERE EMAIL = ?", [userData.email]);
        conn.query(query, async (err, result) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Couldn't connect to the server",
                })
            }

            if (result && result[0] && result[0].length === 0) {
                return res.json({
                    success: false,
                    message: "User is not found"
                });
            }
            if (result && result[0] && result[0].isChecked == 0) {
                return res.json({ success: false, message: "User is not verified" });
            }
            let isMatch = await bcrypt.compare(userData.password, result[0].password );
            if (!isMatch) {
                return res.json({
                    success: false,
                    message: "Password is incorrect"
                });
            }
            else {
                return res.json({
                    success: true,
                    message: "User is successfully logged in"
                })
            }
        });
    }
    static async register(req, res) {
        let userData = req.body;

        let query = sqlString.format(`SELECT COUNT(*) as userCount FROM USER WHERE EMAIL = ?`, [userData.email]);
        conn.query(query, async (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,

                });
            }
            if (result[0].userCount > 0) {
                return res.json({
                    success: false,
                    message: "Email is already in use",
                });
            }
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(userData.password, salt);
            userData.password = hash;
            userData.conformPassword = hash;
            let query = sqlString.format('INSERT INTO user SET ?', [userData]);

            conn.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        message: 'err.message',
                    });
                }
                return res.json({ success: true, message: "success" });
            });
        });

    }
}