const express = require('express')
const { parentPort } = require('worker_threads')
const app = express()
app.listen(1234)

let music1 = {
    title : 'Lover',
    singer : 'Taylor Swift',
    likeNum : 47675,
}

let music2 = {
    title : 'Lost Stars',
    singer : 'Adam Levine',
    likeNum : 261194,
}

let music3 = {
    title : 'Wonderwall',
    singer : 'Oasis',
    likeNum : 40651,
}

let db = new Map()
let id = 1
db.set(id++, music1)
db.set(id++, music2)
db.set(id++, music3)

// 전체 음악 조회
app.get('/musics', function(req, res) {
    let musics = {}
    if (db.size !== 0) {
        db.forEach(function (value, key) {
            musics[key] = value
        })
        res.json(musics)
    } else {
        res.status(404).json({
            message : "조회할 음악이 없습니다."
        })
    }
})

// 개별 음악 조회 
app.get('/musics/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    const music = db.get(id)
    // 해당 아이디의 음악이 있으면 
    if( music ) {
        res.json(music)
    } else { // 해당 아이디의 음악이 없으면
        res.status(404).json({
            message : "노래 정보를 찾을 수 없습니다."
        })
    }
})

// 새로운 음악 등록
app.use(express.json())
app.post('/musics', (req, res) => {
    console.log(req.body)
    const title = req.body.title
    const singer = req.body.singer
    const likeNum = req.body.likeNum

    if(title && singer && likeNum) {
        db.set(id++, req.body)
        res.json({
        message : `새로운 노래 ${db.get(id-1).title} 등록되었습니다.`
        })
    } else {
        res.status(400).json({
            message : "요청 값을 제대로 보내주세요."
        })
    }  
})

// 개별 음악 삭제
app. delete('/musics/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)

    let music = db.get(id)
    // const title = music.title

    if( music ) {
        const title = music.title
        db.delete(id)
        res.json({
            message : `${title} 삭제되었습니다.`
        })
    } else {
        res.status(404).json({
            message : '등록되어 있지 않은 노래입니다.'
        })
    }
})

// 전체 음악 삭제
app.delete('/musics', (req, res) => {
    let msg = ""
    if(db.size >= 1) {
        db.clear()
        msg = "전체 음악이 삭제되었습니다."
    } else {
        msg = "삭제할 음악이 없습니다."
    }
    res.json({
        message : msg
    })
})

let user1 = {
    name : "meteor"
}

let user2 = {
    name : "tommy"
}
let userdb = new Map()
userdb.set(1, user1)
userdb.set(2, user2)

// 계정 이름 변경
app.put('/users/:id', (req, res) =>{
    let {id} = req.params
    id = parseInt(id)

    const user = userdb.get(id)
    const curName = user.name
    let newName;
    if ( user == undefined){
        res.json({
            message : '요청하신 사용자는 가입하지 않은 사용자입니다.'
        })
    } else {
        newName = req.body.name
        user.name = newName
        db.set(id, user)
    }
    res.json({
        message : `사용자명이 ${curName}에서 ${newName}로 변경되었습니다.`
    })
})
