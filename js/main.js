	//Variables

	var paisesJSON = {
	"paises":[
	    {"nombre":"Argentina", "codigo":"AR"},
	    {"nombre":"Bolivia", "codigo":"BO"}, 
	    {"nombre":"Brasil", "codigo":"BR"},
	    {"nombre":"Chile", "codigo":"CL"},
	    {"nombre":"Paraguay", "codigo":"PY"},
	    {"nombre":"Uruguay", "codigo":"UY"},
	]
	};

	var paisesArray = paisesJSON.paises;

	var preguntas = [
	{	
		codigo:0,
		pregunta:"¿Cuál es tu lenguaje de programación preferido?",
		respuestas:["Javascript","Java","C#"]
	},
	{	
		codigo:1,
		pregunta:"¿Cuál es tu sistema operativo preferido?",
		respuestas:["Windows","Linux","Solaris"]
	},
	{	
		codigo:2,
		pregunta:"¿Qué editor de texto usás?",
		respuestas:["Sublime","Visual Studio","Atom"]
	},
	{	
		codigo:3,
		pregunta:"¿Cuál fue el primer lenguaje de programación que aprendiste?",
		respuestas:["Javascript","Java","C#"]
	}]

	//Función para crear el select de objetos

	function crearSelect(){
		var selectPaises = `<label for="paises">País de residencia</label><select name="paises" id="paises"><option value="0">Seleccione una opción</option></select>`;
		$('form').append(selectPaises);
	};

	//Función para crear las opciones de país recorriendo el array

	function crearOpciones(opciones){
		$.each(opciones,function(index,elem){
			var option = `<option value="${elem.codigo}">${elem.nombre}</option>`
			$('#paises').append(option);
		});
	};

	//Función que crea las preguntas

	function crearPreguntas(opciones){
		$.each(opciones,function(index,elem){
			var divPregunta = 	`<div id="pregunta${index}" class="divPregunta">
								<label for="enunciado${index}">${elem.pregunta}</label>
								</div>`
			$("form").append(divPregunta)
			var codigo = index;
			$.each(elem.respuestas, function(index,elem){
				var radioRespuesta = `<input type="radio" name="enunciado${index} value=${codigo}"><label>${elem}</label>`
				var idDiv = "pregunta"+codigo;
				$('#'+idDiv).append(radioRespuesta);
			})
			
			// var datoPregunta = elem.pregunta;
			// console.log(datoPregunta)
			// var labelPregunta = `<label for="enunciado${index}">${datoPregunta}</label>`;
			// var codigoPregunta = elem.codigo;
			// $('form').append(divPregunta);
			// $("#0").append(labelPregunta);

			// 
			// 	console.log(radioRespuesta);
				//divPregunta.append(radioRespuesta);
			});

	//	});
	};

	crearSelect();
	crearOpciones(paisesArray);
	crearPreguntas(preguntas);