var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
   
    $scope.recetaNombre="";
    $scope.materias = [];
	$scope.materia1 = "";
	$scope.cantidad1 = 0;
	$scope.medicion1 = "";
	$scope.pesopza = 0;
	$scope.precio1 = 0;
	$scope.meds = ["gr","ml","pza"];
	$scope.recetas = [];
	$scope.base = [];
	$scope.ingrediente = "";
	$scope.cantidad2 = 0;
	$scope.medicion2 = "";

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

    		// evita que haya entradas iguales
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
    	

		};
	});

			$scope.receta = {};
			$scope.receta.id;
			$scope.receta.nombre = "";
			$scope.receta.ingredientes = [];
			$scope.receta.costo = 0;
			$scope.receta.cantidad = 0;
			
	$('#agregarIngrediente').click(function(event) {
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
			// obtiene el precio segun la cantidad del producto
			$scope.ingre.precio = function () {
				
				precio = $scope.ingre.cantidad * $scope.ingrediente.precio / $scope.ingrediente.cantidad;

				return precio;

			}();

			// agrega el ingrediente al array de ingrediente
			if ($scope.receta.length == 0) {

    			ing.push($scope.ingre);
    		// evita que haya entradas repetidas
    		}else{

    			counter = 0;

	    		for (var i = 0; i < $scope.receta.length; i++) {
	    		
	    			if ($scope.ingre.materia == $scope.receta[i].materia) {
	    				
	    				counter +=1;
	    			};
	    			
	    		};
	    			
	    		if (counter == 0) {
					
					ing.push($scope.ingre);

	    		};
    		};

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
					// cantidad = cantidad;
					};
					cantidadTotal += cantidad;

				};
				return cantidadTotal;
			})();

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
		};
	});
		// esconde el input del nombre de la receta
    $('#Receta').blur(function(event) {
    	if ($scope.recetaNombre != "") {
    		$scope.receta.nombre = $scope.recetaNombre;
    		$('#Receta').hide();
    	};
    	event.preventDefault();
    });
    $('#agregarReceta').click(function(event) {
    	$scope.recetas.push($scope.receta)
    	for (var i = 0; i < $scope.recetas.length; i++) {
    		$scope.recetas[i]
    	console.log($scope.recetas[i]);
    	console.log($scope.recetas[i].id);
    	};
    });




});