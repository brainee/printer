
function printer(obj, options) {
    var showkeys = false, maxColumns = 10, maxLevel = 2;
    if (options) {
        showkeys = options.showKeys || showkeys;
        maxColumns = options.maxColumns || maxColumns;
        maxLevel = options.maxLevel || maxLevel;
    }
    var i = 1;
    printObj(obj, i);
    //next[[currentLevel, currentColumn, subObj, subKey]]
    function printLevel(next) {
        i++;
        if (i > maxLevel) {
            console.log("打印超过最大级别数：", maxLevel);
            return;
        }
        if (next && next.length) {
            next.forEach(function (aDescSub) {
                if (aDescSub && aDescSub.length) {
                    var [currentLevel, currentColumn, subObj, subKey] = aDescSub;
                    printObj(subObj, currentLevel, subKey);
                }

            });
        }
    }
    function printObj(obj, currentLevel, parentKey) {
        if (!obj) {
            return;
        }
        var blank = new Array(currentLevel).join("    ");
        var pre = blank + currentLevel + "层";
        var middle = "="
        var keys = Object.keys(obj);
        var next = keys.map(function (subKey, currentColumn) {
            var storeCurrentLevel = currentLevel;
            var subObj = obj[subKey];
            var pre2 = pre + (currentColumn < 10 ? "0" + currentColumn : currentColumn) + "列:";
            pre2 = storeCurrentLevel > 1 ? pre2 + "[" + (parentKey || "") + "]." : pre2;
            if (subObj && typeof (subObj) == "object") {
                //print maxColumns logic
                if (maxColumns === 0 || currentColumn <= maxColumns) {
                    if (subObj instanceof Array && subObj[0] instanceof Object) {
                        console.log(pre2, subKey, middle, getType(subObj), subObj.length, "个", showkeys && "keys=", showkeys && Object.keys(subObj));
                    } else if (subObj instanceof Object) {
                        console.log(pre2, subKey, middle, getType(subObj), showkeys && "keys=", showkeys && Object.keys(subObj));
                    } else {
                        console.log(pre2, subKey, middle, getType(subObj), showkeys && "keys=", showkeys && Object.keys(subObj));
                    }
                }
                //subObj recursion
                if (storeCurrentLevel <= maxLevel) {
                    return [++storeCurrentLevel, currentColumn, subObj, subKey];
                }
            } else {
                //print maxColumns logic
                if (maxColumns === 0 || currentColumn <= maxColumns) {
                    console.log(pre2, subKey, middle, subObj);
                }
            }
        });
        printLevel(next);
    }

    function getType(obj) {
        var type = "";
        if (obj) {
            if (obj.constructor) {
                type = obj.constructor.name;
            } else {
                type = Object.prototype.toString.call(obj);
            }
        } else {
            type = typeof (obj);
        }
        return type;
    }
}
