// promise-demo.js
// Promise "객체" : 약속을 지키는 친구

let promise = new Promise(function(resolve, reject) {//매개변수로 함수를 받는다.
	// executor : 이 친구가 할 일
	setTimeout(() => resolve("완료"), 3000);
	// 일을 다 하면 무조건 콜백함수 resolve() 또는 reject() 둘 중 하나는 호출
	// 할 일을 성공적으로 하면 resolve(결과)
	//       실패하면 reject(에러)
}); // 친구 소환 

// promise의 기본 메서드 : promise가 일 다 하고(= 약속 다 지키고) 호출해야하는 함수
promise.then(
	function(result){
		console.log(result);
	},
	function(error){}
);