#remote controlable webview app demo
电视上开发web app的相关资料网上并不多，我只在amazon developer站点上找到了web app on fireTV的一些指导，关于TV上的UI及用户体验参考：[fire-tv design-and-user-experience-guidelines](https://developer.amazon.com/public/solutions/devices/fire-tv/docs/design-and-user-experience-guidelines)
如使用ionic框架开发Web APP在电视上针对遥控器操作需进行代码优化。基本方法如下：
- 表单元素（button\input）在页面可见区域，可通过遥控器获取焦点，默认可根据表单元素在页面可视区域的位置通过遥控器的上下左右键导航；由于ionic框架ionic.css中设置了`outline:none`，导致表单元素在获取焦点时界面上看不出区别，所以需在css文件中添加`*:focus{outline: #0761f9 auto 5px!important;}`outline按照chrome自带focus样式设置
- 对于非表单元素的交互，比如ion-item的href跳转、item-checkbox及item-radio控件的操作，则设置tabIndex辅助导航，并在元素对象获取焦点后侦听keydown事件，处理`keycode=13`（确定键按下）后的对应操作

以小米电视安装demo及遥控器操作测试为例进行说明：

#remote button test-按键检测页面
- 表单元素可直接使用遥控器导航，设置tabIndex属性导航时优先级不如元素在屏幕可视区域的上下左右位置关系优先级高；
- 非表单元素，可通过设置tabIndex属性使之变为可获取焦点可导航元素；
- 除首页键、菜单键无法捕捉按下事件外，遥控器的上下左右、确定（OK）键、返回键、音量+键、音量-键都可捕捉按下事件，其中返回键捕获还可设置默认响应事件的优先级，音量控制键捕获后会覆盖默认的音量调整键；参考[$ionicPlatform](http://ionicframework.com/docs/api/service/$ionicPlatform/)

#form-ionic表单页
电视的默认显示960px*540px，不建议一页内容太长引出滚动条，因页面跳转及返回时滚动条的位置不好控制。
##ionic版本v1.1.0
支持纯css的radio控件的最高版本为v1.1.0,为兼容遥控器操作交互控件需尽量使用原生的html表单标签元素（input/button）,否则TV上的控件难以自动获取焦点且通过代码进行焦点导航比较复杂，而ionic v1.1.0以上版本不再支持纯css的radio控件如下：
```
html
<label class="item item-radio">
    <input type="radio" name='radio' ng-model="data.radio"/>
    <div class="item-content">
      {{ item.text }}
    </div>
    <i class="radio-icon ion-checkmark"></i>
  </label>
```

##form:input text
```
html
<label class="item item-input">
      <span class="input-label">text</span>
      <input type="text" ng-model="data.text">
    </label>
```
##form:input password
```
html
<label class="item item-input">
      <span class="input-label">password</span>
      <input type="password" ng-model="data.psw">
    </label>
```
##form:input select
```
html
<label class="item item-select">
      <span class="select-label">select</span>
    <select ng-model='data.select'>
      <option ng-repeat='item in selectList'>{{item}}</option>
    </select>
</label>
```
##form:toggle
```
html
<div class="item item-toggle">
     toggle
     <label class="toggle toggle-balanced">
       <input type="checkbox" ng-model="data.remb">
       <div class="track" name='toggle' tabindex="12">
         <div class="handle"></div>
       </div>
     </label>
     </div>
```

#ionic sidemenu-ionic菜单应用遥控器操作优化
html
```
html
 <ion-side-menu side="left" ng-show="menuVisible">
    <ion-header-bar class="bar-stable">
      <h1 class="title">Left</h1>
    </ion-header-bar>
    <ion-content ng-keydown="KeydownFn($event)">
      <ion-list>
        <ion-item menu-close href="#/menu/list">
          list
        </ion-item>
        <ion-item menu-close href="#/menu/checkbox">
          checkbox
        </ion-item>
        <ion-item menu-close href="#/menu/radio">
          radio
        </ion-item>
        <ion-item menu-close href="#/dash">
          dash
        </ion-item>
        <ion-item menu-close href="#/form">
          form
        </ion-item>
        <ion-item menu-close href="#/tab/list">
          tabs
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-side-menu>
```
css
```
css
ion-item:focus .item-content{
    border: 2px solid rgba(77, 144, 254, 0.8)!important;
    color: #387ef5!important;
    height: 52px;
}
```
controller.js
```
javascript
$scope.KeydownFn = function(e) {
            target = e.srcElement || e.target;
            keyCode = e.keyCode;
            if (keyCode == 13) {
                var toHref = target.getAttribute('href');
                if (toHref) {
                    //跳转到href属性中的链接页面
                    toHref = toHref.substring(1);
                    $location.path(toHref);
                    $ionicSideMenuDelegate.toggleLeft();
                }
            }
            e.stopPropagation();
        }
        //菜单打开时，显示左侧菜单栏
        $rootScope.$on('$ionicSideMenuOpen', function(e) {
        $scope.menuVisible=true;
        });
        //菜单关闭时，隐藏左侧菜单栏
        $rootScope.$on('$ionicSideMenuClose', function(e) {
            $scope.menuVisible=false;
        });
```
在ionic sidemenu close时，sidemenu依然在屏幕的可视区域所以还会获取焦点，导致页面中的焦点忽然消失。设置菜单不可见时左侧菜单隐藏。

#ionic tabs-ionic选项卡应用遥控器操作优化
tabs选项卡还有问题，代码中的方案待优化

#ionic checkbox控件的遥控器操作优化
html
```
html
<div class="item item-checkbox">
     <label class="checkbox">
       <input type="checkbox" name='checkbox' data-index='{{$index}}' ng-model="item.checked" ng-checked="item.checked">
       <div class="item-content">
    </div>
     </label>
     {{ item.text }}
  </div>
```
css
```
css
input:focus + .item-content {/*checkbox\radio*/
    border: 2px solid rgba(77, 144, 254, 0.8)!important;
    color: #387ef5!important;
    height: 52px;
}
.item-checkbox input:focus {
    outline: 0!important;
}

.item-checkbox .item-content {
    position: relative;
    top: -40px;
    height: 52px;
    left: -15px;
    width: 103%;
}
```

#ionic radio控件的遥控器操作优化
```
html
<label class="item item-radio">
    <input type="radio" name='radio' ng-model="data.radio"/>
    <div class="item-content">
      {{ item.text }}
    </div>
    <i class="radio-icon ion-checkmark"></i>
  </label>
```
```
css
input:focus + .item-content {/*checkbox\radio*/
    border: 2px solid rgba(77, 144, 254, 0.8)!important;
    color: #387ef5!important;
    height: 52px;
}
.item-radio input {/*修正radio样式导致的TV上无法获取焦点问题，将input定位到视图区尽量显示最少*/
    position: relative;
    float: left;
    /*-webkit-appearance:none;*/
    border: 0;
    background: transparent;
    left: -11px;
    top: 20px;
}
```
#quirks-注意事项
- keydown事件如果直接在input焦点元素上侦听，将导致无法input无法获取焦点，所以统一在ion-content上侦听

#demo
1. git clone https://git.oschina.net/shanquane/remote-controlable-webview-app-demo.git
2. npm install -g cordova ionic，如已安装ionic环境，此步可跳过
3. cd remote-controlable-webview-app-demo
    ionic serve 
浏览器中查看，可通过tab键在浏览器中测试导航
4. ionic build android，编译apk并在电视上安装，或下载最新[release](https://git.oschina.net/shanquane/remote-controlable-webview-app-demo/attach_files/download?i=70633&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F00%2FAD%2FPaAvDFhKTHKAMR3KADeYZ3XpEDY192.apk%3Ftoken%3Dba2659e894de0182a2f50fb49e1ea921%26ts%3D1481264236%26attname%3Dandroid-debug.apk)



