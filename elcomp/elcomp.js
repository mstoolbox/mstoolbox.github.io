
//
// JavaScript routines for elcomp.htm
// by Jef Rozenski (1999)
// jef.rozenski@rna.pharm.utah.edu
// last modification : 11/03/2014
//
window.defaultStatus = '';
var i,j,mw,sm,ma,dr,toler,offs,hits,hitmass;
var elem = "CHNOSPXYZ";
var maM = "monoisotopic mass";
var maA = "average mass";
var numel = elem.length;
var mass = new Array(numel);
var massM = new Array(numel);
var massA = new Array(numel);
var imin = new Array(numel);
var imax = new Array(numel);
var ni;
var ch;
var electron = 0.00054858;

function SetStatus(nr,elem)
{
var msg = new Array(7);
  msg[1] = "enter here you target mass";
  msg[2] = "enter here the allowable error";
  msg[3] = "here you can specify an offset mass; this value will be subtracted from the target mass";
  msg[4] = "the X,Y and Z are user-specified elements";
  msg[5] = "put here the minimum amount of element "+elem+" to be considered in calculation";
  msg[6] = "put here the maximum amount of element "+elem+" to be considered in calculation";
  msg[7] = "this is the "+eval("ma"+ma)+" for "+elem+"; it can be modified, if necessary";
window.status = msg[nr];
}

function SetDefault()
{
massM[posB('C')] = 12.0;      massA[posB('C')] = 12.011;
massM[posB('H')] =  1.007825; massA[posB('H')] = 1.00794;
massM[posB('N')] = 14.003074; massA[posB('N')] = 14.00674;
massM[posB('O')] = 15.994914; massA[posB('O')] = 15.9994;
massM[posB('S')] = 31.972070; massA[posB('S')] = 32.066;
massM[posB('P')] = 30.973762; massA[posB('P')] = 30.97376;
massM[posB('X')] = 0;massA[posB('X')] = 0;
massM[posB('Y')] = 0;massA[posB('Y')] = 0;
massM[posB('Z')] = 0;massA[posB('Z')] = 0;

document.inp.ni[0].click();
document.inp.ma[0].click();
mass = massM;
ma = "M";

for (i=elem.indexOf('C');i<=elem.indexOf('P');++i)
  {eval("document.inp."+elem.charAt(i)+".value = "+mass[i]);}

document.inp.X.value=0;document.inp.minX.value=0;document.inp.maxX.value=0;
document.inp.Y.value=0;document.inp.minY.value=0;document.inp.maxY.value=0;
document.inp.Z.value=0;document.inp.minZ.value=0;document.inp.maxZ.value=0;
document.inp.offs.value=0;
document.inp.mw.value=0;
document.inp.toler.value=0.5;
}

function posB(ch)
{
return(elem.indexOf(ch));
}

function str(istr,strlen,dec)  // format a string or value for output
{
var i;
var mystr = ""+istr;
if (str.arguments.length > 2)
  {
  var decpt = mystr.indexOf(".");
  if (decpt<0) {mystr += "."};
  decpt = mystr.indexOf(".");
  if (dec>0)
    {
    for (i=0;i<dec;++i) {mystr += "0";}
    mystr = mystr.substring(0,(decpt+dec+1));
    }
  else
    {
    if (dec<0) {mystr = mystr.substring(0,decpt)}
    else {mystr = mystr.substring(0,decpt+1)}
    }
  for (i=mystr.length;i<strlen;++i) {mystr = " "+mystr;}
  }
else
  {
  for (i=mystr.length;i<strlen;++i) {mystr += " ";}
  }
return mystr;
}

function SetElem()
{
var i;
ma = (document.inp.ma[0].checked)?"M":"A";
for (i=elem.indexOf('C');i<=elem.indexOf('P');++i)
  {eval("document.inp."+elem.charAt(i)+".value = mass"+ma+"["+posB(elem.charAt(i))+"]");}
}

function SetMass()
{
var i;
ma = (document.inp.ma[0].checked)?"M":"A";
mw = parseFloat(document.inp.mw.value);
toler = parseFloat(document.inp.toler.value);
amuppm = toler;
if (document.inp.ppm.selectedIndex == 1)
  {
  amuppm = mw * 0.000001 * toler;
  }
offs = parseFloat(document.inp.offs.value);

for (i=posB('C');i<=posB('Z');++i)
{
  eval("mass"+ma+"["+posB(elem.charAt(i))+"] = parseFloat(document.inp."+elem.charAt(i)+".value)");
  imin[i] = parseFloat(eval('document.inp.min'+elem.charAt(i)+'.value'));
  imax[i] = parseFloat(eval('document.inp.max'+elem.charAt(i)+'.value'));
}

mass = eval("mass"+ma);

}

function Recur(amass,n,a0,a1,a2,a3,a4,a5,a6,a7,a8)
{
var newmass;
var xmax = Math.min(Math.ceil((mass[n]==0)?0:(amass/mass[n])),imax[n]);
for (var x=imin[n];x<xmax+1;++x)
{
  eval('a'+n+' = x');
  newmass = amass - (x * mass[n]);
  if (Math.abs(newmass) <= amuppm) {WriteOut(newmass,a0,a1,a2,a3,a4,a5,a6,a7,a8);continue;}
  if (n>0) {Recur(newmass,n-1,a0,a1,a2,a3,a4,a5,a6,a7,a8);}
}
}

function WriteOut(newmass,a0,a1,a2,a3,a4,a5,a6,a7,a8)
{
var nni = a2 % 2;
var nominal = 0;
if (ni > 0) {
  nominal = CalcNom(a0,a1,a2,a3,a4,a5,a6,a7,a8);
}
if ((ni == 1) && (nni != nominal % 2))
{
  return;
}
else if ((ni == 2) && (nni == nominal % 2))
{
  return;
}
for (var i=0;i<numel;++i)
{
  if (imax[i]>0)
  {
    result.document.write(str(eval('a'+i),4,-1));
  }
}
result.document.writeln(str(mw-newmass,11,4)+str(newmass,10,4)+str(newmass/mw*1000000,10,1));
++hits;
}


function CalcNom(a0,a1,a2,a3,a4,a5,a6,a7,a8)
{
var anominal = 0;
for (i=0;i<numel;++i)
  {
  anominal = anominal + Math.round(mass[i]* eval("a" + i));
  }
return anominal;
}

function DoCalc()
{
var i;
var outhead="<HTML><HEAD><TITLE>Elemental Composition Output</TITLE></HEAD>\n";
outhead += "<BODY BGCOLOR='#EEBBEE' TEXT='#000000' LINK='#0000FF' VLINK='#FF00FF'>\n<PRE>";
outhead += document.title.bold()+"\n";
hits=0;
var atime = new Date();
startt = atime.getTime();
SetMass();
for (var i=0; i < document.inp.ni.length; i++)
{
  if (document.inp.ni[i].checked)
  {
    ni = document.inp.ni[i].value;
  }
}
for (var i=0; i < document.inp.ch.length; i++)
{
  if (document.inp.ch[i].checked)
  {
    ch = document.inp.ch[i].value;
  }
}
result = window.open("","","resizable=1,menubar=1,scrollbars=1,width=600,height=425");
result.opener = self;
result.document.writeln(outhead);
outhead = "Calculations for :"+str(mw,11,4);
outhead += " +/- "+str(toler,6,3)+" "+document.inp.ppm.options[document.inp.ppm.selectedIndex].text+"\n";
if (offs!=0) {outhead += "Offset mass      :"+str(offs,11,4)+"\n";}
outhead += "charge      : "+ch+"\n";
outhead += eval("ma"+ma)+"\n";
outhead += "\n";
for (i=0;i<numel;++i)
  {
  if (imax[i]>0)
    {
    outhead += str(elem.charAt(i),3,-1)+str(mass[i],11,4);
    outhead += str(imin[i],5,-1);
    outhead += str(imax[i],5,-1)+"\n";
    }
  }
result.document.writeln(outhead.fontcolor("blue"));
for (i=0;i<numel;++i)
  {
  if (imax[i]>0) {result.document.write(str(elem.charAt(i),4,-1));}
  }
result.document.writeln("      mass      diff       ppm\n");
Recur(mw-offs+(ch*electron),numel-1,0,0,0,0,0,0,0,0,0);
var atime = new Date();
outhead = "\nNumber of hits       :"+str(hits,6,-1);
outhead += "\nExecution time       :"+str((atime.getTime()-startt)/1000,10,3)+" seconds\n";
result.document.writeln(outhead.fontcolor("blue"));
result.document.writeln("</PRE>");
result.document.writeln("<FORM><INPUT TYPE='button' VALUE=' Close ' onClick='window.close()'></FORM>");
result.document.writeln("</BODY></HTML>");
result.document.close();
result.focus();
}
