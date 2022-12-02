const pool = require("./modules/db");
module.exports = class Controller {
    //CHECKED AUTH USER CONTROLLER
    
    static async CheckedUser (message, bot){
        const user = await pool.query(`SELECT * FROM users WHERE chat_id=${message.chat.id}`)
        const check = () => user.rows.length ? true: false
        if(check()){
            const {chat_id, first_name, last_name, username, birthday}  = user.rows[0]
            
            if(first_name && last_name && birthday){
                bot.sendMessage(message.chat.id, "Siz botda ro'yxatdan o'tgansiz!")
            }else{
                bot.sendMessage(message.chat.id, "Ro'yxatdan o'tishni yakunlamagansiz!", {
                    "reply_markup": {
                        "remove_keyboard": true
                    }
                })
                    this.CompleteFegistration(message, bot)
                
            }
            
        }else{
            bot.sendMessage(message.chat.id, "Siz botda ro'yxatdan o'tmagansiz!")
            bot.sendMessage(message.chat.id, "Botda ro'yxatdan o'tish uchun <b>'Ro'yxatdan o'tish'</b> tugmasini bosing!", {
                parse_mode: "HTML",
                "reply_markup": {
                    "resize_keyboard": true,
                    "one_time_keyboard": true,
                    "keyboard": [
                      [
                        "Ro'yxatdan o'tish"
                      ]
                    ]
                  }
              })
              
        }
    }
    //AUTH USER CONTROLLER
    static async MessageController (message, bot){
        const user = await pool.query(`SELECT * FROM users WHERE chat_id=${message.chat.id}`)
        const text = 'INSERT INTO users(chat_id, first_name, last_name, username, birthday) VALUES ($1, $2, $3, $4, $5) RETURNING *'
        
        const user_id = message.chat.id;
        if(message.text !== '/start'){
            if(message.text === "Ro'yxatdan o'tish"){
                await pool.query(text, [user_id, null, null, message.chat.username, null])
                bot.sendMessage(message.chat.id,'Ismingizni kiriting:', {
                    "reply_markup": {
                        "remove_keyboard": true
                      }
                })
            }
        }
        
    }
    static async CompleteFegistration (message, bot){
        let user =  await pool.query(`SELECT * FROM users WHERE chat_id=${message.chat.id}`)
        
        const check = () => user.rows.length ? true: false
        if(check()){
            let {chat_id, first_name, last_name, username, birthday} = user.rows[0]
            if(!first_name){
                console.log('test1');
                bot.sendMessage(message.chat.id,'Familayangizni kiriting:', {
                            "reply_markup": {
                                "remove_keyboard": true
                              }
                        })
                await pool.query(`UPDATE users SET "first_name" = '${message.text}' WHERE chat_id=${message.chat.id}`)
            }else if(!last_name){
                console.log('test2');
                bot.sendMessage(message.chat.id,"Tug'ilgan sanangizni kiriting:", {
                            "reply_markup": {
                                "remove_keyboard": true
                              }
                        })
                await pool.query(`UPDATE users SET "last_name" = '${message.text}' WHERE chat_id=${message.chat.id}`) 
            }else if(!birthday){
                console.log('test3');
                bot.sendMessage(message.chat.id, "Ro'yxatdan o'tish yakunlandi!", {
                            "reply_markup": {
                                "remove_keyboard": true
                              }
                        })
                await pool.query(`UPDATE users SET "birthday" = '${message.text}' WHERE chat_id=${message.chat.id}`)    
        }
        }
        
              
              
    }
}
