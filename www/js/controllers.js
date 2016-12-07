angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, $ionicPlatform, $state) {
    var btnClick = function(className) { //模拟按键按下样式
            var btn = document.getElementsByClassName(className);
            btn[0].className = btn[0].className + ' activated';
            $timeout(function() {
                var length = btn[0].className.length;
                btn[0].className = btn[0].className.substring(0, length - 10);
            }, 2000);
        }
        //捕捉返回键按下；backAction()执行可取消事件侦听，151为优先级，150的优先级为返回上一页
        //参考：
    var backAction = $ionicPlatform.registerBackButtonAction(function() {
        btnClick('ion-arrow-return-left');
    }, 151);
    // var menuAction = $ionicPlatform.on('menubutton',function(){
    //     alert('menu');
    // });
    // menu键按下事件无法捕捉
    var volDownAction = $ionicPlatform.on('volumedownbutton', function() {
        btnClick('ion-android-remove');
    }); //捕捉音量减键按下；
    var volUpAction = $ionicPlatform.on('volumeupbutton', function() {
        btnClick('ion-android-add');

    }); //捕捉音量加键按下;
    $scope.keycode = '...';
    $scope.goMenu = function() { //按钮的ng-click事件可在OK确定键后自动执行
        $state.go('menu.list');
    }
    $scope.onkeydown = function(e) { //按键侦听
        target = e.srcElement || e.target;
        keyCode = e.keyCode;
        $scope.keycode = keyCode;
        $timeout(function() {
            $scope.keycode = '...';
        }, 2000);
        if (keyCode == 13) { //enter
            btnClick('btnOK');
            // console.log(target.dataset.href);
            //或者使用data-href属性判断
            if (target.innerHTML == 'form') {
                $state.go('form');
            } else if (target.innerHTML == 'tabs') {
                $state.go('tab.list');
            } else if (target.innerHTML == 'menu') {
                $state.go('menu.list');
            }
        }
        if (keyCode == 38) { //UP方向键
            btnClick('ion-arrow-up-b');
        }
        if (keyCode == 40) { //DOWN方向键
            btnClick('ion-arrow-down-b');
        }
        if (keyCode == 37) { //LEFT方向键
            btnClick('ion-arrow-left-b');
        }
        if (keyCode == 39) { //RIGHT方向键
            btnClick('ion-arrow-right-b');
        }
    }
})

.controller('formCtrl', function($scope, $state) {
        $scope.data = {
            radio: 'radio1',
            text: '',
            psw: '',
            select: 'select1',
            remb: true
        }
        $scope.radioList = [{
            text: 'radio1'
        }, {
            text: 'radio2'
        }, {
            text: 'radio3'
        }, {
            text: 'radio4'
        }, {
            text: 'radio5'
        }]
        $scope.checkboxList = [{
            text: 'checkbox1',
            checked: false
        }, {
            text: 'checkbox2',
            checked: true
        }, {
            text: 'checkbox3',
            checked: false
        }]
        $scope.selectList = ['select1', 'select2', 'select3'];
        //按键需统一在上层元素侦听
        $scope.KeydownFn = function(e) {
                target = e.srcElement || e.target;
                keyCode = e.keyCode;
                if (keyCode == 13) {
                    // console.log(target.getAttribute('name'));
                    if (target.getAttribute('name') == 'checkbox') {
                        $scope.checkboxList[target.dataset.index].checked = !$scope.checkboxList[target.dataset.index].checked;
                    } else if (target.getAttribute('name') == 'radio') {
                        $scope.data.radio = target.value;
                    } else if (target.getAttribute('name') == 'toggle') {
                        $scope.data.remb = !$scope.data.remb;
                    }
                    // 数据双向绑定，改变数据后自动更新视图，ionic checkbox及radio直接触发click事件无效果。
                }
                e.stopPropagation();
            }
            // 按键如果分开侦听，则在TV上无法用遥控器导航到input
            // $scope.checkboxKeydownFn = function(e){
            //     target = e.srcElement||e.target;
            //     keyCode = e.keyCode;
            //     if(keyCode==13){
            //         $scope.checkboxList[target.dataset.index].checked = !$scope.checkboxList[target.dataset.index].checked;
            //     }
            //     e.stopPropagation();
            // }
            // $scope.toggleKeydownFn = function(e){
            //     target = e.srcElement||e.target;
            //     keyCode = e.keyCode;
            //     if(keyCode==13){
            //         $scope.data.remb = !$scope.data.remb;
            //     }
            //     e.stopPropagation();
            // }
        $scope.goDash = function() {
            $state.go('dash');
        }
        $scope.goMenu = function() {
            $state.go('menu.list');
        }
        $scope.goTabs = function() {
            $state.go('tab.list');
        }
    })
    .controller('menuCtrl', function($scope,$rootScope,$location,$ionicSideMenuDelegate) {
        $scope.KeydownFn = function(e) {
            target = e.srcElement || e.target;
            keyCode = e.keyCode;
            if (keyCode == 13) {
                var toHref = target.getAttribute('href');
                if (toHref) {
                    toHref = toHref.substring(1);
                    $location.path(toHref);
                    $ionicSideMenuDelegate.toggleLeft();
                }
            }
            e.stopPropagation();
        }
        $rootScope.$on('$ionicSideMenuOpen', function(e) {
        $scope.menuVisible=true;
        });
        $rootScope.$on('$ionicSideMenuClose', function(e) {
            $scope.menuVisible=false;
        });
    })
    .controller('tabsCtrl', function($scope,$location) {
        $scope.KeydownFn = function(e) {
            target = e.srcElement || e.target;
            keyCode = e.keyCode;
            // console.log(e.path[2].querySelector(':focus'));
            if (keyCode == 13) {
                var toHref = target.getAttribute('href');
                if (toHref) {
                    toHref = toHref.substring(1);
                    $location.path(toHref);
                }
            }else{
                //设置焦点
                if(e.path[2].querySelector(':focus')){
                    var tab = parseInt(e.path[2].querySelector(':focus').getAttribute('tabindex'));
                if(angular.element(e.path[2].querySelectorAll('a')[tab-1]).hasClass('tabfocus')){
                    angular.element(e.path[2].querySelectorAll('a')[tab-1]).removeClass('tabfocus')
                }
                angular.element(e.path[2].querySelectorAll('a')[tab]).addClass('tabfocus');
                }else{
                   angular.element(e.path[2].querySelectorAll('a')[0]).addClass('tabfocus'); 
                } 
            }
            e.stopPropagation();
            }
    })
    .controller('listCtrl', function($scope) {
        $scope.list = [
            { text: 'List1' },
            { text: 'List2' },
            { text: 'List3' },
            { text: 'List4' },
            { text: 'List5' },
            { text: 'List6' },
            { text: 'List7' },
            { text: 'List8' },
            { text: 'List9' },
            { text: 'List10' }
        ]
        $scope.KeydownFn = function(e) {
            target = e.srcElement || e.target;
            keyCode = e.keyCode;
            if (keyCode == 13) {
                console.log(target.getAttribute('href'));
            }
            e.stopPropagation();
        }
    })

.controller('checkboxCtrl', function($scope) {
    $scope.allChecked = true;
    $scope.selectList = ['select1', 'select2', 'select3'];
    
    $scope.checkboxList = [{
        text: 'checkbox1',
        checked: true
    }, {
        text: 'checkbox2',
        checked: true
    }, {
        text: 'checkbox3',
        checked: true
    }, {
        text: 'checkbox4',
        checked: true
    }, {
        text: 'checkbox5',
        checked: true
    }, {
        text: 'checkbox6',
        checked: true
    }, {
        text: 'checkbox7',
        checked: true
    }, {
        text: 'checkbox8',
        checked: true
    }, {
        text: 'checkbox9',
        checked: true
    }, {
        text: 'checkbox10',
        checked: true
    }]
    $scope.checkAll = function(boolv, list) {
        if (boolv === true || boolv === false) {
            for (var i = 0; i < list.length; i++) {
                list[i].checked = boolv;
            }
        }
    }
    $scope.KeydownFn = function(e) {
        target = e.srcElement || e.target;
        keyCode = e.keyCode;
        if (keyCode == 13) {
            if (target.getAttribute('name') == 'checkbox') {
                $scope.checkboxList[target.dataset.index].checked = !$scope.checkboxList[target.dataset.index].checked;
            } else if (target.getAttribute('name') == 'checkall') {
                $scope.allChecked = !$scope.allChecked;
                $scope.checkAll($scope.allChecked, $scope.checkboxList);
            }
        }
        e.stopPropagation();
    }
})

.controller('radioCtrl', function($scope) {
    $scope.data = {
        radio: 'radio1'
    }
    $scope.radioList = [{
        text: 'radio1'
    }, {
        text: 'radio2'
    }, {
        text: 'radio3'
    }, {
        text: 'radio4'
    }, {
        text: 'radio5'
    }]
    $scope.KeydownFn = function(e) {
        target = e.srcElement || e.target;
        keyCode = e.keyCode;
        if (keyCode == 13) {
            $scope.data.radio = target.value;
        }
        e.stopPropagation();
    }
})
// $scope.keyDownFn = function(e){
        //   target = e.srcElement||e.target;
        //   keyCode = e.keyCode;
        //   // //换上下键切换
        //   if(38==keyCode){//up
        //       var tab = parseInt(target.getAttribute('tabindex'));
        //       if(tab==1){
        //           // document.querySelector("[tabindex='5']").focus();//循环
        //       }else{
        //         tab--;
        //         tab = tab.toString();
        //         document.querySelector("[tabindex='"+tab+"']").focus();
        //       }
        //   }else if(40==keyCode){ //down
        //       var tab = parseInt(target.getAttribute('tabindex'));
        //       if(tab==5){
        //         // document.querySelector("[tabindex='1']").focus();
        //       }else{
        //         tab++;
        //         tab = tab.toString();
        //         document.querySelector("[tabindex='"+tab+"']").focus();  
        //       }
        //   }else if(13==keyCode){//触发input click();
        //       if(target.querySelector("input")){
        //           // target.querySelector("input").click();
        //         $scope.data.ip = target.querySelector("input").value;
        //       }
        //   }
        // }