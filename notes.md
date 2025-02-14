Order of the Code Matters
Order of Routes(/hello, /home , /about) matters a lot
* means anything or not anything like in pattern a*b will follow all patterns like atuirb, ab, afifdfb
+ means multiple copies of that character after which it is written like ab+c will follow abc, abbbc, abbbbc 


app.use('/user', [rh1, rh2, rh3], rh4, rh5) where rh = route hander or (req, res, next) => {}