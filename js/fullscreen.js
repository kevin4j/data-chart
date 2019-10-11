//全屏
$(function(){
	$("#fullscreen").click(function(){
		if($(this).hasClass("fullscreen")){
			$(this).removeClass("fullscreen");
			$(this).find("cite").html("全屏");
			$(".icon-quanping").removeClass("icon-tuichuquanping");
			exitFullScreen();
		}else{
			$(this).addClass("fullscreen");
			$(this).find("cite").html("退出全屏");
			$(".icon-quanping").addClass("icon-tuichuquanping");
			openFullScreen();
		}
	});
})

function openFullScreen(){
	var el = document.documentElement;
	var rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
	    el.mozRequestFullScreen || el.msRequestFullScreen;
	if (rfs) {
	    rfs.call(el);
	} else if (typeof window.ActiveXObject != "undefined") {
	    //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
	    var wscript = new ActiveXObject("WScript.Shell");
	    if (wscript != null) {
	        wscript.SendKeys("{F11}");
	    }
	}
}

//退出全屏
function exitFullScreen(){
	var el = document;
    var cfs = el.cancelFullScreen || el.webkitCancelFullScreen ||
        el.mozCancelFullScreen || el.exitFullScreen;
    if (cfs) {
        cfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}