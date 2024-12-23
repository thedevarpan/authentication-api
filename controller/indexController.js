const indexController = (req, res) => {
    res.status(200).json({
        message: "Welcome to the API page",
        success: true,
    });
};


module.exports = {indexController};