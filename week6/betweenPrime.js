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