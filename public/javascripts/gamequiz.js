//** 1 **/
function myFunctionT1() {document.getElementById("demo1").innerHTML = "✅ จำนวนเต็ม ";}
function myFunctionW1() {document.getElementById("demo1").innerHTML = "❌❌❌";}

//** 2 **/
function myFunctionT2() {document.getElementById("demo2").innerHTML = "✅ 26.83 ";}
function myFunctionW2() {document.getElementById("demo2").innerHTML = "❌❌❌";}

//** 3 **/
function myFunctionT3() {document.getElementById("demo3").innerHTML = "✅ ตัวอักขระ ";}
function myFunctionW3() {document.getElementById("demo3").innerHTML = "❌❌❌";}

//** 4 **/
function myFunctionT4() {document.getElementById("demo4").innerHTML = "✅ double x = 10.5; ";}
function myFunctionW4() {document.getElementById("demo4").innerHTML = "❌❌❌";}

//** 5 **/
function myFunctionT5() {document.getElementById("demo5").innerHTML = "✅ Global Variable";}
function myFunctionW5() {document.getElementById("demo5").innerHTML = "❌❌❌";}

//** 6 **/
function myFunctionT6() {document.getElementById("demo6").innerHTML = "✅ Local Variable";}
function myFunctionW6() {document.getElementById("demo6").innerHTML = "❌❌❌";}

//** 7 **/
function myFunctionT7() {document.getElementById("demo7").innerHTML = "✅ 30";}
function myFunctionW7() {document.getElementById("demo7").innerHTML = "❌❌❌";}

//** 8 **/
function myFunctionT8() {document.getElementById("demo8").innerHTML = "✅ Error";}
function myFunctionW8() {document.getElementById("demo8").innerHTML = "❌❌❌";}

//** 9 **/
function myFunctionT9() {document.getElementById("demo9").innerHTML = "✅ โปรแกรมจะเกิดข้อผิดพลาดในการคอมไพล์เนื่องจากพยายามเปลี่ยนค่าตัวแปร z ที่เป็น const ";}
function myFunctionW9() {document.getElementById("demo9").innerHTML = "❌❌❌";}

//** 10 **/
function myFunctionT10() {document.getElementById("demo10").innerHTML = "✅ โปรแกรมกำหนดค่าคงที่ MAX_VALUE เป็น 100, ประกาศตัวแปรค่าคงที่ x เป็น 80 และ z เป็น 'A' แล้วแสดงผลลัพธ์ 80, A, 100 ";}
function myFunctionW10() {document.getElementById("demo10").innerHTML = "❌❌❌";}

//** 11 **/
function myFunctionT11() {document.getElementById("demo11").innerHTML = "✅";}
function myFunctionW11() {document.getElementById("demo11").innerHTML = "❌❌❌";}

//** 12 **/
function myFunctionT12() {document.getElementById("demo12").innerHTML = "✅";}
function myFunctionW12() {document.getElementById("demo12").innerHTML = "❌❌❌";}

//** 13 **/
function myFunctionT13() {document.getElementById("demo13").innerHTML = "✅";}
function myFunctionW13() {document.getElementById("demo13").innerHTML = "❌❌❌";}

//** 14 **/
function myFunctionT14() {document.getElementById("demo14").innerHTML = "✅";}
function myFunctionW14() {document.getElementById("demo14").innerHTML = "❌❌❌";}

//** 15 **/
function myFunctionT15() {document.getElementById("demo15").innerHTML = "✅";}
function myFunctionW15() {document.getElementById("demo15").innerHTML = "❌❌❌";}

//** 16 **/
function myFunctionT16() {document.getElementById("demo16").innerHTML = "✅";}
function myFunctionW16() {document.getElementById("demo16").innerHTML = "❌❌❌";}


function myFunction() {
    var x = document.getElementById("demo6");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }