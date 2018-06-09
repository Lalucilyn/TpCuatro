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
		var selectPaises = `<label for="paises">País de residencia</label><select name="paises" id="paises"><option value="0">Seleccione una opción</option></select><p id="errorPais">`;
		$('#datosForm').append(selectPaises);
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
								</div>
								<p id="error${index}">`
			$("#datosForm").append(divPregunta)
			var codigo = index;
			$.each(elem.respuestas, function(index,elem){
				var radioRespuesta = `<input type="radio" name=${codigo} value="${codigo}"><label>${elem}</label>`
				var idDiv = "pregunta"+codigo;
				$('#'+idDiv).append(radioRespuesta);
			})
		});
	};

	//Validación del formulario

	function validar(event){
		var valido = true;
		event.preventDefault();
		//validación del select
		var nacionalidad = $('#datosForm :selected').val();
		console.log(nacionalidad);
		if(nacionalidad === "0"){
			$('#errorPais').text("Debe seleccionar un país");
			valido = false;
		}else{
			$('#errorPais').text("");
		}

		//chequear radio buttons
		var traerPreguntas = $('.divPregunta')
		for(i=0;i<preguntas.length;i++){
			var opcionSeleccionada = $('input:radio[name='+i+']:checked').val();
			if(!opcionSeleccionada){
				valido=false;
				$('#error'+i).text('Debe seleccionar una opción');
			}else{
				$('#error'+i).text('');
			}
			console.log(opcionSeleccionada)	
		};

		if(valido===false){
			return
		}else{
			$("form").submit();
		}
	}

	crearSelect();
	crearOpciones(paisesArray);
	crearPreguntas(preguntas);
	$('button').on('click',validar);
