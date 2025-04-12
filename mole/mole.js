//
// JavaScript 1.1 routines for MOLE
// by Jef Rozenski (1998)
// last modification : 2021-05-27
//
function sstr(istr,strlen,dec)  // format value for output
{
var mystr = ""+istr;
mystr = istr.toFixed(dec); 
mystr = " ".repeat(strlen) + mystr;
return mystr.substr(mystr.length - strlen);
}

// element name : monoisotopic mass : average mass : intensity M+1 : intensity M+2
// if intensity = -1: isotope abundance not defined
// elements should be in following order: C, H, all other alphabetically
var itel  = new Array();
var isoto = new Array();
var elem = new Array(), m = new Array, a = new Array(); i1 = new Array(); i2 = new Array();
elem[1]="C";   m[1]=12.000000;   a[1]=12.011;     i1[1]=0.011;   i2[1]=0;
elem[2]="H";   m[2]=1.0078246;   a[2]=1.00794;    i1[2]=0.00015; i2[2]=0;
elem[3]="D";   m[3]=2.014101778; a[3]=2.01410;    i1[3]=-1;      i2[3]=-1;
elem[4]="B";   m[4]=11.0093;     a[4]=10.811;     i1[4]=-1;      i2[4]=-1;
elem[5]="Br";  m[5]=78.91839;    a[5]=79.904;     i1[5]=0;       i2[5]=0.9728;
elem[6]="Cl";  m[6]=34.9688531;  a[6]=35.4527;    i1[6]=0;       i2[6]=0.32;
elem[7]="Cs";  m[7]=132.90543;   a[7]=132.9054;   i1[7]=0;       i2[7]=0;
elem[8]="F";   m[8]=18.9984022;  a[8]=18.9984;    i1[8]=0;       i2[8]=0;
elem[9]="I";   m[9]=126.90466;   a[9]=126.90447;  i1[9]=0;       i2[9]=0;
elem[10]="K";  m[10]=38.96371;   a[10]=39.0983;   i1[10]=0.00012;i2[10]=0.07217;
elem[11]="Li"; m[11]=7.016004;   a[11]=6.941;     i1[11]=-1;     i2[11]=-1;
elem[12]="Mg"; m[12]=23.98504;   a[12]=24.3050;   i1[12]=0.12;   i2[12]=0.1394;
elem[13]="N";  m[13]=14.0030738; a[13]=14.00674;  i1[13]=0.0037; i2[13]=0;
elem[14]="Na"; m[14]=22.98980;   a[14]=22.989768; i1[14]=0;      i2[14]=0;
elem[15]="O";  m[15]=15.9949141; a[15]=15.9994;   i1[15]=0.0004; i2[15]=0.002;
elem[16]="P";  m[16]=30.973764;  a[16]=30.97376;  i1[16]=0;      i2[16]=0;
elem[17]="Re"; m[17]=184.9530;   a[17]=186.20487; i1[17]=-1;     i2[17]=-1;
elem[18]="S";  m[18]=31.9720727; a[18]=32.066;    i1[18]=0.0079; i2[18]=0.044;
elem[19]="Se"; m[19]=79.9165;    a[19]=78.96;     i1[19]=-1;     i2[19]=-1;
elem[20]="Si"; m[20]=27.976929;  a[20]=28.0855;   i1[20]=0.051;  i2[20]=0.034;
elem[21]="Sn"; m[21]=119.90220;  a[21]=118.71;    i1[21]=-1;     i2[21]=-1;
elem[22]="Pt"; m[22]=194.9648;   a[22]=195.08;    i1[22]=-1;     i2[22]=-1;
elem[23]="Zn"; m[23]=63.9291448; a[23]=65.38;     i1[23]=-1;     i2[23]=-1;
elem[24]="X";  m[24]=0;          a[24]=0;         i1[24]=-1;     i2[24]=-1;

var forstr,mass = new Array();
// mass of an electron
var elec = 0.000548;

function init(ma)
{
document.inp.selel.length = elem.length;
mass = eval(ma);
for (var i=1;i<elem.length;++i)
  {
  document.inp.selel.options[i].text = (elem[i]+"  ").substr(0,3)+mass[i];
  }
}

function getmass()
{
var i=document.inp.selel.selectedIndex;
if (i > 0)
  {
  mass = (document.inp.X[0].checked)?m:a;
  document.inp.amass.value = mass[i];
  }
}

function putmass()
{
var i=document.inp.selel.selectedIndex;
if (i > 0)
  {
  mass = (document.inp.X[0].checked)?m:a;
  mass[i] = document.inp.amass.value;
  document.inp.selel.options[i].text = (elem[i]+"  ").substr(0,3)+mass[i];
  }
}

function getmul(p)
{
var pend=p;
var nr = "0123456789";
while (nr.indexOf(forstr.charAt(pend))>=0)
  {
  ++pend;
  if (pend>forstr.length) {break;}
  }
var count = parseInt(forstr.substring(p,pend));
count = (count>0)?count:1;
return count;
}

function addiso(elem,n)
{
if ((i1[elem] < 0) || (isoto[0] == -1)) {isoto[0]=-1;return;}
var i;
for (i=9;i>=0;--i)
  {
  isoto[i+1] += isoto[i] * n * i1[elem];
  isoto[i+2] += isoto[i] * n * (n-1) * Math.pow(i1[elem],2) / 2;
  isoto[i+3] += isoto[i] * n * (n-1) * (n-2) * Math.pow(i1[elem],3) / 6;
  isoto[i+4] += isoto[i] * n * (n-1) * (n-2) * (n-3) * Math.pow(i1[elem],4) / 24;
  isoto[i+5] += isoto[i] * n * (n-1) * (n-2) * (n-3) * (n-4) * Math.pow(i1[elem],5) / 120;
  isoto[i+6] += isoto[i] * n * (n-1) * (n-2) * (n-3) * (n-4) * (n-5) * Math.pow(i1[elem],6) / 720;
  isoto[i+7] += isoto[i] * n * (n-1) * (n-2) * (n-3) * (n-4) * (n-5) * (n-6) * Math.pow(i1[elem],7) / 5040;
  isoto[i+8] += isoto[i] * n * (n-1) * (n-2) * (n-3) * (n-4) * (n-5) * (n-6) * (n-7) * Math.pow(i1[elem],8) / 40320;
  isoto[i+9] += isoto[i] * n * (n-1) * (n-2) * (n-3) * (n-4) * (n-5) * (n-6) * (n-7) * (n-8) * Math.pow(i1[elem],9) / 362880;
  isoto[i+2] += isoto[i] * n * i2[elem];
  isoto[i+4] += isoto[i] * n * (n-1) * Math.pow(i2[elem],2) / 2;
  isoto[i+6] += isoto[i] * n * (n-1) * (n-2) * Math.pow(i2[elem],3) / 6;
  isoto[i+8] += isoto[i] * n * (n-1) * (n-2) * (n-3) * Math.pow(i2[elem],4) / 24;
  }
}

function drawiso()
{
if (isoto[0] < 0) {return "\nCannot draw isotope distribution (isotopes for all elements are not defined)";}
var thetable = "\n<TABLE BORDER=0 CELLPADDING=3><TR VALIGN='bottom' ALIGN='center'>",i;
var maxiso = isoto[0];
for (i=1;i<10;++i)
  {
  if (isoto[i] > maxiso) {maxiso = isoto[i];}
  }
for (i=0;i<10;++i)
  {
  isoto[i] = isoto[i]/maxiso;
  thetable += "<TD WIDTH=25>";
  thetable += (Math.round(isoto[i]*150)>0)?("<IMG SRC='red.gif' WIDTH=10 HEIGHT="+Math.round(isoto[i]*150)+" ALT=\"\" TITLE=\""+sstr(isoto[i]*100,4,2)+"%\">"):"&nbsp;";
  thetable += "</TD>";
  }
thetable += "</TR>\n<TR ALIGN='center'><TH><TT>M</TT></TH>";
for (i=1;i<10;++i)
  {
  thetable += "<TH><TT>M+"+i+"</TT></TH>";
  }
thetable += "</TR></TABLE>";
for (i=0;i<10;++i)
  {
  if (isoto[i] === 0) { break; }
  thetable += "\n";
  thetable += (i>0)?("M+"+sstr(i,1,0)+": "):"M  : ";
  thetable += sstr(isoto[i]*100,4,2) + "%";
  }
return thetable;
}

function DoCalc()
{
var totmass=0,outstr="",i,j;

mass = (document.inp.X[0].checked)?m:a;
for (i=1;i<mass.length;++i) {itel[i] = 0;}
for (i=0;i<19;++i) {isoto[i] = 0;}
forstr=document.inp.forla.value;
formul=0;
isoto[0] = 1;

for (i=0;i<forstr.length;++i)
  {
  for (j=elem.length;j>0;--j)
    {
    if (forstr.substring(i,i+2) == elem[j]) {itel[j] += getmul(i+2);break;}
    if (forstr.substring(i,i+1) == elem[j]) {itel[j] += getmul(i+1);break;}
    }
  }

outstr = "<HTML><BODY BGCOLOR='#F0D000'><PRE>"+document.title.bold()+"\n\nFormula: ";

for (j=1;j<=elem.length;++j)
{
if (itel[j]>0)
  {
  totmass += itel[j]*mass[j];
  outstr += elem[j]+(itel[j]+"").sub();
  addiso(j,itel[j]);
  }
}

outstr += "\n\n";
outstr += (document.inp.X[0].checked)?"Monoisotopic":"Average";
outstr += " mass : "+sstr(totmass,12,5)+"\n\n";
outstr += (document.inp.X[0].checked)?"      [M+H]+     [M+Na]+      [M-H]-\n":"";
outstr += (document.inp.X[0].checked)?sstr(totmass+m[2]-elec,12,5)+sstr(totmass+m[14]-elec,12,5)+sstr(totmass-m[2]+elec,12,5)+"\n\n":"";
for (j=0;j<=elem.length;++j)
  {
  if (itel[j]>0)
    {
    outstr += (elem[j]+"  ").substr(0,2)+"("+sstr(mass[j],7,3)+") : "+sstr(100*itel[j]*mass[j]/totmass,10,3)+" %\n";
    } 
  }
outstr += drawiso();

outstr += "<P></PRE><FORM><INPUT TYPE='button' VALUE=' Close ' onClick='window.close()'></FORM></BODY></HTML>";

result = window.open("","result","resizable=1,menubar=1,scrollbars=1,width=550,height=350");
result.document.clear();
result.document.writeln(outstr);
result.document.close();
result.focus();
}
