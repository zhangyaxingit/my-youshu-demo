export function computeData(data, {xSet, ySet, selectCompute}, rule) {
    const filterData = data.map(item =>{
        return rule ? {
            xVal: item[xSet],
            yVal: item[ySet],
            [rule]: item[rule],
        }: 
        {
            xVal: item[xSet],
            yVal: item[ySet],
        }
    })

    let  finalData = {}
    let ruleArr = []
    if (rule) {
        
        switch (selectCompute) {
            case 'sum':
                
                finalData = filterData.reduce((obj, item) => {
                    const ruleKey = item[rule]
                    if (!ruleArr.includes(ruleKey)) ruleArr.push(ruleKey)
                    if (!obj[item.xVal]) {
                        obj[item.xVal] = {[ruleKey]: item.yVal}
                    } else {
                        obj[item.xVal][ruleKey] ? obj[item.xVal][ruleKey] = obj[item.xVal][ruleKey] + item.yVal : obj[item.xVal][ruleKey] = item.yVal
                    }
                    
                    return obj
                }, {})
                break;
            default:
                break;
        }
    } else {
        switch (selectCompute) {
            case 'sum':
                finalData = filterData.reduce((obj, item) => {
                    obj[item.xVal] ? obj[item.xVal] = obj[item.xVal] + item.yVal : obj[item.xVal] = item.yVal
                    return obj
                }, {})
                break;
            case 'aver':
                let itemNum = {}
                const sumData = filterData.reduce((obj, item) => {
                    if (obj[item.xVal]) {
                        obj[item.xVal] = obj[item.xVal] + item.yVal
                        itemNum[item.xVal]++
                    } else {
                        obj[item.xVal] = item.yVal
                        itemNum[item.xVal] = 1
                    }
                    return obj
                }, {})
                Object.keys(sumData).map(item =>{
                    finalData[item] = Math.round(sumData[item] / itemNum[item])
                })
                break;
            case 'max':
                finalData = filterData.reduce((obj, item) => {
                    if (!obj[item.xVal] || obj[item.xVal] < item.yVal) {
                        obj[item.xVal] = item.yVal
                    }
                    return obj
                }, {})
    
                break;
    
            case 'min':
                finalData = filterData.reduce((obj, item) => {
                    if (!obj[item.xVal] || obj[item.xVal] > item.yVal) {
                        obj[item.xVal] = item.yVal
                    }
                    return obj
                }, {})
                break;
                
            default:
                break;
        }
    }

    console.log('finalData', finalData)
    return {finalData, ruleArr: rule ? ruleArr : null};
}