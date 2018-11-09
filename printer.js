function printer(obj, level = 2) {

    var i = 1;
    printObj(obj,i);
    //next[[currentLevel, currentColumn, subObj, subKey]]
    function printLevel(next){
        i++;
        if(i>level){
            console.log("打印超过最大级别数：",level);
            return;
        }
        
        if (next && next.length) {
            next.forEach(function (aDescSub) {
                if (aDescSub && aDescSub.length) {
                    var [currentLevel, currentColumn, subObj, subKey] = aDescSub;
                    printObj(subObj, currentLevel,subKey);
                }

            });
        }
    }

    function printObj(obj, currentLevel,parentKey) {
        if(!obj){
            return;
        }
        var blank = new Array(currentLevel).join("    ");
        var pre = blank + currentLevel + "层";
        var middle = "="
        var keys = Object.keys(obj);
        var next=keys.map(function (subKey, currentColumn) {
            var subObj = obj[subKey];
            var pre2 = pre + (currentColumn<10?"0"+currentColumn:currentColumn) + "列:";
            pre2=currentLevel>1?pre2+"["+(parentKey||"")+"]:":pre2;
            if (subObj instanceof Object) {
                if (currentLevel <= level) {
                    console.log(pre2, subKey);
                    return [++currentLevel, currentColumn, subObj, subKey];
                } else {
                    console.log(pre2, subKey, middle, Object.prototype.toString.call(subObj));
                }
            } else {
                console.log(pre2, subKey, middle, subObj);
            }
        });
        printLevel(next);
    }
}
