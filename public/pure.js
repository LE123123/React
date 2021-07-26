// // function add(first, second) {
// //     return first + second;
// // }

// // var add = function(first, second) {
// //     return first + second;
// // ;}

// // //화살표 함수는 익명 함수를 선언하여 변수에 대입하는 방법과 유사하다

// // let add_1 = (first, second) => {
// //     return first + second;
// // };

// // let add_2 = (first, second) => first + second

// // let addAndMultiple = (first, second) => ({add_1: first + second, multiply: first + second});
// // //객체 반환

// // //()안에는 기존 함수에서 사용하던 파라미터를 => 다음 {}안에는 return하고 싶은 내용을 적으면 된다.

// // //'계단형 함수 선언'과 같은 구조가 만들어지지 않게 해 줄 수 있다.

// // function addNumber(num) {
// //     return function(value) {
// //         return num + value;
// //     }
// // }

// // let addNumber = (num) => (value) => num + value;


// //callback 함수

// plus = function(a, b, callback) {
//     //이떄 a와 b는 변수 callback 은 함수이름이다.
//     var result = a + b;
//     callback(result);
// }

// plus(5, 10, function(res) {
//     console.log(res);
// })



// const objA = {
//     name: 'a',
//     aFunc: function() {
//         console.log(this.name);
//     },
// }

// const objB = {
//     name: 'b',
// }

// objA.aFunc() // (1)

// // objA.aFunc.bind(objB) // (2)

// const foo = objA.aFunc.bind(objB) // ()
// foo();
