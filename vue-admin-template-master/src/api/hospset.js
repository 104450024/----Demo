import request from "@/utils/request";

export default {
  //醫院設置列表
  getHospSetList(current, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: "post",
      data: searchObj //使用json傳遞
    });
  },
  //刪除醫院設置
  deleteHospSet(id) {
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: "delete"
    });
  },
  //批量刪除
  batchRemoveHospSet(idList) {
    return request({
      url: `/admin/hosp/hospitalSet/batchRemove`,
      method: "delete",
      data: idList //jsonbatchRemove
    });
  },
  //鎖定和取消鎖定
  lockHospSet(id, status) {
    return request({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: "put"
    });
  },
  //添加醫院設置
  saveHospSet(hospitalSet) {
    return request({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: "post",
      data: hospitalSet
    });
  },

  //醫院設置id查詢
  getHospSet(id) {
    return request({
      url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
      method: "get"
    });
  },

  //修改設置

  updateHospSet(hospitalSet) {
    return request({
      url: `/admin/hosp/hospitalSet/updateHospitalSet`,
      method: "post",
      data: hospitalSet
    });
  }
};
