
module.exports.home = async (req, res) => {
    try{
        return res.status(200).json({message: "hello its homepage"});
    }catch(err){
        console.log(err);
    }
}