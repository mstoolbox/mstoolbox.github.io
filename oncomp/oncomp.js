//
// JavaScript 1.2 routines for ONCOMP
// by Jef Rozenski (1998)
// last modification : 23/01/1999
//
window.defaultStatus = '';
var i,j,mw,sm,ma,dr,toler,offs,hits,hitmass;
var bases = "CUTAGXYZpc";
var maM = "monoisotopic mass";
var maA = "average mass";
var numnuc = bases.length;
var mass = new Array(numnuc);
var mADNA = new Array(numnuc);
var mMDNA = new Array(numnuc);
var mARNA = new Array(numnuc);
var mMRNA = new Array(numnuc);
var imin = new Array(numnuc);
var imax = new Array(numnuc);

function SetStatus(nr,nuc)
{
if (SetStatus.arguments.length<2) {nuc="    "};
var msg = new Array(7);
  msg[1] = "enter here you target mass";
  msg[2] = "enter here the allowable error";
  msg[3] = "here you can specify an offset mass; this value will be subtracted from the target mass";
  msg[4] = "the nucleotides X,Y and Z are intended for user-specified residues";
  msg[5] = "put here the minimum amount of nucleotide "+nuc.charAt(3)+" to be considered in calculation";
  msg[6] = "put here the maximum amount of nucleotide "+nuc.charAt(3)+" to be considered in calculation";
  msg[7] = "this is the "+eval("ma"+ma)+" for "+nuc+"; it can be modified, if necessary";
window.status = msg[nr];
}

function SetDefault()
{
mMDNA[posB('C')] = 289.04637;mMDNA[posB('U')] = 290.03038;
mMDNA[posB('T')] = 304.04603;mMDNA[posB('A')] = 313.05760;
mMDNA[posB('G')] = 329.05251;mMDNA[posB('p')] = 79.96633;
mMDNA[posB('c')] = 61.95577;
mADNA[posB('C')] = 289.18;mADNA[posB('U')] = 290.17;
mADNA[posB('T')] = 304.20;mADNA[posB('A')] = 313.21;
mADNA[posB('G')] = 329.21;mADNA[posB('p')] = 79.98;
mADNA[posB('c')] = 61.96;
mMRNA[posB('C')] = 305.04128;mMRNA[posB('U')] = 306.02529;
mMRNA[posB('T')] = 320.04094;mMRNA[posB('A')] = 329.05251;
mMRNA[posB('G')] = 345.04743;mMRNA[posB('p')] = 79.96633;
mMRNA[posB('c')] = 61.95577;
mARNA[posB('C')] = 305.18;mARNA[posB('U')] = 306.17;
mARNA[posB('T')] = 320.20;mARNA[posB('A')] = 329.21;
mARNA[posB('G')] = 345.21;mARNA[posB('p')] = 79.98;
mARNA[posB('c')] = 61.96;

document.inp.ma[0].click();
document.inp.dr[0].click();
document.inp.ph[0].click();

mass = mADNA;
ma = "A";
for (i=bases.indexOf('C');i<=bases.indexOf('G');++i)
  {eval("document.inp."+bases.charAt(i)+".value = "+mass[i]);}

document.inp.X.value=0;document.inp.minX.value=0;document.inp.maxX.value=0;
document.inp.Y.value=0;document.inp.minY.value=0;document.inp.maxY.value=0;
document.inp.Z.value=0;document.inp.minZ.value=0;document.inp.maxZ.value=0;
document.inp.offs.value=0;
document.inp.mw.value=0;
document.inp.toler.value=1.0;
}

function posB(ch)
{
return(bases.indexOf(ch));
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

function SetBase()
{
var i;
ma = (document.inp.ma[0].checked)?"A":"M";
dr = (document.inp.dr[0].checked)?"DNA":"RNA";
for (i=bases.indexOf('C');i<=bases.indexOf('G');++i)
  {eval("document.inp."+bases.charAt(i)+".value = m"+ma+dr+"["+posB(bases.charAt(i))+"]");}
}

function SetMass()
{
var i;
ma = (document.inp.ma[0].checked)?"A":"M";
dr = (document.inp.dr[0].checked)?"DNA":"RNA";
toler = parseFloat(document.inp.toler.value);
offs = parseFloat(document.inp.offs.value);
mw = parseFloat(document.inp.mw.value);

for (i=posB('C');i<=posB('Z');++i)
{
  eval("m"+ma+dr+"["+posB(bases.charAt(i))+"] = parseFloat(document.inp."+bases.charAt(i)+".value)");
  imin[i] = parseFloat(eval('document.inp.min'+bases.charAt(i)+'.value'));
  imax[i] = parseFloat(eval('document.inp.max'+bases.charAt(i)+'.value'));
}

mass = eval("m"+ma+dr);

var p = posB('p');
var c = posB('c');

imin[p] = 0;
imax[p] = 0;
imin[c] = 0;
imax[c] = 0;

for (i=0;i<=document.inp.ph.length;++i) {if (document.inp.ph[i].checked) {break}}
if (i==1) {imin[p] = 1;imax[p] = 1;}
if (i==2) {imin[p] = 2;imax[p] = 2;}
if (i==3) {imin[p] = 1;imax[p] = 1;
           imin[c] = 1;imax[c] = 1;}
if (i==4) {imin[p] = 0;imax[p] = 2;
           imin[c] = 0;imax[c] = 1;}
}

function Recur(amass,n,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9)
{
var newmass;
var xmax = Math.min(Math.ceil((mass[n]==0)?0:(amass/mass[n])),imax[n]);
for (var x=imin[n];x<xmax+1;++x)
{
  eval('a'+n+' = x');
  newmass = amass - (x * mass[n]);
 if (Math.abs(newmass) <= toler) {WriteOut(newmass,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9);continue;}
 if ((n>0) && (a8+a9 <= 2)) {Recur(newmass,n-1,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9);}
}
}

function WriteOut(newmass,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9)
{
for (var i=0;i<numnuc;++i)
{
if (imax[i]>0)
  {
    result.document.write(str(eval('a'+i),3,-1));
  }
}
result.document.writeln(str(mw-newmass,10,3)+str(newmass,10,3));
++hits;
}

function DoCalc()
{
var i;
var outhead="<HTML><HEAD><TITLE>Oligo Composition Output</TITLE></HEAD>\n";
outhead += "<BODY BGCOLOR='#FFCCCC' TEXT='#000000' LINK='#0000FF' VLINK='#FF00FF'>\n<PRE>";
outhead += document.title.bold()+"\n";
hits=0;
var atime = new Date();
startt = atime.getTime();
SetMass();
result = window.open("","","resizable=1,menubar=1,scrollbars=1,width=600,height=425");
result.opener = self;
result.document.writeln(outhead);
outhead = "Calculations for :"+str(mw,10,3);
outhead += " +/- "+str(toler,6,3)+"\n";
if (offs!=0) {outhead += "Offset mass      :"+str(offs,10,3)+"\n";}
outhead += "Values used      : "+dr+", "+eval("ma"+ma)+"\n";
outhead += "\n";
for (i=0;i<numnuc;++i)
  {
  if (imax[i]>0)
    {
    outhead += str(bases.charAt(i),3,-1)+str(mass[i],10,3);
    outhead += str(imin[i],5,-1);
    outhead += str(imax[i],5,-1)+"\n";
    }
  }
result.document.writeln(outhead.fontcolor("green"));
for (i=0;i<numnuc;++i)
  {
  if (imax[i]>0) {result.document.write(str(bases.charAt(i),3,-1));}
  }
result.document.writeln("    mass       diff\n");
Recur(mw-offs+mass[posB('c')],numnuc-1,0,0,0,0,0,0,0,0,0,0);
var atime = new Date();
outhead = "\nNumber of hits       :"+str(hits,6,-1);
outhead += "\nExecution time       :"+str((atime.getTime()-startt)/1000,10,3)+" seconds\n";
result.document.writeln(outhead.fontcolor("green"));
result.document.writeln("</PRE>");
result.document.writeln("<FORM><INPUT TYPE='button' VALUE=' Close ' onClick='window.close()'></FORM>");
result.document.writeln("</BODY></HTML>");
result.document.close();
result.focus();
}
