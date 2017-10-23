//var funcResultCallbackTokenId = null;

function PushPlugin() {}
PushPlugin.prototype.getToken = function(callBackTokenId){

  var callBackFunc = callBackTokenId;
	
  var callbackSuccess = function(result)
  {
	  console.log("tokenId: " + result);
	  if(callBackFunc != null)
	  {
		  callBackFunc(result);
	  }
  };
  var callbackFail = function(error){
	//alert(error);
	console.log(error);
  };
  cordova.exec(callbackSuccess, callbackFail, "PushPlugin", "token", []);
};

function VersionPlugin() {}
VersionPlugin.prototype.getVersion = function(callBackVer){

  var callBackVerFunc = callBackVer;

  var callbackSuccess = function(result)
  {
	  console.log("appVersion: " + result);
		
	  if(callBackVerFunc != null)
	  {
		  callBackVerFunc(result);
	  }

	  //alert(result);
  };

  var callbackFail = function(error)
  {
	  console.log(error);
	//alert(error);
  };

  cordova.exec(callbackSuccess, callbackFail, "VersionPlugin", "version", []);
};
/*
function CallPlugin() {}

CallPlugin.prototype.invokeSipApp = function(userId,addr,device)
{
	var invokeString = "cvnetSIP://sec?loginId=" + userId +
						"&api=https://" + addr+'/cvnet/'+device+'/getSIPInfo.do';
	cordova.exec(null, null, "CallPlugin", "invoke", [invokeString]);
}

CallPlugin.prototype.enableSipApp = function(enable)
{
	var invokeString = "cvnetSIP://sec?isEnable=" + enable;
	cordova.exec(null, null, "CallPlugin", "invoke", [invokeString]);
}

CallPlugin.prototype.callSipApp = function()
{
	var invokeString = "cvnetSIP://sec";
	cordova.exec(null, null, "CallPlugin", "invoke", [invokeString]);
}*/
function VoiceControlPlugin() {}
VoiceControlPlugin.prototype.control = function(callBackVoice, lang)
{
	var callBackFuncVoice = callBackVoice;

	var callbackSuccess = function(result)
	{
		//alert(JSON.stringify(result));
		if(callBackFuncVoice != null)
		{
			callBackFuncVoice(JSON.stringify(result));
		}
	};

	var callbackFail = function(error)
	{
		//alert(error);
		console.log(error);
	};

	cordova.exec(callbackSuccess, callbackFail, "VoiceControlPlugin", "control", [lang]);	//언어 (0:한국어, 1:영어, 2:중국어)
};

module.exports = new PushPlugin();
//module.exports = new VersionPlugin();
//module.exports = new CallPlugin();
module.exports = new VoiceControlPlugin();


