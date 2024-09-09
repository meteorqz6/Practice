const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json())

let db = new Map()
let id = 1

app
    .route('/channels')
    .get((req, res) =>{
        if(db.size) {
            let channels = []
            db.forEach(function(value) {
                channels.push(value)
             })
            res.status(200).json(channels)
        } else {
            res.status(404).json({
                message : "조회할 채널이 없습니다."
            })
        }
    })
    .post((req, res) =>{
        if (req.body.channelTitle) {
            db.set(id++, req.body)

            res.status(201).json({
                message : `${db.get(id-1).channelTitle} 채널을 응원합니다.`
            })
        } else {
            res.status(400).json({
                message : "요청 값을 제대로 보내주세요."
            })
        }
    }) // 채널 개별 생성 : db에 저장


app
    .route('/channels/:id')
    .get((req, res) =>{
        let {id} = req.params
        id = parseInt(id)
        const channel = db.get(id)
        if(channel) {
            res.status(200).json(channel)
        } else {
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
    })
    .put((req, res) =>{
        let {id} = req.params
        id = parseInt(id)
        const channel = db.get(id)
        //const oldTitle = channel.channelTitle // undefined일 때 오류 발생
        console.log(channel)
        if (channel) {
            const oldTitle = channel.channelTitle
            const newTitle = req.body.channelTitle
            channel.channelTitle = newTitle
            db.set(id, channel)
            res.json({
                message : `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> 수정 ${newTitle}`
            })
        } else {
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
    })
    .delete((req, res) =>{
        let {id} = req.params
        id = parseInt(id)
        const channel = db.get(id)
        if(channel) {
            db.delete(id)
            res.status(200).json({
                message : `${channel.channelTitle} 정상적으로 삭제되었습니다.`
            })
        } else {
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
    })