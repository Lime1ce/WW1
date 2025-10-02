import express from "express"
import cors from "cors"
// import pkg from "pg" 
import database from "./services/database.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import productRoute from "./routes/productRoute.js"
import memberRoute from "./routes/memberRoute.js"
import cookieParser from "cookie-parser"
import cartRoute from "./routes/cartRoute.js"

dotenv.config()


const app=express()
const port = process.env.PORT

app.use("/img_pd",express.static("img_pd"))
app.use("/img_mem",express.static("img_mem"))

// กำหนด Option ของ cors เพิ่มเติมเมื่อมีการส่งข้อมูล Cookie หรือ Header
app.use(cors({
    origin:[
        'http://localhost', 'http://127.0.0.1',
        'http://localhost:5173','http://127.0.0.1:5173',
        'http://localhost:4173','http://127.0.0.1:4173'
    ], //Domain ของ Frontend
    methods:['GET','POST','PUT','DELETE'], //Method ที่อนุญาต
    credentials:true  //ให้ส่งข้อมูล Header+Cookie ได้
}))

app.use("/img_pd",express.static("img_pd"))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(productRoute)
app.use(memberRoute)
app.use(cartRoute)
// app.get("/products",async (req,res)=>{
//     console.log(`GET /products is requested`)
//     try{
//         const strQry="SELECT * FROM products"
//         const result = await database.query(strQry)
//         return res.status(200).json(result.rows)
//     }
//     catch(err){
//         return res.status(500).json({
//             message:err.message
//         })
//     }
// })

// app.post('/products', async(req,res)=>{
//     console.log(`POST /products is requested.`)
//     const bodyData= req.body
//     try{
//         if(!bodyData.pdId || !bodyData.pdName){
//             return res.status(422).json({message: `ERROR pdId and pdName is required.`})
//         }

//         const chkRow =await database.query({
//             text:`SELECT * FROM products WHERE "pdId"= $1`,
//             values:[req.body.pdId]
//         })
//         if(chkRow.rowCount!=0){
//             return res.status(409).json({message: `ERROR pdId ${bodyData.pdId} is exists.`})
//         }

//         const result =await database.query({
//             text:` INSERT INTO "products" ("pdId","pdName","pdPrice","pdTypeId","brandId") 
//                     VALUES ($1,$2,$3,$4,$5) `,
//             values:[
//                 req.body.pdId,
//                 req.body.pdName,
//                 req.body.pdPrice,
//                 req.body.pdTypeId,
//                 req.body.brandId
//             ]
//         })
//         bodyData.createDate = new Date()
//         bodyData.message = "ok"
//         res.status(201).json(bodyData)
//     }
//     catch(err){
//         return res.status(500).json({message:err.message})
//     }

    
// })

app.listen(port,()=>{
    console.log(`Server is Listen on PORT ${port}`)
})

app.get('/',(req,res)=>{
    console.log(`GET / is Requested.`)
    res.status(200).json({
        message: "ok"
    })
})