const sportStars = [
    {id : '축구', name : 'son'},
    {id : '야구', name : '오타니'}
]

const s = sportStars.find(s=> (s.id == '축구'))
console.log(s)  // { id: '축구', name: 'son' }