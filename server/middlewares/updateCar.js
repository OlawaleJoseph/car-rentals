const verifyUpdateCarInfo = (req, res, next) => {
    if(!req.params.id) return res.status(400).send("Please Select a Car");
    if(!req.body.price && !req.body.description ) return res.status(400).send("Fill the required fields");
    if (req.body.price && typeof parseInt(req.body.price) !== "number") return res.status(400).send("Price is not a number");
    if (req.body.description && typeof req.body.description !== "string") return res.status(400).send("Invalid Description");
    
    next();
}

export default verifyUpdateCarInfo;