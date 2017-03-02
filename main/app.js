// 载入electron模块
const electron = require("electron");
// 创建应用程序对象
const app = electron.app;
// 创建一个浏览器窗口，主要用来加载HTML页面
const BrowserWindow = electron.BrowserWindow;
// 使用ipc在进程之间通信
const {
    ipcMain
} = require('electron');

function createWindow() {
    // 创建一个浏览器窗口对象，并指定窗口的大小
    // 1024×768 合理的窗口大小
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        title: "Galaxy-snake"
    });

    // 通过浏览器窗口对象加载index.html文件，同时也是可以加载一个互联网地址的
    mainWindow.loadURL('file://' + __dirname + '/main/index/index.html');
    // 打开程序的同时打开开发者工具
    mainWindow.openDevTools();
    // 监听浏览器窗口对象是否关闭，关闭之后直接将mainWindow指向空引用，也就是回收对象内存空间
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}
app.on("ready", function () {
    //进程准备好的时候创建窗口
    createWindow();
});
app.on("window-all-closed", function () {
    // 判断当前操作系统是否是window系统，因为这个事件只作用在window系统中
    if (process.platform != "darwin") {
        // 退出整个应用程序
        app.quit();
    }
});
app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
///////////////////
/// ipc 通信进程 ///
//////////////////