#Tampermonkey�ͺ�ű�����
[TOC]

#�ű�����
Ľ����-�һ�·���γ̣�https://greasyfork.org/zh-CN/scripts/28115

#��
##1��������ҳ���е��ִ��
�ڽű��ж��庯��`function abc(){ alert("helloWorld"); }`,ע��onclick�¼�`<a id="a" onclick="abc();">HelloWorld</a>`��
��������δ����Ĵ���Function is not defined��
��[mozillazine](http://forums.mozillazine.org/viewtopic.php?p=2007224)�˽⵽Tampermonkey��js�ű�����sandbox�еģ���html�з��ʲ�����
ʹ����������ӿ�������������
```
unsafeWindow.abc = function(msg) {
  alert(msg);
}
document.getElementById("a").onclick = "window.abc('helloWorld')";
```

