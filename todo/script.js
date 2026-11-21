var deletedList = [];
var editing = 0;

function displayItems() {
  let outstr = "";
  let keys = sortKeys(localStorage);
  for (let i = 0; i < keys.length; i++) {
    outstr += makeItem(keys[i], localStorage.getItem(keys[i]));
  }
  document.getElementById("tasks").innerHTML = outstr;
  for (let i = 0; i < keys.length; i++) {
    if (localStorage.getItem(keys[i]).indexOf('\u200D') < 0) {
	  document.getElementById(keys[i] + "O").className = 'notdone';
      document.getElementById(keys[i] + "O").style.opacity = '1.0';
	  document.getElementById(keys[i] + "Q").checked = false;
	}
    else {
      document.getElementById(keys[i] + "O").className = 'isdone';
      document.getElementById(keys[i] + "O").style.opacity = '0.4';
	  document.getElementById(keys[i] + "Q").checked = true;
    }
  }
  if (deletedList.length == 0) {
  	document.getElementById("undomenu").className = 'myhr inactive';
  }
  else {
    document.getElementById("undomenu").className = 'myhr active';
  }
}

function makeItem(thekey, theval) {
  let outstr = "";
  outstr += "<PRE class='notdone' id='???O'><div id='???Z' CLASS='items'>";
  outstr += "<div class='thecheck'><INPUT type='checkbox' id='???Q' onClick='isDone(this.id)'></div>";
  outstr += "<div class='thetext' id='???X' onClick='isDone(this.id)' class='thetext'>$$$</DIV>";
  outstr += "<div class='btncont'><div class='thebutton'><button class='btn' id='???Y' onClick='deleteItem(this.id)' title='delete this item'><i class='icon icon-sm icon-jr-delthis'></i></button></div>";
  outstr += "<div class='thebutton'><button class='btn' id='???C' onClick='editItem(this.id)' title='edit this item'><i class='icon icon-sm icon-jr-editthis'></i></button></div></div>";
  outstr += "</div></PRE>";
  outstr = outstr.replaceAll("???",thekey);
  return outstr.replaceAll("$$$",theval);
}

function delAll() {
  let keys = Object.keys(localStorage);
  deletedList = [];
  for (let i = 0; i < keys.length; i++) {
    let value = localStorage.getItem(keys[i]);
	deletedList.push([keys[i],value]);
    }
  localStorage.clear();
  displayItems();
}

function delDone() {
  let keys = Object.keys(localStorage);
  deletedList = [];
  for (let i = 0; i < keys.length; i++) {
    let value = localStorage.getItem(keys[i]);
    if (value.indexOf('\u200D') > 0) {
	  deletedList.push([keys[i],value]);
	  localStorage.removeItem(keys[i]);
    }
  }
  displayItems();
}

function addItem() {
  let thetask = document.getElementById("inp").value;
  let thekey = 0;
  if (thetask.length > 0) {
	if (editing > 0) {
	  thekey = editing;
      localStorage.removeItem(thekey);
	}
	else {
	  thekey = Date.now();
	}
    localStorage.setItem(thekey,document.getElementById("inp").value);
	document.getElementById("inp").value = "";
	editing = 0;
    displayItems();
  }
}

function deleteItem(what) {
  what = what.replace(/[^0-9]/g,"");
  let value = localStorage.getItem(what);
  deletedList = [];
  deletedList.push([what,value]);
  localStorage.removeItem(what);
  displayItems();
}

function editItem(what) {
  what = what.replace(/[^0-9]/g,"");
  let value = localStorage.getItem(what);
  document.getElementById("inp").value = value;
  editing = what;
//  localStorage.setItem(Date.now(),document.getElementById("inp").value);
//  displayItems();
}

function restoreItems() {
  let key = "";
  let value = "";
  for (let i = 0; i < deletedList.length; i++) {
    let [key, value] = deletedList[i];
	localStorage.setItem(key,value);
  }
  deletedList = [];
  displayItems();
}

function isDone(what) {
  what = what.replace(/[^0-9]/g,"");
  let theclass = document.getElementById(what + "O").classname;
  let theval = localStorage.getItem(what);
  if (theval.indexOf('\u200D') < 0) {
	theval += '\u200D';
  }
  else {
	theval = theval.replaceAll("\u200D","");
  }
  localStorage.setItem(what,theval);
  displayItems();
}

function sortKeys(obj) {
  let keys = Object.keys(obj).sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  return keys;
}

function showMenu() {
  document.getElementById("themenu").style.visibility = "visible";
}

function hideMenu() {
  document.getElementById("themenu").style.visibility = "hidden";
}
