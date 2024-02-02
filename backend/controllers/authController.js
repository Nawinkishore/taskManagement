import conn from '../config/db.js';
import sqlString from 'sqlstring';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
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

            if (!result || !result[0]) {
                return res.json({
                    success: false,
                    message: "User is not found"
                });
            }
            if (result[0].isChecked == 0) {
                return res.json({ success: false, message: "User is not verified" });
            }
            let isMatch = await bcrypt.compare(userData.password, result[0].password);
            if (!isMatch) {
                return res.json({
                    success: false,
                    message: "Password is incorrect"
                });
            }
            else {
                return res.json({
                    success: true,
                    message: "User is successfully logged in",
                    result,
                })
            }
        });
    }
    static async register(req, res) {
        let userData = req.body;
        let insertObj ={
            userId:uuidv4(),
            
        }
        userData = {...userData, ...insertObj};
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
            // console.log(userData);
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
    static async  getDetails (req, res){
        const { id } = req.params;
        let query =  sqlString.format(`SELECT  * FROM USER WHERE USERID =? `,[id] )
        conn.query(query,(err,result) => {
            if(err){
                return res.json({
                    success: false,
                    message: err.message,
                })
            }
            return res.json({
                success: true,
                message:"user successfully found",
                result,
            })
        });
    }
}