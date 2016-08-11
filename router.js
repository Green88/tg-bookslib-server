/**
 * Created by Tania on 07/08/16.
 */

/**
 * @param {App} app
 */
module.exports = function(app) {
    app.get('/books', function(req, res) {
        res.send({payload: 'ok'});
    });

    app.post('/books', function(req, res) {

        console.log(req.body);
        res.send({payload: 'ok'});
    });
};