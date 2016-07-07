/**
 * Created by kazeki on 5/8/2016.
 */
/**
 * Created by kazeki on 5/6/2016.
 */
function doDayTime(){
    var myVar = setInterval(myTimer, 1000);

    function myTimer() {
        var t = new Date();
        document.getElementById("timenow").innerHTML =  t.toLocaleTimeString();
        var d = new Date().getDay();
        switch (d) {
            case 0:
                document.getElementById("timenow").innerHTML = "Sunday " + t.toLocaleTimeString();
                break;
            case 1:
                document.getElementById("timenow").innerHTML = "Monday " + t.toLocaleTimeString();
                break;
            case 2:
                document.getElementById("timenow").innerHTML = "Tuesday " + t.toLocaleTimeString();
                break;
            case 3:
                document.getElementById("timenow").innerHTML = "Wednesday " + t.toLocaleTimeString();
                break;
            case 4:
                document.getElementById("timenow").innerHTML = "Thursday " + t.toLocaleTimeString();
                break;
            case 5:
                document.getElementById("timenow").innerHTML = "Friday " + t.toLocaleTimeString();
                break;
            case 6:
                document.getElementById("timenow").innerHTML = "Saturday " + t.toLocaleTimeString();
                break;
                console.log(d)
        }
        function myFunction() {
            var x = screen.width + "px";
            document.getElementById("outbox").innerHTML = x;
        }
        /*    {
         var t = new Date();
         document.getElementById("timenow").innerHTML = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
         console.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds());
         }  */
    }
}
