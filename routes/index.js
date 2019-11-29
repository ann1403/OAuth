exports.index = function(req, res) {
    res.render('index', {
        title: 'Passport JS',
        user: req.user
    });
};