var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'http://45.63.6.145:9933/'
});
const crypto = require('crypto');
module.exports = {
	searchKeyword: function (document, callBack) {

		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		var id = crypto.createHash('sha1').update(current_date + random).digest('hex');

		client.create({
			index: "test",
			type: "_doc",
			id: id,
			body: document
		}, function (error, response) {
			if (error) {
				callBack(error, null);
			} else {
				callBack(null, response);
			}
		});
	}
}