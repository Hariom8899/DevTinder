const authAdmin = (req, res, next) =>{
    const token = "xyz";
    const isAdmin = token === "xyz";
    if(!isAdmin){ res.status(401).send('Unauthorized Admin');}
    else next();
}

const authUser = (req, res, next) =>{
    const token = "xyz";
    const isAdmin = token === "xytz";
    if(!isAdmin){ res.status(401).send('Unauthorized User');}
    else next();
}

module.exports = {authAdmin, authUser};