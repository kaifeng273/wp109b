資工一 吳俊億 110910528
##第一題  檔案 star.js
```
function star(n)
{
    for(var i=0;i<n;i++)
    console.log('*')
}
star(9)
```
執行結果
```
PS C:\Users\88698\Desktop\ccc net\wp109b\week6> deno run star.js
*
*
*
*
*
*
*
*
*
```
##第二題  檔案 star.js
```
function between(a,r)
{
    for(var i=a;i<=r;++i)
    console.log(i)
}
between(2,11)
```
執行結果
```
PS C:\Users\88698\Desktop\ccc net\wp109b\week6> deno run between.js
2
3
4
5
6
7
8
9
10
11
```
##第三題  檔案 betweenPrime.js
```
function isPrime(n){
    if(n<2)
    return 0
    for(var x=2;x*x<=n;++x)
    if(n%x==0)
    return 0
    return 1
}
function between(a,b){
    for(var i=a;i<=b;++i)
    if(isPrime(i))
    console.log(i)
}
between(2,20)
```
執行結果
```
PS C:\Users\88698\Desktop\ccc net\wp109b\week6> deno run betweenPrime.js
2
3
5
7
11
13
17
19
```