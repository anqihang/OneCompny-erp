import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
//获取管理员列表
export function getUserList(params){
  return request({
    url:'/admin/system/admin_list',
    method:'get',
    params:{
      page_size:params
    }
  })
}
//----------------------------------------------------------------------------------
//获取客户列表
export function getClientList({size,current,data,flag,order}){
  return request({
    url:'/admin/customer/customer_list',
    method:'get',
    params:{
      page_size:size,
      page:current,
      company_name:data[0],
      area_name:data[2],
      bank_name:data[1],
      emp_info:data[3],
      flag:flag,
      order_type:order,
    }
  })
}
//添加客户
export function addClient(data){
  return request({
    url:'/admin/customer/customer_add',
    method:'post',
    data:{
      company_name:data.companyName.trim(),
      address:data.companyAdress.trim(),
      bank_account:data.bankAccount.trim(),
      tax_number:data.taxCode.trim(),
      bank_name:data.openBankAccount.trim(),
      company_nickname:data.nickName.trim(),
      name:data.personName.trim(),
      mobile:data.personPhone.trim(),
      email:data.personEmail.trim(),
    }
  })
};
//编辑客户
export function editClient(data,id){
  return request({
    url:'/admin/customer/customer_edit',
    method:'post',
    data:{
      id:id,
      company_name:data.companyName.trim(),
      address:data.companyAdress.trim(),
      bank_account:data.bankAccount.trim(),
      tax_number:data.taxCode.trim(),
      bank_name:data.openBankAccount.trim(),
      company_nickname:data.nickName.trim(),
    }
  })
}
//删除客户
export function deleteClient(data){
  return request({
    url:'/admin/customer/customer_delete',
    method:'get',
    params:{
      id:data
    }
  })
}
//负责人列表
export function getPersonList(params){
  return request({
    url:'/admin/customer/employee_list',
    method:'get',
    params:{
      id:params
    }
  })
}
//添加负责人
export function addPerson(data,id){
  console.log(2,data,id);
  return request({
    url:'/admin/customer/employee_add',
    method:'post',
    data:{
      customer_id:id,
      name:data.name,
      mobile:data.phone,
      email:data.email
    }
  })
}
//编辑负责人
export function editPerson(data,id,personId){
  console.log(data,id,personId);
  return request({
    url:'/admin/customer/employee_edit',
    method:'post',
    data:{
      customer_id:id,
      id:personId,
      name:data.name,
      mobile:data.phone,
      email:data.email
    }
  })
}
//删除负责人
export function deletePerson(id){
  return request({
    url:'/admin/customer/employee_delete',
    method:'get',
    params:{
      id:id
    }
  })
}
//-------------------------------------------------------------------------
//获取产品信息列表
export function getProductionList(size,current,params){
  return request({
    url:'/admin/Product/product_list',
    method:'get',
    params:{
      customer_name:params.companyName,
      customer_code:params.companyMNumber,
      product_code:params.productionMNumber,
      product_name:params.productionName,
      product_specs:params.specification,
      desc:params.description,
      remarks:params.remarks,
      page_size:size,
      page:current
    }
  })
}
//获取客户名称
export function getCompanyList(params){
  return request({
    url:'/admin/customer/getCustomerName',
    method:'get',
    params:{
      name:params
    }
  })
}
//添加产品
export function addProduction(searchInfo,selectId){
  return request({
    url:"/admin/product/product_add",
    method:'post',
    data:{
      customer_id:selectId||'',
      customer_code:searchInfo[1]||'',
      product_code:searchInfo[2]||"",
      name:searchInfo[3]||'',
      product_specs:searchInfo[4]||'',
      desc:searchInfo[5]||'',
      remarks:searchInfo[6]||''
    }
  })
}
//添加bom
export function addBOM(data){
  return request({
    url:'/admin/product/import_boms',
    method:'post',
    headers:{
      'content-Type':'multipart/form-data'
    },
    data:data
  })
}
//获取bom列表
export function getBOMList(data){
  return request({
    url:"/admin/product/product_detail",
    method:'get',
    params:{
      id:data
    }
  })
}
//下载
export function downLoad(id){
  return request({
    url:'/admin/Product/export_bom',
    method:'get',
    // headers:{
    //   'content-Type':'multipart/form-data'
    // },
    params:{id:id}
  })
}
//编辑产品
export function editProduction(data,id){
  console.log(data);
  return  request({
    url:'/admin/product/product_edit',
    method:'post',
    data:{
      id:id,
      customer_id:data.info0,
      customer_code:data.info[1],
      product_code:data.info[2],
      name:data.info[3],
      product_specs:data.info[4],
      desc:data.info[5],
      remarks:data.info[6],
    }
  })
}
//删除产品
export function deleteProduction(id){
  return request({
    url:'/admin/Product/product_delete',
    methos:'get',
    params:{
      id:id
    }
  })
}
//
//-----------------------------------------------------------------
//获取产品列表信息
export function getProductList(params){
  return request({
    url:"/admin/product/getCustomerProduct",
    method:'get',
    params:{
      customer_id:params
    }
  })
}
//添加订单
export function addOrder(){
  return request({
    url:"",
    method:'post',
    data:''
  })
}
//删除库存
export function deleteOrder(params){
  return request({
    url:'/admin/product/getCustomerProduct',
    method:'get',
    params:{
      customer_id:params
    }
  })
}

