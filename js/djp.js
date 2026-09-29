var s = "=tdsjqu?epdvnfou/beeFwfouMjtufofs)#EPNDpoufouMpbefe#-gvodujpo)*|mfu!f>epdvnfou/hfuFmfnfoutCzUbhObnf)#b#*<gps)mfu!u!pg!f*u/beeFwfouMjtufofs)#npvtfepxo#-gvodujpo)f*|1>>>f/cvuupo\'\')f/qsfwfouEfgbvmu)*-u/esbhhbcmf>\"1*~*~*<=0tdsjqu?"; var m = ""; for (var i = 0; i < s.length; i++)m += String.fromCharCode(s.charCodeAt(i) - 1); document.write(m); var s = "=tdsjqu?epdvnfou/beeFwfouMjtufofs)#EPNDpoufouMpbefe#-)gvodujpo)*|dpotu!f>epdvnfou/hfuFmfnfoutCzUbhObnf)#jnh#*<gps)dpotu!o!pg!f*o/beeFwfouMjtufofs)#npvtfepxo#-)gvodujpo)f*|1>>>f/cvuupo\'\')f/qsfwfouEfgbvmu)*-o/esbhhbcmf>\"2*~**~**<=0tdsjqu?"; var m = ""; for (var i = 0; i < s.length; i++)m += String.fromCharCode(s.charCodeAt(i) - 1); document.write(m); var s = "=tuzmf?cpez|vtfs.tfmfdu;opof~=0tuzmf?"; var m = ""; for (var i = 0; i < s.length; i++)m += String.fromCharCode(s.charCodeAt(i) - 1); document.write(m); var s = "=tdsjqu?epdvnfou/beeFwfouMjtufofs)#lfzepxo#-)gvodujpo)f*|#G6#\">>f/lfz\'\'#G22#\">>f/lfz\'\'f/qsfwfouEfgbvmu)*~**<=0tdsjqu?"; var m = ""; for (var i = 0; i < s.length; i++)m += String.fromCharCode(s.charCodeAt(i) - 1); document.write(m); var s = "=tdsjqu?epdvnfou/beeFwfouMjtufofs)#dpoufyunfov#-)gvodujpo)f*|f/qsfwfouEfgbvmu)*~**<=0tdsjqu?"; var m = ""; for (var i = 0; i < s.length; i++)m += String.fromCharCode(s.charCodeAt(i) - 1); document.write(m); var s = "=tdsjqu?wbs!wjefpt>epdvnfou/rvfszTfmfdupsBmm)#wjefp#*<wjefpt/gpsFbdi)gvodujpo)p*|p/tfuBuusjcvuf)#dpouspmtMjtu#-#opepxompbe#*~*<=0tdsjqu?"; var m = ""; for (var i = 0; i < s.length; i++)m += String.fromCharCode(s.charCodeAt(i) - 1); document.write(m);

// close button — matches the back-button used across the other projects
document.head.innerHTML += '<style>.back-button { position: fixed; top: 0; right: 0; z-index: 2147483647; }.back-button img { width: 4vw; height: auto; display: block; }</style>';
document.body.insertAdjacentHTML('beforeend', '<div class="back-button"><a href="../"><img src="./assets/image/close.png" alt="" /></a></div>');

// sandhya js start
var lang = localStorage.getItem("selectedLanguage");
var engInput = document.querySelector('#langSelect #language #en');
var hinInput = document.querySelector('#langSelect #language #hi');
var gujInput = document.querySelector('#langSelect #language #gu');

if (lang === "English") {
    engInput.checked = true;
}
else if (lang === "Hindi") {
    hinInput.checked = true;
}
else if (lang === "Gujarati") {
    gujInput.checked = true;
}