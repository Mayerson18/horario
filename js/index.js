var horario_temp=[];
var json = [
	{
		"id":"1",
		"facultad": "ingenieria",
		"asignatura": "QUIMICA 11",
		"codigo":"1000",
		"seccion": "01",
		"profesor": "LOPEZ MONTILLA JUAN CARLOS V008572366",
		"horas": "06",
		"horario": [{"dia":"LUN","hora":"7-8","salon": "02_2O-06"},
								{"dia":"LUN","hora":"8-9","salon": "02_2O-06"},
								{"dia":"MAR","hora":"7-8","salon": "02_2O-06"},
								{"dia":"MAR","hora":"8-9","salon": "02_2O-06"},
								{"dia":"VIE","hora":"7-8","salon": "02_2O-06"},
								{"dia":"VIE","hora":"8-9","salon": "02_2O-06"}
								],
	},{
		"id":"2",
		"facultad": "ingenieria",
		"asignatura": "FISICA 11",
		"codigo":"1000",
		"seccion": "02",
		"profesor": "BARRIOS RINCON NESTOR LUIS V003297821",
		"horas": "06",
		"horario":[
								{"dia":"LUN","hora":"9-10","salon": "02_01_1N-07"},
								{"dia":"LUN","hora":"10-11","salon": "02_01_1N-07"},
								{"dia":"MIE","hora":"9-10","salon": "02_01_1N-07"},
								{"dia":"MIE","hora":"10-11","salon": "02_01_1N-07"},
								{"dia":"VIE","hora":"9-10","salon": "02_01_1N-07"},
								{"dia":"VIE","hora":"10-11","salon": "02_01_1N-07"}
						  ],
	},{
		"id":"3",
		"facultad": "ingenieria",
		"asignatura": "MECANICA 11",
		"codigo":"1000",
		"seccion": "03",
		"profesor": "MONTEALEGRE ROGER ENRIQUE V008707975",
		"horas": "06",
		"horario":[
								{"dia":"LUN","hora":"9-10","salon": "02_01_2N-02"},
								{"dia":"LUN","hora":"10-11","salon": "02_01_2N-02"},
								{"dia":"MAR","hora":"9-10","salon": "02_01_2N-02"},
								{"dia":"MAR","hora":"10-11","salon": "02_01_2N-02"},
								{"dia":"MIE","hora":"9-10","salon": "02_01_2O-01"},
								{"dia":"MIE","hora":"10-11","salon": "02_01_2O-01"}
						  ],
	},{
		"id":"4",
		"facultad": "ingenieria",
		"asignatura": "QUIMICA 11",
		"codigo":"1000",
		"seccion": "04",
		"profesor": "QUIROZ CRISTHIAN V0018309045",
		"horas": "06",
		"horario":[
								{"dia":"LUN","hora":"9-10","salon": "02_01_1N-10"},
								{"dia":"LUN","hora":"10-11","salon": "02_01_1N-10"},
								{"dia":"MAR","hora":"9-10","salon": "02_01_1N-10"},
								{"dia":"MAR","hora":"10-11","salon": "02_01_1N-10"},
								{"dia":"JUE","hora":"9-10","salon": "02_01_1N-10"},
								{"dia":"JUE","hora":"10-11","salon": "02_01_1N-10"}
						  ],
	}
];

$(document).ready(function(){

	var $table = $('table'),
    $bodyCells = $table.find('tbody tr:first').children(),
    colWidth;

// Get the tbody columns width array
colWidth = $bodyCells.map(function() {
    return $(this).width();
}).get();

// Set the width of thead columns
/*$table.find('thead tr').children().each(function(i, v) {
    $(v).width(colWidth[i]);
});    */



	Json(json);

	$('#search').instaFilta({
    targets: '.s'
	});

	$("th").click(function(){
		if($(this).hasClass("header")){
			$(".i").addClass("esconder");
			if($(this).hasClass("headerSortDown")){
				($(this).children().first().removeClass("esconder"));
			}else{
				($(this).children().last().removeClass("esconder"));
			}
		}
	});

	$(document).on("click",".filled-in",function(){
		var id = $(this).attr("data-obj");
		if($(this).is(':checked')){
			var s = _.find(json,function(a){
      	if(a.id == id)
        	return a;
      });
      var colision = 0;
      for (var i = 0; i < s.horario.length; i++) {
      	colision += Colision(s.horario[i]);
      }
      if (colision >= 2){
      	error("Hay exceso de colision");
      	$(this).prop("checked",false);
      }else if (colision == 1) {
      	error("Presenta una colision");
      	horario_temp.push(s);
      }else{
      	horario_temp.push(s);
      }
		}else{
			_.remove(horario_temp,function(a){
      	if(a.id == id)
        	return a;
      });
		}
		print();
	});
	$("#table").tablesorter();
});

function Json(jsonx) {	/*FUNCION QUE MUESTRA EL HORARIO A PARTIR DE UN JSON*/
	jsonx.forEach(function(item,i){// Version sin handlebars
		var line='<tr class="tr s"><td class="cd2">';
    line += item.facultad + '</td><td class="cd2">';
		line += item.asignatura + '</td><td class="cd2">';
		line += item.codigo + '</td><td class="cd2">';
		line += item.seccion + '</td><td class="cd2">';
		line += item.profesor + '</td><td class="cd2">';
		line += item.horas + '</td><td>';
		var horario = jsonx[i].horario
		horario.forEach(function(item2,i2){
			line += '<div class="chip">' + item2.dia + ": " + item2.hora + " " + item2.salon + '</div>';
		});
		line += '</td><td><input type="checkbox" class="filled-in" id="check' + i + '"' + " data-obj='" + item.id + "' /><label " + 'for="check' + i +'"></label>';
		$("#tb").append( line + '</td></tr>');
	});	
}

function print(){/*FUNCION QUE IMPRIME */

	$(".td").text("");
	$(".td").removeClass("animated");
	$(".td").removeClass("bounce");
	$(".td").removeClass("gy");
	$(".td").removeClass("er");
	if(!_.isEmpty(horario_temp)){
		for (var i = 0; i < horario_temp.length; i++) {
			var obj = horario_temp[i];
			var hor = obj.horario;
			for (var j = 0; j < hor.length; j++) {
				var id = hor[j].dia + "_" + hor[j].hora;
				var text = $("#"+id).text();
				if(text == ""){
					$("#"+id).text(obj.asignatura);
					$("#"+id).addClass("animated bounce gy");
				}else{
					$("#"+id).html("<div>"+text + "</div><div>" +obj.asignatura + "</div>");
					$("#"+id).addClass("animated bounce er");
				}
			}
		}
	}
}

function Colision(obj){/*FUNCION QUE INDICA SI HAY COLISIONES*/
	var colision = 0;
	for (var i = 0; i < horario_temp.length; i++){
		var x = horario_temp[i].horario;
		for (var j = 0; j < x.length; j++) {
			if((x[j].dia == obj.dia) &&(x[j].hora == obj.hora))
				colision++;
		}
	}
	return colision;
}

function error(texto){/*FUNCION QUE IMPRIME TOAST*/
	var $toastContent = $('<div class="animated bounce">' + texto + '<img src="emoticon_16.png"></div>');
	Materialize.toast($toastContent, 10000,'rounded');
}