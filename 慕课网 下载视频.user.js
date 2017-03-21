// ==UserScript==
// @name        Ľ���� ������Ƶ
// @namespace   https://github.com/Ahaochan/Tampermonkey
// @version     0.1.0
// @description ��ȡ���ӣ�������Դ��http://www.imooc.com/course/ajaxmediainfo/?mid=285&mode=flash��ʹ�÷�������������γ̵�����ؼ��ɡ���http://www.imooc.com/learn/285
// @author      Ahaochan
// @match       *://*.imooc.com/learn/*
// @grant       none
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==
//$(document).ready(function(){
    //����������
	var clarityType = 2;
	$("div.mod-tab-menu").after(
		$("<div id='downloadBox' class='course-brief'>"+
			"<h4 style='font-weight:700;font-size: 16px;marginTop:10px'>���������� : </h4>"+
			"<label for='lowClarity'   >Low   </label><input type='radio' id='lowClarity'    name='clarity' value='0' />"+
			"<label for='middleClarity'>Middle</label><input type='radio' id='middleClarity' name='clarity' value='1' />"+
			"<label for='heightClarity'>Height</label><input type='radio' id='heightClarity' name='clarity' value='2' checked='checked' /><br/>"+
		"</div>")
	);
	$("input:radio[name=clarity]").css("margin","auto 50px auto 3px");//���õ�ѡ��
	$("input:radio[name=clarity]").change(function(){clarityType = this.value;$("#downloadBox textarea").text(getTextLinks());});
	//����������

	//��ȡ��������
	var videoes = [];
	var selector = 'a.J-media-item';
	var total = $(selector).length;
	$(selector).each(function(index, element) {
		var $this = $(this);
		var href = this.href;
		var vid = href.substring(href.lastIndexOf('/') + 1, href.length);
		var name = this.innerText;
		var pattern = /\(\d{2}:\d{2}\)/;
		if (!pattern.test(name)) {
			total--;
            if (index == $(selector).length - 1 && !total) { console.log('û����Ƶ�������أ�'); }
			return;
		}
		name = name.replace(/\(\d{2}:\d{2}\)/, '').replace(/\s/g, '');
		$.getJSON("/course/ajaxmediainfo/?mid=" + vid + "&mode=flash", function(response) {
			videoes.push({
				vid: vid,
				name: name,
				url: [ response.data.result.mpath[0], response.data.result.mpath[1], response.data.result.mpath[2] ]
			});
			//��ӵ�����������
			var $link = $("<a href='"+response.data.result.mpath[clarityType]+"' class='downLink' style='position:absolute;right:100px;top:0;' target='_blank'></a>");
			$link.bind("DOMNodeInserted", function() { $(this).empty().text("����"); } );//�Ƴ��ӱ�ǩ
			$this.after($link);
            //���ȫ����������
			if (videoes.length == total) {
				$("#downloadBox h4:first").after('��' + total + '����Ƶ������ɽ���' + videoes.length + '����Ƶ��<br/>');
				$("#downloadBox").append($("<textarea style='width:100%;border:2px solid red;padding: 5px;height: 100px;'>"+getTextLinks()+"</textarea>"));//ȫ������
			}
		});
	});
	//��ȡ��������

	function getTextLinks(){
		var links = "";
		for(var i in videoes) { links += "filename="+videoes[i].name+"&fileurl="+videoes[i].url[clarityType]+"\n"; }
		return links;
	}
//});