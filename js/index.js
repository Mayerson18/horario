$(document).ready(function(){

	var json = [
		{
			"facultad": "ingenieria",
			"asignatura": "1000-QUIMICA 11",
			"seccion": "01",
			"profesor": "V008572366 LOPEZ MONTILLA JUAN CARLOS",
			"horas": "7",
			"horario": ["LUN: 7-8 02_2O-06","LUN: 7-8 02_2O-06","LUN: 7-8 02_2O-06"],
		},{
			"facultad": "ingenieria",
			"asignatura": "1000-QUIMICA 11",
			"seccion": "01",
			"profesor": "V008572366 LOPEZ MONTILLA JUAN CARLOS",
			"horas": "7",
			"horario": ["LUN: 7-8 02_2O-06","LUN: 7-8 02_2O-06","LUN: 7-8 02_2O-06"],
		}
	];
	Json(json);
});

function Json(jsonx) {
	
	jsonx.forEach(function(item,i){// Version sin handlebars
		var line='<tr class="tr"><td>';
    line += item.facultad + "</td><td>";
		line += item.asignatura + "</td><td>";
		line += item.seccion + "</td><td>";
		line += item.profesor + "</td><td>";
		line += item.horas + "</td><td>";
		var horario = jsonx[i].horario
		horario.forEach(function(item2,i2){
			line += '<div class="chip">' + item2 + '</div>';
		});
		line += '</td><td><input type="checkbox" class="filled-in" id="filled-in-box' + i + '" /><label for="filled-in-box' + i +'"></label>';
		$("#tb").append( line + '</td></tr>');
	});	
}