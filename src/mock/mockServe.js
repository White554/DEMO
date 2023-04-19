// 引入mockjs模块
import Mock from 'mockjs';
// 引入json格式数据   webpack中默认对外暴露 图片/json文件  无需再进行暴露操作
import banner from './banner.json';
import floor from './floor.json';
import address from './address';

// 使用 
// mock函数 第一个参数：请求的地址， 第二个参数：请求的数据
Mock.mock('/mock/banner', {code: 200, data: banner})  // 模拟轮播图数据
Mock.mock('/mock/floor', {code: 200, data: floor})   // 模拟楼层数据
Mock.mock('/mock/address', {code: 200, data: address}) // 模拟地址数据