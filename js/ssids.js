var ssidJson={random:!1,ssids:[]};function load(){getFile("run?cmd=save ssids",(function(){getFile("ssids.json",(function(s){ssidJson=JSON.parse(s),showMessage("connected"),draw()}))}))}function draw(){var s;s="<tr><th class='id'></th><th class='ssid'></th><th class='lock'></th><th class='save'></th><th class='remove'></th></tr>";for(var e=0;e<ssidJson.ssids.length;e++)s+="<tr><td class='id'>"+e+"</td><td class='ssid' contenteditable='true' id='ssid_"+e+"'>"+esc(ssidJson.ssids[e][0].substring(0,ssidJson.ssids[e][2]))+"</td><td class='lock clickable' onclick='changeEnc("+e+")' id='enc_"+e+"'>"+(ssidJson.ssids[e][1]?"&#x1f512;":"-")+"</td><td class='save'><button class='green' onclick='save("+e+")'>"+lang("save")+"</button></td><td class='remove'><button class='red' onclick='remove("+e+")'>X</button></td></tr>";getE("randomBtn").innerHTML=ssidJson.random?lang("disable_random"):lang("enable_random"),getE("ssidTable").innerHTML=s}function remove(s){ssidJson.ssids.splice(s,1),getFile("run?cmd=remove ssid "+s),draw()}function add(){var s=getE("ssid").value,e=getE("enc").checked,d=getE("ssidNum").value,n=getE("overwrite").checked;if(s.length>0){var i='add ssid "'+s+'"'+(n?" -f":" ")+" -cl "+d;e&&(i+=" -wpa2"),getFile("run?cmd="+i);for(var t=0;t<d;t++)ssidJson.ssids.length>=60&&ssidJson.ssids.splice(0,1),ssidJson.ssids.push([s,e]);draw()}}function enableRandom(){ssidJson.random?getFile("run?cmd=disable random",(function(){load()})):getFile("run?cmd=enable random "+getE("interval").value,(function(){load()}))}function disableRandom(){}function addSelected(){getFile("run?cmd=add ssid -s"+(getE("overwrite").checked?" -f":""))}function changeEnc(s){ssidJson.ssids[s][1]=!ssidJson.ssids[s][1],draw(),save(s)}function removeAll(){ssidJson.ssids=[],getFile("run?cmd=remove ssids"),draw()}function save(s){var e=getE("ssid_"+s).innerHTML.replace("<br>","").substring(0,32),d=ssidJson.ssids[s][1];ssidJson.ssids[s]=[e,d],getFile("run?cmd=replace ssid "+s+' -n "'+e+'" '+(d?"-wpa2":""))}
