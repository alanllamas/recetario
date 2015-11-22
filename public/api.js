var express 	= require('express'),
	Bourne		= require('bourne'),
	bodyParser 	= require('body-parser'),
	dbmat		= new Bourne('materias.json'),
	dbrec 		= new Bourne('recetas.json'),
	router 		= express.Router();



router
	// .use(bodyParser.json()).route('/materias')
		.get(function(req,res) { 
			
			res.json(dbmat)

		})
		.post(function  (req,res) {
			var materia = req.body;
			console.log(materia);
				materia.id = req.materia.id;

			dbmat.insert(materia, function  (err, data) {
				res.json(data)
			})
		});
router
	.param('id', function  (req,res,next) {
		req.dbQuery = {id:parseInt(req.params.id, 10)};
	})
	.route('materias/:id')
		.get(function (req,res) {
			dbmat.findOne(req.dbQuery, function (err, data) {
				res.json(data);
			})
		})
		.put(function (req,res) {
			var materia =req.body;
			delete materia.$promise;
			delete materia.$resolved;
			dbmat.update(req.dbQuery, materia, function (err,data) {
				res.json(data[0]);
			});
		})
		.delete(function  (req ,res) {
			dbmat.delete(req.dbQuery, function (res,req) {
				res.json(null);
			});
		});

module.exports = router;