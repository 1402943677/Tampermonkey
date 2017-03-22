// ==UserScript==
// @name        Ľ���� ������Ƶ
// @namespace   https://github.com/Ahaochan/Tampermonkey
// @version     0.1.2
// @description ��ȡ���ӣ�������Դ��http://www.imooc.com/course/ajaxmediainfo/?mid=285&mode=flash��ʹ�÷�������������γ̵�����ؼ��ɡ���http://www.imooc.com/learn/285
// @author      Ahaochan
// @match       *://*.imooc.com/learn/*
// @grant       none
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==
//$(document).ready(function(){
    //��������
	var clarityType = 2;
	var outTextType = "idm";
	$("div.mod-tab-menu").after(
		$("<div id='downloadBox' class='course-brief'>"+
			"<div style='float:left;margin-right:70px;'>"+
				"<h4 style='font-weight:700;font-size: 16px;marginTop:10px'>���������� : </h4>"+
				"<label for='lowClarity'   >Low   </label><input type='radio' id='lowClarity'    name='clarity' value='0' />"+
				"<label for='middleClarity'>Middle</label><input type='radio' id='middleClarity' name='clarity' value='1' />"+
				"<label for='heightClarity'>Height</label><input type='radio' id='heightClarity' name='clarity' value='2' checked='checked' />"+
			"</div>"+
			"<div>"+
				"<h4 style='font-weight:700;font-size: 16px;marginTop:10px'>������ʽ : </h4>"+
				"<label for='rawOutText' >raw</label><input type='radio' id='rawOutText'  name='outText' value='raw'/>"+
				"<label for='idmOutText' >idm </label><input type='radio' id='idmOutText'  name='outText' value='idm' checked='checked' />"+
				"<label for='xmlOutText' >xml </label><input type='radio' id='xmlOutText'  name='outText' value='xml' />"+
				"<label for='jsomOutText'>json</label><input type='radio' id='jsomOutText' name='outText' value='json'/><br/>"+
			"</div>"+
		"</div>")
	);
	$("input:radio").css("margin","auto 50px auto 3px");//���õ�ѡ��
	$("input:radio[name=clarity]").change(function() { clarityType = this.value; $("#downloadBox textarea").text(getTextLinks(clarityType,outTextType)); });
	$("input:radio[name=outText]").change(function() { outTextType = this.value; $("#downloadBox textarea").text(getTextLinks(clarityType,outTextType)); });
	//��������

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
			var $link = $("<a href='"+response.data.result.mpath[clarityType]+"' class='downLink' style='position:absolute;right:100px;top:0;' target='_blank'>����</a>");
			$this.after($link);
			$link.bind("DOMNodeInserted", function() {	$(this).find("i").remove();} );//�Ƴ��ӱ�ǩ
			
            //���ȫ����������
			if (videoes.length == total) {
				$("#downloadBox").append('��' + total + '����Ƶ������ɽ���' + videoes.length + '����Ƶ��<br/>');
				$("#downloadBox").append($("<textarea style='width:100%;border:2px solid red;padding: 5px;height: 100px;'>"+getTextLinks(clarityType,outTextType)+"</textarea>"));//ȫ������
				videoes.sort(function(a,b){
					if(a.name>b.name)	return 1;
					else if(a.name<b.name) return -1;
					else return 0;
				});
			}
		});
	});
	//��ȡ��������

	function getTextLinks(clarityType, outTextType){
		if(outTextType === "json")	return JSON.stringify(videoes);
		else {
			var str = "";
			for(var i in videoes) {
				if(outTextType === "xml"){
					str += '\t<video>\n\t\t<url>' + videoes[i].url[clarityType] + '</url>\n\t\t<name>' + videoes[i].name + '</name>\n\t</video>\n';
				} else if(outTextType === "raw"){
					str += videoes[i].url[clarityType]+"\n";
				} else {//idm
					str += "filename="+videoes[i].name+"&fileurl="+videoes[i].url[clarityType]+"\n";
				}
			}
			if(outTextType === "xml")   str = "<?xml version='1.0' encoding='utf-8' ?>\n<videoes>\n"+str+'</videoes>';
			return str;
		}
	}
//});