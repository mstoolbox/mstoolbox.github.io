//
// JavaScript 1.1 routines for PEPCALC
// by Jef Rozenski (1998)
// last modification : 2009.10.30
//
var aa = "ARNDCEQGHILKMFPSTWYV12345678";

function str(istr,strlen,dec)  // format a string or value for output
{
var mystr = ""+istr;
if (str.arguments.length > 2)
  {
  var i;
  var decpt = mystr.indexOf(".");
  if (decpt < 0)
    {
    mystr += ".";
    decpt = mystr.indexOf(".");
    }
  if (dec>0)
    {
    for (i=decpt;i<(strlen-dec-1);++i){mystr = " "+mystr;}
    for (i=mystr.length;i<strlen;++i){mystr += "0";}
    mystr = mystr.substring(0,strlen);
    }
  else
    {
    for (i=mystr.length;i<strlen;++i){mystr = " "+mystr;}
    }
  }
else
  {
  mystr = (mystr+"                    ").substring(0,strlen);
  }
return mystr;
}

function m(ch)
{
if ("MA".indexOf(ch) == 0) {var nr = "monoisotopic";}
if ("MA".indexOf(ch) == 1) {var nr = "average";}
return nr
}

function p(ch)
{
var nr = aa.indexOf(ch);
return nr
}

function showres()
{
var outstr = "<HTML><HEAD></HEAD><BODY BGCOLOR='#E09090'>\n<PRE>"+document.title.bold()+"\n\n";
outstr += "     <B>amino acid residue masses</B>\n\n";
outstr += "     amino acid         code    monoisotopic  average mass\n\n";
for (var i=0;i<p('1');++i)
  {
  outstr += "     " + str(AZ[i],20) + aa.charAt(i) + str(mM[i],15,4) + str(mA[i],15,4) + "\n";
  }

outstr += "\n<FORM><INPUT TYPE='button' VALUE=' Close ' onClick='window.close()'></FORM></PRE></BODY></HTML>";
result = window.open("","result","resizable=1,menubar=1,scrollbars=1,width=550,height=350");
result.document.clear();
result.document.writeln(outstr);
result.document.close();
result.focus();
}

function q(ch)
{
var bb = "OHFAMPXY";
var nr = bb.indexOf(ch);
return nr
}

var AZ = new Array();
AZ[p("A")] = "Alanine";
AZ[p("R")] = "Arginine";
AZ[p("N")] = "Asparagine";
AZ[p("D")] = "Aspartic acid";
AZ[p("C")] = "Cysteine";
AZ[p("E")] = "Glutamic acid";
AZ[p("Q")] = "Glutamine";
AZ[p("G")] = "Glycine";
AZ[p("H")] = "Histidine";
AZ[p("I")] = "Isoleucine";
AZ[p("L")] = "Leucine";
AZ[p("K")] = "Lysine";
AZ[p("M")] = "Methionine";
AZ[p("F")] = "Phenylalanine";
AZ[p("P")] = "Proline";
AZ[p("S")] = "Serine";
AZ[p("T")] = "Threonine";
AZ[p("W")] = "Tryptophan";
AZ[p("Y")] = "Tyrosine";
AZ[p("V")] = "Valine";

var mM = new Array();
mM[p("A")] = 71.03711;
mM[p("R")] = 156.10111;
mM[p("N")] = 114.04293;
mM[p("D")] = 115.02694;
mM[p("C")] = 103.00919;
mM[p("E")] = 129.04259;
mM[p("Q")] = 128.05858;
mM[p("G")] = 57.02146;
mM[p("H")] = 137.05891;
mM[p("I")] = 113.08406;
mM[p("L")] = 113.08406;
mM[p("K")] = 128.09496;
mM[p("M")] = 131.04049;
mM[p("F")] = 147.06841;
mM[p("P")] = 97.05276;
mM[p("S")] = 87.03203;
mM[p("T")] = 101.04768;
mM[p("W")] = 186.07931;
mM[p("Y")] = 163.06333;
mM[p("V")] = 99.06841;

var xM = new Array();
xM[q("O")] = 17.00274;  // hydroxy
xM[q("H")] = 1.00782;   // hydrogen
xM[q("F")] = 29.00274;  // formate
xM[q("A")] = 43.01839;  // acetate
xM[q("M")] = 16.01872;  // amide
xM[q("P")] = -18.01056; // pyroglutamate

var mA = new Array();
mA[p("A")] = 71.0788;
mA[p("R")] = 156.1876;
mA[p("N")] = 114.1039;
mA[p("D")] = 115.0886;
mA[p("C")] = 103.1448;
mA[p("E")] = 129.1155;
mA[p("Q")] = 128.1308;
mA[p("G")] = 57.0520;
mA[p("H")] = 137.1412;
mA[p("I")] = 113.1595;
mA[p("L")] = 113.1595;
mA[p("K")] = 128.1742;
mA[p("M")] = 131.1986;
mA[p("F")] = 147.1766;
mA[p("P")] = 97.1167;
mA[p("S")] = 87.0782;
mA[p("T")] = 101.1051;
mA[p("W")] = 186.2133;
mA[p("Y")] = 163.1760;
mA[p("V")] = 99.1326;

var xA = new Array();
xA[q("O")] = 17.0073;  // hydroxy
xA[q("H")] = 1.0079;   // hydrogen
xA[q("F")] = 29.0183;  // formate
xA[q("A")] = 43.0452;  // acetate
xA[q("M")] = 16.0226;  // amide
xA[q("P")] = -18.0152; // pyroglutamate

function DoCalc()
{
var SQ = document.inp.sq.value.toUpperCase();
var MOAV = document.inp.ma.options[document.inp.ma.selectedIndex].value;

if (SQ=="")
 {alert("Please enter a sequence.");return;}
else if ((document.inp.tn.selectedIndex == 3) && (SQ.charAt(SQ.length-1) != "E"))
 {alert("N-terminal residue has to be glutamic acid (E) if pyroglutamate selected.");return;}

var MA = new Array();
MA = eval("m"+MOAV);
var XX = new Array();
XX = eval("x"+MOAV);

for (var i=1;i<9;++i)
{
MA[p(i)] = 0;
if (eval("document.inp.u"+i+".value")!="")
  {
  MA[p(i)] = parseFloat(eval("document.inp.u"+i+".value"));
  }
}

XX[q("X")] = 0;
XX[q("Y")] = 0;

if (document.inp.u9.value!="")
  {
  XX[q("X")] = parseFloat(document.inp.u9.value);
  }

if (document.inp.u0.value!="")
  {
  XX[q("Y")] = parseFloat(document.inp.u0.value);
  }

var outstr = "<HTML><HEAD></HEAD><BODY BGCOLOR='#E09090'>\n<PRE>"+document.title.bold()+"\n\n";
outstr += m(MOAV)+" mass calculation for peptide:\n\n   <B>"+SQ+"</B>\n\n";
var brol = document.inp.tn.selectedIndex;
brol = (brol == 4)?str(XX[q("X")],10,4):document.inp.tn.options[brol].text;
outstr += "N-terminal group : "+brol+"\n";
brol = document.inp.tc.selectedIndex;
brol = (brol == 2)?str(XX[q("Y")],10,4):document.inp.tc.options[brol].text;
outstr += "C-terminal group : "+brol+"\n";
for (i=1;i<9;++i)
{
  if (SQ.indexOf(""+i)>=0)
    {
    outstr += "residue #"+i+"       : "+str(MA[p(""+i)],10,4)+"\n";
    }
}

var totmass = XX[q(document.inp.tn.options[document.inp.tn.selectedIndex].value)];
totmass += XX[q(document.inp.tc.options[document.inp.tc.selectedIndex].value)];

for (var i=0;i<SQ.length;++i)
  {
  if (p(SQ.charAt(i)) == -1)
    {
    alert("Invalid residue '"+SQ.charAt(i)+"' at position "+(1+i));
    return;
    }
  totmass += MA[p(SQ.charAt(i))];
  }

outstr += "\n<B>Molecular mass :</B>\n     "+str(totmass,11,4)+"\n";
outstr += "\n<B>length :</B>\n     "+str(i,4)+"\n\n";

if (document.inp.calc.selectedIndex == 1)
  {
  outstr += "<B>[M+H]<SUP>+</SUP> :</B>\n     "+str(totmass+XX[q("H")],11,3)+"\n";
  }
if (document.inp.calc.selectedIndex == 2)
  {
  outstr += "<B>Electrospray series (positive mode) :</B>\n\ncharge        m/z\n\n";
  for (var i=1;i<SQ.length;++i)
    {
    outstr += str("+"+i,4);
    outstr += str((totmass/i)+XX[q("H")],15,4)+"\n";
    }
  }
if (document.inp.calc.selectedIndex == 3)
  {
  outstr += "<B>Electrospray series (negative mode)</B> :\n\ncharge        m/z\n\n";
  for (var i=1;i<SQ.length;++i)
    {
    outstr += str("-"+i,4);
    outstr += str((totmass/i)-XX[q("H")],15,4)+"\n";
    }
  }

outstr += "\n<FORM><INPUT TYPE='button' VALUE=' Close ' onClick='window.close()'></FORM></PRE></BODY></HTML>";

result = window.open("","result","resizable=1,menubar=1,scrollbars=1,width=550,height=350");
result.document.clear();
result.document.writeln(outstr);
result.document.close();
result.focus();
}
