//ȫ��
$(function(){
	$("#fullscreen").click(function(){
		if($(this).hasClass("fullscreen")){
			$(this).removeClass("fullscreen");
			$(this).find("cite").html("ȫ��");
			$(".icon-quanping").removeClass("icon-tuichuquanping");
			exitFullScreen();
		}else{
			$(this).addClass("fullscreen");
			$(this).find("cite").html("�˳�ȫ��");
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
	    //for IE��������ʵ����ģ���˰��¼��̵�F11��ʹ�����ȫ��
	    var wscript = new ActiveXObject("WScript.Shell");
	    if (wscript != null) {
	        wscript.SendKeys("{F11}");
	    }
	}
}

//�˳�ȫ��
function exitFullScreen(){
	var el = document;
    var cfs = el.cancelFullScreen || el.webkitCancelFullScreen ||
        el.mozCancelFullScreen || el.exitFullScreen;
    if (cfs) {
        cfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        //for IE�������fullScreen��ͬ��ģ�ⰴ��F11���˳�ȫ��
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}