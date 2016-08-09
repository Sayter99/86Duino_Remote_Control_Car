
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: '86Duino Remote Control Car', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear() });
};
