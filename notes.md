Order of the Code Matters
Order of Routes(/hello, /home , /about) matters a lot
* means anything or not anything like in pattern a*b will follow all patterns like atuirb, ab, afifdfb
+ means multiple copies of that character after which it is written like ab+c will follow abc, abbbc, abbbbc 


app.use('/user', [rh1, rh2, rh3], rh4, rh5) where rh = route hander or (req, res, next) => {}

this the cluster url not of the dataBase -> 'mongodb+srv://hariomtiwari2288:iPe2ZgxeqnRQVRyR@hariomfirstdb.egr0c.mongodb.net'

but adding /DB_Name will create a DataBase like below shown
'mongodb+srv://hariomtiwari2288:iPe2ZgxeqnRQVRyR@hariomfirstdb.egr0c.mongodb.net/devTinder'
always use async-await when dealing with DB operation also right the code in try-catch block

app.use(express.json()) is middleware to convert the Json data to Js Obj and append it to the request Object

any other data which is not in the schema will gets ignored by the API's
NEVER TRUST req.body

Whenever you are writing the schema function don't use arrow function 
when we use unique = true it will automatically creates a index in DB for efficient search

$nin not in 
$ne not equals
