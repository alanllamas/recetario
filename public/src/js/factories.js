angular.module('MyApp').factory('Materia', function  ($resource) {
	return $resource('/api/materia/:id',{id:'@id'},{
		'update' :{method: 'PUT'}
	})
})