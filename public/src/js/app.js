var app = angular.module('myApp', ['ngRoute','ngResource'])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				redirectTo: function(){
					return '/materias'
				}
			})
			.when('/materias',{
				controller: 'MateriasController',
				templateUrl: 'views/materiaprima.html'
			})
			.when('/nuevareceta',{
				controller: 'NuevaRecetaController',
				templateUrl: 'views/nuevareceta.html'
			})
			.when('/recetas' ,{
				controller: 'myCtrl',
				templateUrl: 'views/recetario.html'
			});
		$locationProvider.html5Mode(true);
		
	});

	app.controller('MateriasController', function ($scope, $location) {

		
	    $scope.materias = [];
		$scope.meds = ["gr","ml","pza"];
		$scope.materia1 = "";
		$scope.cantidad1 = 0;
		$scope.medicion1 = "";
		$scope.pesopza = 0;
		$scope.precio1 = 0;
	    // agrega el producto a la lista de materias primas
		$('#agregar').click(function(event) {

			if ($scope.materia1 && $scope.cantidad1 && $scope.medicion1 && $scope.precio1 != "") {
	    		$scope.materia = {};

	    		$scope.materia.materia = $scope.materia1;
	    		$scope.materia.cantidad = $scope.cantidad1;
	    		$scope.materia.medicion = $scope.medicion1;
	    		$scope.materia.precio = $scope.precio1;
	    		$scope.materia.id = $scope.materias.length + 1;

	    		// le da un peso a la materia prima si se mide por piezas
	    		if ($scope.materia.medicion == "pza") {
	    			
	    			$scope.materia.pesopza = $scope.pesopza ;
	    			console.log($scope.materia);
	    		};
	    		// fin

	    		// evita que haya entradas iguales y las agrega a materias
	    		if ($scope.materias.length == 0) {
	    			$scope.materias.push($scope.materia);
	    		}else{
	    			counter = 0;
		    		for (var i = 0; i < $scope.materias.length; i++) {
		    		
		    			if ($scope.materia.materia == $scope.materias[i].materia) {
		    				
		    				counter++;
		    			};
		    			
		    		};
		    			
		    		if (counter == 0) {
						$scope.materias.push($scope.materia);

		    		};
	    		};
	    		// fin

			};
		});
	});
	app.controller('NuevaRecetaController', function  ($scope, $location) {
	    $scope.recetaNombre="";
		$scope.recetas = [];
		$scope.base = [];
		$scope.ingrediente = "";
		$scope.cantidad2 = 0;
		$scope.medicion2 = "";
		$scope.receta = {};
		$scope.receta.id;
		$scope.receta.nombre = "";
		$scope.receta.ingredientes = [];
		$scope.receta.costo = 0;
	 	$scope.receta.cantidad = 0;
		// agrega un ingrediente al array receta
		$('#agregarIngrediente').click(function() {
			ing = $scope.receta.ingredientes;
			if ($scope.ingrediente && $scope.cantidad2  !== "") {

				$scope.ingre = {};
				$scope.ingre.id = $scope.receta.ingredientes.length +1 ;
				$scope.ingre.materia = $scope.ingrediente.materia;
				$scope.ingre.cantidad = $scope.cantidad2;
				$scope.ingre.medicion = $scope.ingrediente.medicion;

				// si hay un peso por pieza lo agrega

				if ($scope.ingrediente.pesopza) {
					$scope.ingre.pesopza = $scope.ingrediente.pesopza;
				};
				// fin

				// obtiene el precio segun la cantidad del producto
				$scope.ingre.precio = function () {
					
					precio = $scope.ingre.cantidad * $scope.ingrediente.precio / $scope.ingrediente.cantidad;

					return precio;

				}();
				// fin

				// si no tiene le agrega nombre a la receta
				if (!$scope.receta.nombre) {
			    	if ($scope.recetaNombre != "") {
			    		$scope.receta.nombre = $scope.recetaNombre;
			    		$('#Receta').hide();
			    	};
				};
		    	// fin

				// agrega el ingrediente al array de ingredientes en el objeto receta y evita que haya entradas repetidas
				if ($scope.receta.length == 0) {

	    			ing.push($scope.ingre);

	    		}else{

	    			counter = 0;

		    		for (var i = 0; i < $scope.receta.ingredientes.length; i++) {
		    		
		    			if ($scope.ingre.materia == $scope.receta.ingredientes[i].materia) {
		    				
		    				counter +=1;
		    			};
		    			
		    		};
		    			
		    		if (counter == 0) {
						
						ing.push($scope.ingre);

		    		};
	    			
	    		};
	    		// fin
	    		// le da un id a la receta
		    	$scope.receta.id = $scope.recetas.length + 1 ;

				//suma la cantidad total de la receta
				
				$scope.receta.cantidad = (function(){
					var cantidadTotal = 0;
					for (var i = 0; i < $scope.receta.ingredientes.length; i++) {
							console.log($scope.receta.ingredientes[i]);
							console.log($scope.receta.ingredientes[i].cantidad);
						if ($scope.receta.ingredientes[i].medicion == "pza") {
							console.log($scope.receta.ingredientes[i].pesopza);
							cantidad = $scope.receta.ingredientes[i].cantidad * $scope.receta.ingredientes[i].pesopza;
						}else{
							
							cantidad = Number($scope.receta.ingredientes[i].cantidad);
							console.log(typeof(cantidad));
						};
						cantidadTotal += cantidad;

					};
					return cantidadTotal;
				})();

				// fin

				// suma el costo total de la receta

				$scope.receta.costo = (function(){
					var costo = 0,
						costoTotal = 0;
					for (var i = 0; i < $scope.receta.ingredientes.length; i++) {

							
							console.log($scope.receta.ingredientes[i]);
							console.log($scope.receta.ingredientes[i].precio);
							costo += $scope.receta.ingredientes[i].precio;
							console.log(costo);
							costoTotal += costo;
							console.log(costoTotal);

					};
					return costoTotal;
				})();

				// fin
			};
		});

	    // evita que haya entradas iguales y las agrega al array recetas

	    $('#agregarReceta').click(function(event) {

			if ($scope.recetas.length == 0) {
				$scope.recetas.push($scope.receta);
			}else{
				counter = 0;
	    		for (var i = 0; i < $scope.recetas.length; i++) {
	    		
	    			if ($scope.receta.receta == $scope.recetas[i].receta) {
	    				
	    				counter++;
	    			};
	    			
	    		};
	    			
	    		if (counter == 0) {
					$scope.recetas.push($scope.receta);

	    		};
			};

	    });
	    // fin

		// esconde el input del nombre de la receta
	    $('#Receta').blur(function(event) {
	    	event.preventDefault();
	    });
	    // fin
	});

app.controller('myCtrl', function($scope,$location) {
   

	// hace funcionar los tabs y pills
	$(function(){ 
	    $('.nav-pills a').on('click', function (e) {
	        e.preventDefault();
	        $(this).tab('show');

	    });  
	    $('.nav-tabs a').on('click', function (e) {
	        e.preventDefault();
	        $(this).tab('show');
	    }); 
	});
	$scope.goNext = function (hash) { 
		$location.url(hash);
	};

	


});