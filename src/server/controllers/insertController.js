var es = require('../helpers/ElasticSearchService');
module.exports = {
        insert: insert
};

function insert(req, res) {
        var document = req.swagger.params.document.value;

        es.searchKeyword(document, function (error, response) {
                if (error) {
                        console.log(error);
                } else {
                        console.log('response', response);
                        res.json(response);
                }

        });

}
