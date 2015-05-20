// var Pushwoosh
// Pushwoosh = function(app_code, auth_token){
// 	this.name = "pushwoosh";
// 	this.keys = {
// 		app_code : app_code,
// 		auth_token : auth_token
// 	};
// 	this.validate = function(callback){
// 		return this.client().getTags(this.keys.auth_token)(function(err, result){
// 			console.log(err, response)
// 			return callback(err, response);
// 		})
// 	}
// 	this.client = function(){
// 		return new (require('pushwoosh-client').Pushwoosh)({
// 			app_code : this.keys.app_code,
// 			auth_token : this.keys.auth_token
// 		});
// 	};
// 	return this;
// };
// module.exports = Pushwoosh;