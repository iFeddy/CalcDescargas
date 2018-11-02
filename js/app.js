// Dom7
var $$ = Dom7;

// Plugins
//Framework7.use(Framework7Keypad);

// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'com.latirus.calcdescargas', // App bundle ID
  name: 'Calcular Descargas', // App name
  theme: 'md', // Automatic theme detection
  // App routes
  routes: routes,
  on: {
    init: function () {
      detectarVelocidad();
    }
  },
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg";
var downloadSize = 4995374; //bytes
var selectedSize = 0;
var selectedType = "MB";
var speedBps, speedKbps, speedMbps;

/*
var myKeypad = app.keypad.create({
  inputEl: '#fileSize',
  toolbarCloseText: "Listo",
  on: {
    closed() {
      selectedSize = myKeypad.value;
      calcularVelocidad(selectedSize);
    }
  }
});
*/

$$('#doMaths').on('click', function (e){
  selectedSize = $$('#fileSize').val();
  if(selectedSize == ""){
    app.dialog.alert("Ingresa el Tamaño del Archivo para Analizar");
  }else{
      calcularVelocidad(selectedSize);
  }
});

$$('#fileGB').on('click', function (e) {
  if (selectedType == "GB") return;
  $$(this).toggleClass('selected');
  selectedType = "GB";
  $$('#fileMB').removeClass('selected');
  $$('#fileKB').removeClass('selected');
});

$$('#fileMB').on('click', function (e) {
  if (selectedType == "MB") return;
  $$(this).toggleClass('selected');
  selectedType = "MB";
  $$('#fileKB').removeClass('selected');
  $$('#fileGB').removeClass('selected');
});

$$('#fileKB').on('click', function (e) {
  if (selectedType == "KB") return;
  $$(this).toggleClass('selected');
  selectedType = "KB";
  $$('#fileMB').removeClass('selected');
  $$('#fileGB').removeClass('selected');
});

//Aca pasa todo
function calcularVelocidad(size){
  console.log("Calculando Tamaño: " + size + " " + selectedType);
  if(selectedType == "GB"){
    size = Math.round(size * 1024.44444444); //MB
    size = Math.round(size * 1024.44444444); //KB
  }else if(selectedType == "MB"){
    size = Math.round(size * 1024.44444444); //KB
  }
  //console.log(size + " KB");
  var bit = Math.round(speedKbps / 8);
  //console.log(bit);
  var segundos = size / bit;
  var tiempo = new Date(segundos * 1000).toISOString().substr(11, 8);
  $$("#panelMySpeed").show();
  $$("#mySpeed").text(tiempo);
}


function detectarVelocidad() {
  window.setTimeout(MeasureConnectionSpeed, 1);
};

function MeasureConnectionSpeed() {
  var startTime, endTime;
  var download = new Image();
  download.onload = function () {
    endTime = (new Date()).getTime();
    showResults();
  }
  download.onerror = function (err, msg) {
    console.log("Error Detectando la Velocidad");
  }

  startTime = (new Date()).getTime();
  var cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;

  function showResults() {
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    speedBps = (bitsLoaded / duration).toFixed(2);
    speedKbps = (speedBps / 1024).toFixed(2);
    speedMbps = (speedKbps / 1024).toFixed(2);

    $$('#speedtest').html("Tu Velocidad es de <strong>" + speedMbps + "</strong> Mbp/s");
  }
}

$$(".speed").click(function() {
	if ($$(".speed:checked").val() == "slow") {
		$$(".needle").addClass("slow");
		$$(".needle").removeClass("medium");
		$$(".needle").removeClass("fast");
	} else if ($$(".speed:checked").val() == "medium") {
		$$(".needle").addClass("medium");
		$$(".needle").removeClass("slow");
		$$(".needle").removeClass("fast");
	} else if ($$(".speed:checked").val() == "fast") {
		$$(".needle").addClass("fast");
		$$(".needle").removeClass("medium");
		$$(".needle").removeClass("slow");
	}
});