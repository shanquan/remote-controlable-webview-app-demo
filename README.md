#remote controlable webview app demo
ionic框架开发Web APP在电视上针对遥控器操作需进行代码优化。基本方法如下：
- 表单元素（button\input）在页面可见区域，可通过遥控器获取焦点，默认可根据表单元素在页面可视区域的位置通过遥控器的上下左右键导航；由于ionic框架ionic.css中设置了`outline:none`，导致表单元素在获取焦点时界面上看不出区别，所以需在css文件中添加`*:focus{outline: #0761f9 auto 5px!important;}`
- 对于非表单元素的交互，比如ion-item的href跳转、item-checkbox及item-radio控件的操作，则设置tabIndex辅助导航，并在元素对象获取焦点后侦听keydown事件，处理`keycode=13`（确定键按下）后的对应操作

以小米电视安装demo及遥控器操作测试为例说明如下：

#remote button test-按键检测页面
- 表单元素可直接使用遥控器导航，设置tabIndex属性导航时优先级不如元素在屏幕可视区域的上下左右位置关系优先级高；
- 非表单元素，可通过设置tabIndex属性使之变为可获取焦点可导航元素；
- 除首页键、菜单键无法捕捉按下事件外，遥控器的上下左右、确定（OK）键、返回键、音量+键、音量-键都可捕捉按下事件，其中返回键捕获还可设置默认响应事件的优先级，音量控制键捕获后会覆盖默认的音量调整键；

#form-表单页
电视的默认显示960px*540px，不建议一页内容太长引出滚动条，因页面跳转及返回时滚动条的位置不好控制。

#ionic sidemenu-ionic菜单应用模型

#ionic tabs-ionic选项卡应用模型

#ionic checkbox控件的遥控器操作

#ionic radio控件的遥控器操作

#quirks-注意事项

#demo
1. git clone https://git.oschina.net/shanquane/remote-controlable-webview-app-demo.git
2. npm install -g cordova ionic，如已安装ionic环境，此步可跳过
3. 浏览器中查看，可通过tab键在浏览器中测试导航 ionic serve
4. ionic build android，编译apk并在电视上安装，或下载最新[release](https://git.oschina.net/shanquane/remote-controlable-webview-app-demo/attach_files/download?i=70633&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F00%2FAD%2FPaAvDFhKTHKAMR3KADeYZ3XpEDY192.apk%3Ftoken%3Dba2659e894de0182a2f50fb49e1ea921%26ts%3D1481264236%26attname%3Dandroid-debug.apk)



