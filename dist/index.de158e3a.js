// 测试
// 1、为指定选择器添加类名
const test = $("#test").addClass("red").addClass("yellow");
// 2.查找 #test2 里的 #child 元素,并为其添加类名作为区分
const test2 = $("#test2").find("#child").addClass("black");
// 3.返回到 #test2,并为其添加类名作为区分
const end = test2.end().addClass("pink");
// 4.遍历元素，并执行fn函数
// test.each(($div) => { console.log($div) })
// 5.查找父节点
const parent = $("#test3").parent().addClass("parent");
// 6.查找子节点
const child = $("#test3").children().addClass("child");
// 7.查找兄弟节点
const bro = $("#test4").siblings().addClass("bro");
// 8.获取上一个节点
const pre = $("#test5").prev().addClass("pre");
// 9.获取下一个节点
const next = $("#test5").next().addClass("next");

//# sourceMappingURL=index.de158e3a.js.map
