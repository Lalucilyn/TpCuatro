//Variables
var arrayResultados;
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
	header:"Lenguaje favorito",
	respuestas:["Javascript","Java","C#"]
},
{	
	codigo:1,
	pregunta:"¿Cuál es tu sistema operativo preferido?",
	header:"Sistema operativo favorito",
	respuestas:["Windows","Linux","Solaris"]
},
{	
	codigo:2,
	pregunta:"¿Qué editor de texto usás?",
	header:"Editor de texto",
	respuestas:["Sublime","Visual Studio","Atom"]
},
{	
	codigo:3,
	pregunta:"¿Cuál fue el primer lenguaje de programación que aprendiste?",
	header:"Primer lenguaje aprendido",
	respuestas:["Javascript","Java","C#"]
},

];

function recuperarResultados(){
	var resultadosRecuperados = localStorage.getItem("datosRecopilados");
	if(resultadosRecuperados===null) {
  		arrayResultados=[];
	}else{
  	datosParseados = JSON.parse(resultadosRecuperados);
  	arrayResultados = datosParseados.resultados;
  	//Creo filas por cada objeto guardado
  	crearLista();
	console.log(arrayResultados)
}
}
//Función para crear el select de objetos

function crearSelect(){
	var selectPaises = `<label for="paises" class="label-paises">País de residencia</label><select name="paises" id="paises"><option value="0">Seleccione una opción</option></select><p id="errorPais">`;
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
							<label for="enunciado${index}" class="label-enunciado">${elem.pregunta}</label>
							</div>
							<p id="error${index}">`
		$("#datosForm").append(divPregunta)
		var codigo = index;
		$.each(elem.respuestas, function(index,elem){
			var radioRespuesta = `<input type="radio" name=${codigo} class="option-input radio" value="${elem}"><label>${elem}</label>`
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
	//console.log(nacionalidad);
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
	};

	if(valido===false){
		return
	}else{
		$("form").submit();
		recopilarDatos();
	}
}


function recopilarDatos(){
	//El objeto resultados guarda todos los resultados de la encuesta
	var resultados = {};
	
	//En resultados, se guarda el país seleccionado en el select
	resultados.pais = $('#datosForm :selected').text();

	//El array respuestasPreguntas, guarda cada pregunta y su respectiva respuesta como un objeto que se crea con el for de la línea 131
	var respuestasPreguntas = [];

	for(i=0;i<preguntas.length;i++){
		var objetoPregunta = {};
		//Para crear el objeto, tomo la pregunta correspondiente y el radio chequeado
		var pregunta = $('input:radio[name='+i+']:checked').siblings('label[class="label-enunciado"]').text();
		var respuesta = $('input:radio[name='+i+']:checked').val();
		objetoPregunta.pregunta = pregunta;
		objetoPregunta.respuesta = respuesta
		respuestasPreguntas.push(objetoPregunta);
	}

	resultados.respuestas = respuestasPreguntas;
	arrayResultados.push(resultados);
	//Creo la fila de la tabla
	crearLista();
	var objetoResultados = {
		"resultados":arrayResultados,
		"extension":arrayResultados.length
	}
	var resultadosJSON = JSON.stringify(objetoResultados);
	console.log(resultadosJSON)
	localStorage.setItem("datosRecopilados",resultadosJSON);

}

//Crea la fila en la lista
function crearLista(){
	//Crea el header con número de orden
	var headerNumero =`<th>N°</th>`;
	//Crea el header de país de residencia
	var headerPais = `<th>País de residencia</th>`
	//Agrega número y país al head
	$('thead').append(headerNumero);
	$('thead').append(headerPais);
	//Agrega un header por cada pregunta
	$.each(preguntas,function(index,elem){
		var tableHeader = `<th>${elem.header}</th>`;
		$('thead').append(tableHeader);
	})

	//Borra los datos que haya previamente en la lista para evitar duplicaciones
	$('tbody').children().remove();
	
	//Función que crea las filas en la tabla
	$.each(arrayResultados, function(index,elem){
  		//Crea la fila
  		var fila = `<tr id="resultados${index}"></tr>`
  		$('table').append(fila);
  		//Crea el campo que lleva el N° de orden
  		var num = `<td>${index}</td>`  
  		$('#resultados'+index).append(num);
  		//Crea el campo que lleva el país de origen
  		var campoPais = `<td>${elem.pais}</td>`;  
  		$('#resultados'+index).append(campoPais);
  		//Crea un campo por cada respuesta a una pregunta 
  		var respuestas = elem.respuestas;
  		console.log(respuestas);
  		for(i=0;i<respuestas.length;i++){
  			var respuestaIndividual = respuestas[i].respuesta;
  			var campoRespuesta = `<td>${respuestaIndividual}</td>`
  			$('#resultados'+index).append(campoRespuesta);
  		}
	})}

//Llamadas a funciones	
crearSelect();
crearOpciones(paisesArray);
crearPreguntas(preguntas);
recuperarResultados();
$('button').on('click',validar);
