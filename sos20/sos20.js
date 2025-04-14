//
// JavaScript routines for SOS20
// written by Jef Rozenski (2023)
//
var electron = 0.00054386734;
var end3mass = 0;
var end5mass = 0;
var furanmass = 0;
var symbols = [];
var bases = [];
var basemass = [];
var sugars = [];
var sugarmass = [];
var link1 = [];
var link1mass = [];
var link2 = [];
var link2mass = [];
var link3 = [];
var link3mass = [];
var elements = [];
var elmass = [];
var massElem = [];
var allData = [];
var allKeys = [];
var allInt = [];

function myFunction() { // used by seq input field
  calcNew();
}

function changeMenu(mode) {
  if (mode == "item1") { // read input mode
    document.getElementById('myInput').style.display = "block";
    document.getElementById('mySpectrum').style.display = "none";
    document.getElementById('mySequence').style.display = "none";
    document.getElementById('myAbout').style.display = "none";
    }
  else if (mode == "item2") { // sequence mode
    document.getElementById('myInput').style.display = "none";
    document.getElementById('mySpectrum').style.display = "none";
    document.getElementById('mySequence').style.display = "block";
    document.getElementById('myAbout').style.display = "none";
    calcNew();
   }
  else if (mode == "item3") { // show spectrum mode
    document.getElementById('myInput').style.display = "none";
    document.getElementById('mySpectrum').style.display = "block";
    document.getElementById('mySequence').style.display = "none";
    document.getElementById('myAbout').style.display = "none";
    drawSpec();
    }
  else if (mode == "item4") { // about
    document.getElementById('myInput').style.display = "none";
    document.getElementById('mySpectrum').style.display = "none";
    document.getElementById('mySequence').style.display = "none";
    document.getElementById('myAbout').style.display = "block";
    }
  document.getElementById('item1').style.color = "white";
  document.getElementById('item2').style.color = "white";
  document.getElementById('item3').style.color = "white";
  document.getElementById('item4').style.color = "white";
  document.getElementById(mode).style.color = "yellow";
}

function changeIontype() {
  var thetypes = ["w","a-B","d-H2O","y","int"];
  var brol = document.getElementById('iontype');
  brol.value = thetypes[(thetypes.indexOf(brol.value) + 1) % thetypes.length];
  calcNew();
}

function changeCharge(plusmin) {
  var brol = document.getElementById('charge');
  (plusmin == 0) ? brol.value = -1 : brol.value = brol.value * 1 + plusmin;
  calcNew();
}

function clearSeq() {
  var brol = document.getElementById('seq');
  brol.value = "";
  brol = document.getElementById('charge');
  brol.value = -1;
  brol = document.getElementById('iontype');
  brol.value = "w";
  calcNew();
}

function makeArray(strname) { // used in reading configuration
  var brol = strname.split(/=/);
  var theArray =  brol[1].split(/\|/);
  return theArray;
}

function initConf() {
  end3mass = 0;
  end5mass = 0;
  furanmass = 0;
  symbols = [];
  bases = [];
  basemass = [];
  sugars = [];
  sugarmass = [];
  link1 = [];
  link1mass = [];
  link2 = [];
  link2mass = [];
  link3 = [];
  link3mass = [];
  elements = [];
  elmass = [];
  massElem = [];
  document.getElementById('seq').value = "";
  var fileContent = document.getElementById('confFileContent'); 
  var thelines = fileContent.textContent; 
  var allTextLines = thelines.split(/\r\n|\n/);
  document.getElementById('confRec').textContent = "[" + allTextLines.length + " lines read]";
  for (var i=0; i<allTextLines.length; i++) {
    if (allTextLines[i].includes("elements")) {
      elements = makeArray(allTextLines[i]);
      }
    else if (allTextLines[i].includes("elmass")) {
      elmass = makeArray(allTextLines[i]);
      for (var j=0; j<elements.length; j++) {
        massElem[elements[j]] = elmass[j];
        }
      }
    else if (allTextLines[i].includes("end3")) {
      var brol =  allTextLines[i].split(/=/);
      end3mass = calcMass(brol[1]);
      }
    else if (allTextLines[i].includes("end5")) {
      var brol =  allTextLines[i].split(/=/);
      end5mass = calcMass(brol[1]);
      }
    else if (allTextLines[i].includes("furan")) {
      var brol =  allTextLines[i].split(/=/);
      furanmass = calcMass(brol[1]);
      }
    else if (allTextLines[i].includes("symbols")) {
      symbols = makeArray(allTextLines[i]);
      symbols.length = (symbols.length < 8) ? symbols.length : 8; // maximum 8 nucleosides
      }
    else if (allTextLines[i].includes("bases")) {
      bases = makeArray(allTextLines[i]);
      for (var j=0; j<symbols.length; j++) {
        basemass[symbols[j]] = calcMass(bases[j]);
        }
      }
    else if (allTextLines[i].includes("sugars")) {
      sugars = makeArray(allTextLines[i]);
      for (var j=0; j<symbols.length; j++) {
        sugarmass[symbols[j]] = calcMass(sugars[j]);
        }
      }
    else if (allTextLines[i].includes("link1")) {
      link1 = makeArray(allTextLines[i]);
      for (var j=0; j<symbols.length; j++) {
        link1mass[symbols[j]] = calcMass(link1[j]);
        }
      }
    else if (allTextLines[i].includes("link2")) {
      link2 = makeArray(allTextLines[i]);
      for (var j=0; j<symbols.length; j++) {
        link2mass[symbols[j]] = calcMass(link2[j]);
        }
      }
    else if (allTextLines[i].includes("link3")) {
      link3 = makeArray(allTextLines[i]);
      for (var j=0; j<symbols.length; j++) {
        link3mass[symbols[j]] = calcMass(link3[j]);
        }
      } 
  }
}

function initData() {
  allData = [];
  allKeys = [];
  allInt = [];
  var dataContent = document.getElementById('dataFileContent').textContent; 
  var specInfo = ""; 
  var allTextLines = dataContent.split(/\r\n|\n/);
  var tempData = [];
  console.log(allTextLines.length);
  for (var i=0; i<allTextLines.length; i++) {
    tempData = allTextLines[i].split(/ |\t/);
    if (tempData[0].match(/\d+[\\.\d]/)) {
      allData[tempData[0]] = Number(tempData[1]);
      }
    if (allTextLines[i].match(/^\:/)) {
      specInfo.textContent = specInfo.textContent + allTextLines[i] + "\n";
      }
    }
  allKeys = Object.keys(allData);
  allInt = allKeys.map(function(key) {return allData[key];});
  document.getElementById('dataRec').textContent = "[" + allKeys.length + " peaks read]";
}

function addRec(myCanvas) {
  var nr = myCanvas.match(/\d/);
  var seq = document.getElementById('seq').value;
  document.getElementById('seq').value += symbols[nr];
  calcNew();
}

function drawCanvas(myCanvas,nuc) {
  if (nuc.match(/./)) {
    document.getElementById(myCanvas).style.display = "inline-block";
    var canvas = document.getElementById(myCanvas);
    canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.width = 300;
    ctx.height = 600;
    ctx.globalAlpha = 0.05;
    ctx.textAlign = 'center';
    ctx.font = "127px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(nuc,75,200);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.beginPath(); 
    ctx.moveTo(10,275);
    ctx.lineTo(140,275);
    ctx.moveTo(75,275);
    ctx.lineTo(75,285);
    ctx.moveTo(45,275);
    ctx.lineTo(45,280);
    ctx.moveTo(105,275);
    ctx.lineTo(105,280);
    ctx.moveTo(15,275);
    ctx.lineTo(15,280);
    ctx.moveTo(135,275);
    ctx.lineTo(135,280);
    ctx.stroke();
    return ctx;
    }
  else {
    document.getElementById(myCanvas).style.display = "none";
    return 0;
    }
}

function drawPeak(ctx,calcmass,peakmass,themax) {
  var thepos;
  var theint;
  thepos = Math.round(75 + (peakmass - calcmass) * 30);
  theint = Math.round(allData[peakmass] / themax * 250);
  ctx.strokeStyle = "#800000";
  ctx.lineWidth = 1;
  ctx.beginPath(); 
  ctx.moveTo(thepos,274);
  ctx.lineTo(thepos,274 - theint);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.font = "10px Arial";
  ctx.fillStyle = "#800000";
  ctx.textAlign = 'right';
  ctx.fillText(themax,140,20);
}

function specPos(themin,themax,thepos) {
  var canvasrange = 750 - 2*15;
  var canvaspos = 15 + canvasrange / (themax - themin) * (thepos - themin);
  return canvaspos;
}

function drawSpec() {
  if (Object.keys(allData).length == 0) {
    return 0;
    }
  document.getElementById("specCanvas").style.visibility = "visible";
  document.getElementById("specCanvas").style.display = "inline-block";
  var canvas = document.getElementById("specCanvas");
  canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.beginPath(); 
  ctx.moveTo(10,375);
  ctx.lineTo(740,375);
  ctx.stroke();
  var themax = Math.max.apply(null,allKeys);
  var themin = Math.min.apply(null,allKeys);
  themax = Math.ceil(themax/100) * 100;
  themin = Math.floor(themin/100) * 100;
  var calcPos = 0;
  var calcInt = 0;
  ctx.globalAlpha = 1;
  ctx.font = "10px Arial";
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";
  ctx.textAlign = 'center';
  for (var i=themin; i<=themax; i+=100) { // major tickmarks
    calcPos = specPos(themin,themax,i);
    ctx.beginPath(); 
    ctx.moveTo(calcPos,380);
    ctx.lineTo(calcPos,375);
    ctx.stroke();
    ctx.fillText(i,calcPos,392);
    }
  for (var i=themin + 50; i<=themax; i+=100) { // minor tickmarks
    calcPos = specPos(themin,themax,i);
    ctx.beginPath(); 
    ctx.moveTo(calcPos,378);
    ctx.lineTo(calcPos,375);
    ctx.stroke();
    }
  var maxInt = Math.max.apply(null,allInt);
  ctx.strokeStyle = "#800000";
  for (var i=0; i<=allKeys.length; i++) { // draw peaks
    calcPos = specPos(themin,themax,allKeys[i]);
    calcInt = 350 * allData[allKeys[i]] / maxInt;
    calcInt = Math.round(calcInt);
    ctx.beginPath(); 
    ctx.moveTo(calcPos,374);
    ctx.lineTo(calcPos,374 - calcInt);
    ctx.stroke();
    }
}

function calcNew() {
  var themax = 0;
  var seq = document.getElementById('seq').value.toUpperCase();
  var iontype = document.getElementById("iontype").value;
  var tempcanvas = [];
  var tempmass = [];
  var toPlot = [];
  document.getElementById('seq').value = seq;
  for (var i=0; i<symbols.length; i++) {
    var tempArray = [];
    tempcanvas[i] = drawCanvas("myCanvas"+i,symbols[i]); // draw fixed layout
    tempmass[i] = calcSeq(tempcanvas[i],seq + symbols[i],iontype); // calc and write mass on canvas
    for (var j=0; j<allKeys.length; j++) {
      if (Number(allKeys[j]) <= (tempmass[i] + 2) && Number(allKeys[j]) >= (tempmass[i] - 2)) {
        tempArray.push(allKeys[j]);
        themax = (allData[allKeys[j]] > themax) ? allData[allKeys[j]] : themax;
        }
      }
    toPlot.push(tempArray);
    }
  for (var i=0; i<symbols.length; i++) {
    for (var j=0; j<toPlot[i].length; j++) {
      drawPeak(tempcanvas[i],tempmass[i],toPlot[i][j],themax);
      }
    }
}

function calcMass(compo) {
  var mass = 0;
  var arr1 = compo.split(/\D/);    // array of indexes
  arr1.splice(0, 1);               // remove first (empty) element
  compo = compo.replace(/\d/g,""); // remove digits
  arr2 = compo.split('');          // array of elements  
  for (var i=0; i<arr1.length; i++) {
    (arr1[i] == "") ? arr1[i] = 1: arr1[i] = Number(arr1[i]);
    mass += arr1[i] * massElem[arr2[i]];
    }
  return mass;
}

function calcSeq(ctx,seq,iontype) {
  var mass = Number(massElem["H"]);
  var themass = 0;
  for (var i=0; i<seq.length; i++) {
    mass += sugarmass[seq[i]];
    mass += basemass[seq[i]];
    mass += link1mass[seq[i]];
    mass += link2mass[seq[i]];
    mass += link3mass[seq[i]];
    }
  if (iontype == "w") {
    mass += end3mass;
    }
  else if (iontype == "a-B") {
//    mass += end5mass + sugarmass[seq[seq.length-1]] - calcMass("H3");
    mass += end5mass + sugarmass[symbols[1]] - calcMass("H3"); // furan mass is calculated from first nucleotide
    }
  else if (iontype == "y") {
    mass += end3mass - link1mass[seq[seq.length-1]] - link2mass[seq[seq.length-1]];
    }
  else if (iontype == "d-H2O") {
    mass += end5mass - calcMass("H2O");
    }
  else if (iontype == "int") {
    mass += 0 - calcMass("H2") + link1mass[seq[seq.length-1]] + link2mass[seq[seq.length-1]] + link3mass[seq[seq.length-1]] + sugarmass[seq[seq.length-1]];
    }
  var charge = Number(document.getElementById("charge").value);
  mass += charge * -1 * (electron - Number(massElem["H"]));
  mass = mass / Math.abs((charge == 0) ? 1 : charge);
  themass = mass;
  mass = Math.round(mass*1000)/1000 + "00";
  mass = mass.substring(0,mass.indexOf('.') + 4);
  if (iontype.match(/./)) {
    ctx.globalAlpha = 1;
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = 'center';
    ctx.fillText(mass,75,295);
    }
  return themass;
}

function loadConf(url){
document.getElementById('confFileContent').textContent = "";
fetch(url)
  .then(response => response.text())
  .then((response) => {
    document.getElementById('confFileContent').textContent = response;
    document.getElementById('noconf').textContent = "";
    initConf();
   })
   .catch(err => console.log(err));
document.getElementById('confRec').textContent = "";
}

function loadSpec(url){
document.getElementById('dataFileContent').textContent = "";
fetch(url)
  .then(response => response.text())
  .then((response) => {
    document.getElementById('dataFileContent').textContent = response;
    document.getElementById('nodata').textContent = "";
    initData();
   })
   .catch(err => console.log(err));
document.getElementById('dataRec').textContent = "";
}

window.onload = function() {
//if not? (window.File && window.FileReader && window.FileList && window.Blob) {
//return 0;
//}
  var confInput = document.getElementById('confFile');
  var confDisplayArea = document.getElementById('confFileContent');
  confInput.addEventListener('change', function(e) {
    var file = confInput.files[0];
    var textType = /text.*/;
    if (file.type.match(textType)) {
      var reader = new FileReader();
      reader.onload = function(e) {
        confDisplayArea.textContent = reader.result;
        document.getElementById('noconf').textContent = "";
        initConf();
        }
      reader.readAsText(file);
      }
    else {
      confDisplayArea.textContent = "File type not supported!";
      }
    });
  var dataInput = document.getElementById('dataFile');
  var dataDisplayArea = document.getElementById('dataFileContent');
  dataInput.addEventListener('change', function(f) {
    var file = dataInput.files[0];
    var textType = /text.*/;
    if (file.type.match(textType)) {
      var reader = new FileReader();
      reader.onload = function(f) {
        dataDisplayArea.textContent = reader.result;
        document.getElementById('nodata').textContent = "";
        initData();
        }
      reader.readAsText(file);
      }
    else {
      dataDisplayArea.textContent = "File type not supported!";
      }
    });
}
