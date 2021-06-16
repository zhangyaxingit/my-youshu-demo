export const data = [
    { "area": "安徽", "sell": 100, "type": "food", "price": 50, "cost": 20, "time": 1 },
    { "area": "安徽", "sell": 457, "type": "book", "price": 60, "cost": 50, "time": 1 },
    { "area": "安徽", "sell": 12, "type": "food", "price": 50, "cost": 20, "time": 2 },
    { "area": "安徽", "sell": 233, "type": "book", "price": 60, "cost": 50, "time": 2 },
    { "area": "浙江", "sell": 563, "type": "food", "price": 50, "cost": 20, "time": 1 },
    { "area": "浙江", "sell": 24, "type": "book", "price": 50, "cost": 20, "time": 1 },
    { "area": "浙江", "sell": 344, "type": "food", "price": 50, "cost": 20, "time": 2 },
    { "area": "浙江", "sell": 234, "type": "book", "price": 50, "cost": 20, "time": 2 },
    { "area": "江苏", "sell": 100, "type": "food", "price": 50, "cost": 20, "time": 1 },
    { "area": "江苏", "sell": 35, "type": "book", "price": 50, "cost": 20, "time": 1 },
    { "area": "江苏", "sell": 133, "type": "food", "price": 50, "cost": 20, "time": 2 },
    { "area": "江苏", "sell": 13, "type": "book", "price": 50, "cost": 20, "time": 2 },
    { "area": "上海", "sell": 67, "type": "food", "price": 50, "cost": 20, "time": 1 },
    { "area": "上海", "sell": 256, "type": "book", "price": 50, "cost": 20, "time": 1 },
    { "area": "上海", "sell": 253, "type": "food", "price": 50, "cost": 20, "time": 2 },
    { "area": "上海", "sell": 233, "type": "book", "price": 50, "cost": 20, "time": 2 }
]

export const dataType = {
    dimension: {
        "area": "地区",
        "type": "类别",
        "time": "月份"
    },
    metric: {
        "sell": "销售额",
        "price": "单价",
        "cost": "成本"
    }
}

export const chartTypes = [
    {name:'bar', dsc:'柱状图'},
    {name:'line', dsc:'折线图'},
    {name:'pie', dsc:'饼状图' },
    {name:'delta', dsc:'增量' },
]

export const computeTypes = [
    {name:'sum', dsc:'求和'},
    {name:'aver', dsc:'求均值'},
    {name:'max', dsc:'最大值' },
    {name:'min', dsc:'最小值' },
]