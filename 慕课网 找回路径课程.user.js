// ==UserScript==
// @name        Ľ���� �һ�·���γ�
// @namespace   https://github.com/Ahaochan/Tampermonkey
// @version     0.1
// @description ��Ľ������ʧ��·���γ���ʾ������������Դ��Ľ����App4.2.3��ʹ�÷����������ҳ�Ϸ�ְҵ·������������http://www.imooc.com/course/program
// @author      Ahaochan
// @match       http://www.imooc.com/course/program
// @grant    	unsafeWindow
// ==/UserScript==


var courses = new Array(
	/*  0: */"",
	/*  1: */"",
	/*  2: */"",
	/*  3: */"Webǰ�˹���ʦ�ɳ���һ�׶�(����ƪ)",
	/*  4: */"",
	/*  5: */"",
	/*  6: */"",
	/*  7: */"",
	/*  8: */"",
	/*  9: */"",
	/* 10: */"",
	/* 11: */"PHP��������ʦ���ؼ�--��ʶPHP",
	/* 12: */"",
	/* 13: */"",
	/* 14: */"",
	/* 15: */"",
	/* 16: */"",
	/* 17: */"��0��ʼѧϰ����QQ�໬�˵�",
	/* 18: */"ģʽ��ʦ���ɱ���֮Java��",
	/* 19: */"",
	/* 20: */"jQueryԴ��̽��֮��",
	/* 21: */"������վȫվ��������",
	/* 22: */"��Ӧʽ������Щ��",
	/* 23: */"�㶨Java�ӽ���",
	/* 24: */"Android��н����--�Զ���View",
	/* 25: */"",
	/* 26: */"ǰ�˾��䰸������֮��ͼƬ����Ϣչʾ��",
	/* 27: */"���㿪ʼѧϰThinkPHP���",
	/* 28: */"�ߵ¿����߱���֮·����JS APIƪ",
	/* 29: */"�ߵ¿����߱���֮·����Android SDKƪ",
	/* 30: */"",
	/* 31: */"Java����ʦ",
	/* 32: */"Webǰ�˹���ʦ",
	/* 33: */"Android����ʦ",
	/* 34: */"PHP����ʦ",
	/* 35: */"ǰ�˾��䰸������֮ \"��ҳ������Ч\"",
	/* 36: */"Android��н���������ϵ�����",
	/* 37: */"C����ѧϰ����",
	/* 38: */"Tony��ʦ��shell",
	/* 39: */"Swift��н����-iOS�����ؼ�",
	/* 40: */"Oracle���ݿ⿪���ر�����",
	/* 41: */"",
	/* 42: */"C++Զ������",
	/* 43: */"����HTML5������������Ϸ",
	/* 44: */"СĽ�ж��ƻ�-ʵսHot!!!",
	/* 45: */"Linux��ά����ʦ",
	/* 46: */"iOSƻ����������",
	/* 47: */"Cocos2d-x��Ϸ������������",
	/* 48: */"Hibernate��������",
	/* 49: */"Linux shell��άʵս",
	/* 50: */"Android-΢�����Ź��ܺϼ�",
	/* 51: */"�㶨python����",
	/* 52: */"����Python����",
	/* 53: */"PHP΢�Ź���ƽ̨��������",
	/* 54: */"���ٸ㶨PHP��������¼",
	/* 55: */"������תYii���",
	/* 56: */"̽��Python����",
	/* 57: */"Android�ر�����֮�������",
	/* 58: */"��׿��Ч�ϼ������ײ�",
	/* 59: */"�㶨Java SSM��ܿ���",
	/* 60: */"SSH���̽��"
	);
var item_height = "232px";
var courses_route    = new Array(45,34,33,32,31);
var courses_all      = new Array(3,11,17,18,20,21,22,23,24,26,27,28,29,31,32,33,34,35,36,37,38,39,40,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60);
var courses_web_font = new Array(43,35,28,26,22,20,3);
var courses_web_back = new Array(60,59,56,55,54,53,52,51,49,48,42,40,37,38,23,18,27,11);
var courses_mobile   = new Array(58,57,50,47,46,44,39,36,29,24,17);
var courses_station  = new Array("21");
var titles    = new Array("·��", "ȫ��", "ǰ��", "���", "�ƶ�", "��վ");
var titles_en = new Array("route", "all", "web_font", "web_back", "mobile", "station");


document.getElementById("footer").style.position="relative";//�����ײ���
create();//����
function create(){
	var programMain = document.getElementById("programMain");
	
	var plan = document.createElement("div");
	plan.className = "plan";
	plan.style.margin = "margin: 0px auto auto;";
	programMain.appendChild(plan);
	
	var plan_box = document.createElement("div");
	plan_box.className = "plan-box clearfix";
	plan_box.id = "plan-box";
	plan.appendChild(plan_box);
	
	createHeader(plan);
	createBox(plan_box, "route");
}

function createHeader(source){
	var header = document.createElement("div");
	header.id = "header";
	source.insertBefore(header, document.getElementById("plan-box"));
	
	var nav = document.createElement("div");
	nav.id = "nav";
	nav.className = "page-container";
	header.appendChild(nav);
	
	var logo = document.createElement("div");
	logo.id = "logo";
	logo.className = "logo";
	logo.innerHTML = "<a href=\"/\" target=\"_self\" class=\"hide-text\" title=\"��ҳ\">Ľ����</a>";
	nav.appendChild(logo);
	
	var nav_item = document.createElement("ul");
	
	nav_item.className = "nav-item";
	for(var i = 0; i < titles.length; i++){
		var li = document.createElement("li");
		var a  = document.createElement("a");
		var text = document.createTextNode(titles[i]);
		a.setAttribute("onclick", "window.nav_click("+i+")");
		a.appendChild(text);
		li.appendChild(a);
		nav_item.appendChild(li);
	}
	nav.appendChild(nav_item);
}

unsafeWindow.nav_click = function(id){ 
	var plan_box = document.getElementById("plan-box");
	while(plan_box.hasChildNodes()) {
		plan_box.removeChild(plan_box.firstChild);
	}
	createBox(plan_box, titles_en[id]);	
};
function createBox(source, title){
	var courses = eval('courses_'+title);
	for(var i = 0; i < courses.length; i++){
		var item = createItemBox(courses[i]);
		source.appendChild(item);
	}
	resetMargin();
};

function createItemBox(id){
	var plan_item_box = document.createElement("div");
	plan_item_box.className = "plan-item-box";

	var a = document.createElement("a");
	a.href   = "http://www.imooc.com/course/programdetail/pid/"+id;
	a.target = "_blank";
	plan_item_box.appendChild(a);

	var plan_item = document.createElement("div");
	plan_item.className = "plan-item js-planItem";
	plan_item.style.height = item_height;
	a.appendChild(plan_item);

	var bottom = document.createElement("div");
	bottom.className = "bottom";
	plan_item.appendChild(bottom);

	var bottomh = document.createElement("div");
	bottomh.className = "bottomh";
	bottom.appendChild(bottomh);

	var h2 = document.createElement("h2");
	var course = document.createTextNode(courses[id]);
	h2.appendChild(course);
	bottomh.appendChild(h2);

	var c_line = document.createElement("c-line");
	c_line.className = "c-line";
	plan_item_box.appendChild(c_line);
	
	var d_line = document.createElement("d-line");
	d_line.className = "d-line";
	plan_item_box.appendChild(d_line);

	return plan_item_box;
};

function resetMargin(){
	var plans = document.getElementsByClassName("plan");
	for(var i = 0; i < plans.length; i++){
		plans[i].style.margin = "30px auto auto";
	}
};