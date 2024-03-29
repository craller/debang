 function page(json) {
     if (!json.id) return false;
     var $Div = document.getElementById(json.id);
     var nowNum = json.nowNum || 1;
     var allNum = json.allNum || 5;

     // 首页
     if (nowNum > 5 && allNum >= 10) {
         var $A = document.createElement('a');
         $A.href = '#1';
         $A.innerHTML = '首页';
         $Div.appendChild($A);
     }
     //上一页
     if (nowNum > 1) {
         var $A = document.createElement('a');
         $A.href = '#' + (nowNum - 1);
         $A.innerHTML = '上一页';
         $Div.appendChild($A);
     }

     // 9个一组
     if (allNum <= 9) {
         for (var i = 1; i <= allNum; i++) {
             var $A = document.createElement('a');
             $A.href = '#' + i;
             if (nowNum === i) {
                 $A.innerHTML = i;
             } else {
                 $A.innerHTML = '[' + i + ']';
             }
             $Div.appendChild($A);
         }
     } else {
         // 以nowNum数为中心 一共 9个数  向左右两侧扩散5 - 1 个数
         for (var i = 1; i <= 9; i++) {
             var $A = document.createElement('a');
             // 当前页数 小于5 时 向左扩散会出现小于1的书 要做特殊处理
             if (nowNum < 5) {
                 $A.href = '#' + i;
                 if (nowNum === i) {
                     $A.innerHTML = i;
                 } else {
                     $A.innerHTML = '[' + i + ']';
                 }
             } else if (allNum - nowNum < 4) {
                 // 最后几页向右扩散 时也会出问题  所以阻止扩散 只显示最后九页                        
                 $A.href = '#' + (allNum - 9 + i);
                 // 特殊处理后4几页
                 if ((allNum - nowNum) === 0 && i === 9) {
                     $A.innerHTML = allNum - 9 + i;
                 } else if ((allNum - nowNum) === 1 && i === 8) {
                     $A.innerHTML = allNum - 9 + i;
                 } else if ((allNum - nowNum) === 2 && i === 7) {
                     $A.innerHTML = allNum - 9 + i;
                 } else if ((allNum - nowNum) === 3 && i === 6) {
                     $A.innerHTML = allNum - 9 + i;
                 } else {
                     $A.innerHTML = '[' + (allNum - 9 + i) + ']';
                 }
             }
             // 正常处理方式 以nowNum为中心 向两侧扩散 4个数
             else {
                 $A.href = '#' + (nowNum - 5 + i);
                 if (i === 5) {
                     $A.innerHTML = nowNum - 5 + i;
                 } else {
                     $A.innerHTML = '[' + (nowNum - 5 + i) + ']';
                 }
             }
             $Div.appendChild($A);
         }
     }

     // 尾页
     if ((allNum - nowNum) > 5) {
         var $A = document.createElement('a');
         $A.href = '#' + allNum;
         $A.innerHTML = '尾页';
         $Div.appendChild($A);
     }
     // 下一页
     if ((allNum - nowNum) > 0) {
         var $A = document.createElement('a');
         $A.href = '#' + (nowNum + 1);
         $A.innerHTML = '下一页';
         $Div.appendChild($A);
     }
     var $All = document.getElementsByTagName('a');
     for (var i = 0; i < $All.length; i++) {
         $All[i].onclick = function() {
             var nowNum = parseInt(this.getAttribute('href').substring(1));
             $Div.innerHTML = '';
             json.nowNum = nowNum;
             page(json);
         }
     }
     //回调函数
     json.callBack(nowNum, allNum);
 }