// api管理模块

// 1 导入封装好的axios
import requests from './requests'


export const  reqCategoryList = () => requests({url:'/api/product/getBaseCategoryList', method:'get'})