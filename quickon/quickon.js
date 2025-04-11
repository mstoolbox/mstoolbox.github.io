//
// JavaScript 1.1 routines for QUICKON
// by Jef Rozenski (2011)
//

var elem = '';
var compo = '';

// composition counter
var compo0 = {
  'A': 0,
  'C': 0,
  'G': 0,
  'T': 0,
  'U': 0
   };

// DNA composition
var compo1 = {
  'A': 'C10H11N5O2',
  'C': 'C9H11N3O3',
  'G': 'C10H11N5O3',
  'T': 'C10H12N2O4',
  'U': 'C9H10N2O4'
   };

// RNA composition
var compo2 = {
  'A': 'C10H11N5O3',
  'C': 'C9H11N3O4',
  'G': 'C10H11N5O4',
  'T': 'C10H12N2O5',
  'U': 'C9H10N2O5'
   };

// composition counter
var elem0 = {
  'C': 0,
  'H': 0,
  'N': 0,
  'O': 0,
  'P': 0,
  'S': 0
   };

// monoisotopic masses
var elem1 = {
  'C': 12.0,
  'H': 1.0078246,
  'N': 14.0030738,
  'O': 15.9949141,
  'P': 30.973764,
  'S': 31.9720727
   };

// average masses
var elem2 = {
  'C': 12.011,
  'H': 1.00794,
  'N': 14.00674,
  'O': 15.9994,
  'P': 30.97376,
  'S': 32.066
   };

// phosphate end
var phosph = {
  '0': '',
  '1': 'HPO3',
  '2': 'PO2H-1'
  };

// backbone phosphate / thioate
var backb = {
  '0': 'HPO3',
  '1': 'HPO2S',
  };

function DoCalc(m) {
  for (var i in elem0) {
    elem0[i] = 0;
    }
  for (var i in compo0) {
    compo0[i] = 0;
    }

  compo = (document.inp.B[0].checked)?compo1:compo2;
  var theEnd = 'H2O';
  theEnd += phosph[getCheckedValue(document.inp.C)];
  theEnd += phosph[getCheckedValue(document.inp.D)];
  var theBb = backb[getCheckedValue(document.inp.S)];
  var forel = document.inp.forel.value.toUpperCase();
  forel = forel.replace(" ","");

// digest input string into nucleotide composition

  var formon = document.inp.formon.value.toUpperCase();
  formon = formon.replace(" ","");
  var regEx1 = /^[A-Z]\-{0,1}\d*/;
  var regEx2 = /\-{0,1}\d+/;
  var regEx3 = /[A-Z]{1}/;
  var itemp = "";
  var numBa = 0;					// number of bases
  var namBa = "";					// name of base
  var numEl = 0;					// number of element
  var namEl = "";					// name of element
  var lenOl = 0;					// oligo length
  var totMass1 = 0;					// monoisotopic mass
  var totMass2 = 0;					// average mass

  if (formon.match(/[^ACGTU \d]/)) {
    alert('Invalid residue in sequence ' + formon);
    return 0;
    }

  if (forel.match(/[^CHNOPS\- \d]/)) {
    alert('Invalid element in composition ' + forel);
    return 0;
    }

  while (formon.match(regEx1)) {
    itemp = formon.match(regEx1) + "";
    numBa = itemp.match(regEx2);
    numBa = (numBa == null)?1:numBa;
    namBa = itemp.match(regEx3);
    compo0[namBa] += numBa * 1;
    formon = formon.replace(itemp,"");
    }

// convert nucleotide composition into elemental composition

  for (var i in compo0) {
    numBa = compo0[i];
    lenOl += numBa;
    formon = compo[i];
    while (formon.match(regEx1)) {
      itemp = formon.match(regEx1) + "";
      numEl = itemp.match(regEx2);
      numEl = (numEl == null)?1:numEl;
      namEl = itemp.match(regEx3);
      elem0[namEl] += numEl * numBa;
      formon = formon.replace(itemp,"");
      }
    }

// add ends

  formon = theEnd;
  while (formon.match(regEx1)) {
    itemp = formon.match(regEx1) + "";
    numEl = itemp.match(regEx2);
    numEl = (numEl == null)?1:numEl;
    namEl = itemp.match(regEx3);
    elem0[namEl] += numEl * 1;
    formon = formon.replace(itemp,"");
    }

// add phosphates

  formon = theBb;
  while (formon.match(regEx1)) {
    itemp = formon.match(regEx1) + "";
    numEl = itemp.match(regEx2);
    numEl = (numEl == null)?1:numEl;
    namEl = itemp.match(regEx3);
    elem0[namEl] += numEl * (lenOl-1);
    formon = formon.replace(itemp,"");
    }

// add elemental composition

  while (forel.match(regEx1)) {
    itemp = forel.match(regEx1) + "";
    numEl = itemp.match(regEx2);
    numEl = (numEl == null)?1:numEl;
    namEl = itemp.match(regEx3);
    elem0[namEl] += numEl * 1;
    forel = forel.replace(itemp,"");
    }

// calculate mass from elemental composition

  for (var i in elem0) {
    numEl = elem0[i];
    totMass1 += numEl * elem1[i];
    totMass2 += numEl * elem2[i];
    }


// generate output

var bigstring = new String();
for (var i in elem0) {
  bigstring += (elem0[i] > 0)?i + elem0[i] + " ":"";
  }
alert("composition: " + bigstring + "\nmonoisotopic mass: " + fmStr(totMass1) + "\naverage mass: " + fmStr(totMass2));


//  alert(elem['O']);

}

function getCheckedValue(radioObj) {
  if (!radioObj)
    return "";
  var radioLength = radioObj.length;
  if (radioLength == undefined)
    if (radioObj.checked)
      return radioObj.value;
    else
      return "";
  for (var i = 0; i < radioLength; i++) {
    if (radioObj[i].checked) {
      return i;
      }
    }
  return "";
  }

function fmStr(str) {
  str += "";
  if (str.match(/^\./)) {
    str += ".";
    }
  str += "00000";
  var retStr = str.match(/\d*\.\d{5}/);
  return retStr;
  }
