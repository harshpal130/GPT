const { Server } = require("socket.io");
const cookie = require("cookie")
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const aiService = require("../services/ai.service")
const messageModel = require("../models/message.model")
const {createMemory, queryMemory}= require("../services/vector.service");
const { text } = require("express");

function initSocketServer(httpServer){
    const io = new Server(httpServer,{})

    io.use(async(socket, next)=>{

        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

        if(!cookies.token){
            next(new Error("authention error no token provided"))
        }

        try{
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)

            const user = await userModel.findById(decoded.id)
            socket.user = user

            next()

        }catch(err){
            next(new Error("authention error :invalid token"))

        }

    })

    io.on("connection",(socket)=>{
       socket.on("ai-message", async(messagePayLoad)=>{

        console.log(messagePayLoad)

        /* const message = await messageModel.create({
            chat:messagePayLoad.chat,
            user:socket.user._id,
            content:messagePayLoad.content,
            role:"user"
        })

        

        const vectors = await aiService.generateVector(messagePayLoad.content)
        console.log("vector generated",vectors) */
        
        const vectors = await aiService.generateVector(messagePayLoad.content)

        const message=await messageModel.create({
            chat:messagePayLoad.chat,
            user:socket.user._id,
            content:messagePayLoad.content,
            role:"user"
        })
        
    
        await createMemory({
            vectors,
            messageId:message._id,
            metadata:{
                chat:messagePayLoad.chat,
                user:socket.user._id,
                text:messagePayLoad.content
            }
        })
        
        
        const memory = await queryMemory({
            queryVector:vectors,
            limit:3,
            metadata:{}
            
        })

        console.log(memory)

        await createMemory({
            vectors,
            messageId:message._id,
            metadata:{
                chat:messagePayLoad.chat,
                user:socket.user._id,
                text:messagePayLoad.content
            }
        })

        const chatHistory = (await messageModel.find({
            chat:messagePayLoad.chat
        }).sort({createdAt :-1}).limit(20).lean()).reverse()

        
        

        // messagePayLoad = {
        //     chat: chat.Id,
        //     content:message text content
        // }
        
        const stm = chatHistory.map(item=>{
            return{
                role:item.role,
                parts:[{text:item.content}]
            }
        })

        const ltm = [
            {
                role:"user",
                parts:[{text:`
                    these are some previous message use them to generate response

                    ${memory.map(item=> item.metadata.text).join("\n")}
                    `}]
            }
        ]

        console.log([...ltm , ...stm])

        const response = await aiService.generateResponse([...ltm, ...stm])

        /* const responseMessage = await messageModel.create({

            chat: messagePayLoad.chat,
            user: socket.user._id,
            content: response,
            role: "model"
        })

        const responseVector = await aiService.generateVector(response)

 */ 
        socket.emit("ai-response",{
            content:response,
            chat:messagePayLoad.chat
        })

        const [responseMessage,responseVector] = await Promise.all([
            messageModel.create({

            chat: messagePayLoad.chat,
            user: socket.user._id,
            content: response,
            role: "model"
        }),
        aiService.generateVector(response)

        ])


        await createMemory({
            vectors:responseVector,
            messageId:responseMessage._id,
            metadata:{
                chat:messagePayLoad.chat,
                user:socket.user.id,
                text:response
            }
        })

       
       })
    })
}

module.exports= initSocketServer;