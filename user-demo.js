const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json())

let db = new Map()
let id = 1

// 로그인
app.post('/login', (req, res) =>{
    console.log(req.body)
    const id = req.body.id
    const pwd = req.body.pwd

    if(id && pwd) {

    } else{

    }
})
// 회원가입
app.post('/join', (req, res) =>{
    console.log(req.body)
    const { userId, password, name } = req.body

    // 필수 입력값 체크
    if(!userId || !password || !name) {
        return res.status(400).json({
            message : '입력 값을 다시 확인해주세요.'
        })
    }

    db.set(id++, req.body)
    res.status(201).json({
        message : `${db.get(id-1).name}님 환영합니다.`
    })
})

app 
    .route('/users/:id')
    .get((req, res) =>{
        let {id} = req.params
        id = parseInt(id)
        const user = db.get(id)
        if(user){
            res.status(200).json({
                userId : user.userId,
                name : user.name
            })
        } else {
            res.status(404).json({
                message : "회원 정보가 없습니다."
            })
        }
    })
    .delete((req, res) =>{
        let {id} = req.params
        id = parseInt(id)
    
        const user = db.get(id)
    
        if(user){
            db.delete(id)
    
            res.status(200).json({
                message : `${user.name}님 다음에 또 뵙겠습니다.`
            })
        } else {
            res.status(404).json({
                message : "회원 정보가 없습니다."
            })
        }
    })

// 회원 개별 조회 
// app.get('/users/:id', (req, res) =>{
//     let {id} = req.params
//     id = parseInt(id)
//     const user = db.get(id)
//     if(user){
//         res.status(200).json({
//             userId : user.userId,
//             name : user.name
//         })
//     } else {
//         res.status(404).json({
//             message : "회원 정보가 없습니다."
//         })
//     }

// })

// 회원 개별 탈퇴
// app.delete('/users/:id', (req, res) =>{
//     let {id} = req.params
//     id = parseInt(id)

//     const user = db.get(id)

//     if(user){
//         db.delete(id)

//         res.status(200).json({
//             message : `${user.name}님 다음에 또 뵙겠습니다.`
//         })
//     } else {
//         res.status(404).json({
//             message : "회원 정보가 없습니다."
//         })
//     }
// })