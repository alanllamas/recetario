var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
   
    $scope.recetaNombre="";
    $scope.materias = [];
	$scope.materia1 = "";
	$scope.cantidad1 = "";
	$scope.medicion1 = "";
	$scope.precio1 = "";
	$scope.meds = ["gr","ml","pza"];
	$scope.recetas = [];
	$scope.base = [];
	$scope.ingrediente = "";
	$scope.cantidad2 = "";
	$scope.medicion2 = "";

	
    // agrega el producto a la lista de materias primas
	$('#agregar').click(function(event) {

		if ($scope.materia1 && $scope.cantidad1 && $scope.medicion1 && $scope.precio1 != "") {
    		$scope.materia = {};

    		$scope.materia.materia = $scope.materia1;
    		$scope.materia.cantidad = $scope.cantidad1;
    		$scope.materia.medicion = $scope.medicion1;
    		$scope.materia.precio = $scope.precio1;
    		$scope.materia.id = $scope.materias.length + 1;

    		// evita que haya entradas iguales
    		if ($scope.materias.length == 0) {
    			$scope.materias.push($scope.materia);
    		}else{
    			counter = 0;
	    		for (var i = 0; i < $scope.materias.length; i++) {
	    		
	    			if ($scope.materia.materia == $scope.materias[i].materia) {
	    				
	    				counter +=1;
	    			};
	    			
	    		};
	    			
	    		if (counter == 0) {
					$scope.materias.push($scope.materia);

	    		};
    		};
    	

		};
	});

			$scope.receta = [];
	$('#agregarIngrediente').click(function(event) {
		if ($scope.ingrediente && $scope.cantidad2 && $scope.medicion2 !== "") {

			$scope.ingre = {};
			$scope.ingre.materia = $scope.ingrediente.materia;
			$scope.ingre.cantidad = $scope.cantidad2;
			$scope.ingre.medicion = $scope.medicion2;

			if ($scope.receta.length == 0) {
    			$scope.receta.push($scope.materia);
    		}else{
    			counter = 0;
	    		for (var i = 0; i < $scope.receta.length; i++) {
	    		
	    			if ($scope.ingre.materia == $scope.receta[i].materia) {
	    				
	    				counter +=1;
	    			};
	    			
	    		};
	    			
	    		if (counter == 0) {
					
					$scope.receta.push($scope.ingre);

	    		};
    		};
			//falta hacer el costeador en esta parte
		};
	});

		// esconde el input del nombre de la receta
    $('#Receta').blur(function(event) {
    	if ($scope.recetaNombre != "") {
    		$('#Receta').hide();
    	};
    	event.preventDefault();
    });
    $('#agregarReceta').click(function(event) {
    	$scope.recetas.push($scope.receta)
    	console.log($scope.recetas);
    });




});