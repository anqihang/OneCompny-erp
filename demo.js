// let a = {}
// // console.log(a instanceof Object);
// console.log(Array.isArray(a));
// let a = '11111111111';
// let b=''
// for (let index = 0; index < a.length; index++) {
//     if(index%3==0&&index!=0){
//         a = a.split('')
//         a.splice(index,0,'.');
//         index=index+1;
//         a=a.join('')
//         console.log(a);
//     }    
// }
// console.log(a);
// let a = 7;
// console.log(Math.ceil(a/6));
let arrbuf = new ArrayBuffer(16);
let view = new DataView(arrbuf);
console.log(view.byteLength);
view.setInt8(1,127);
console.log(view.getInt8(15));