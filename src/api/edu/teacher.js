import request from '@/utils/request'

export default {
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/edu/teacher/page/condition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },

  getTeacherById(id) {
    return request({
        url: `/edu/teacher/${id}`,
        method: 'get'
    })
  },

  saveTeacher(teacherData) {
    return request({
        url: `/edu/teacher`,
        method: 'post',
        data: teacherData
    })
  },

  updateTeacher(teacherData) {
    return request({
        url: `/edu/teacher`,
        method: 'put',
        data: teacherData
    })
  },

  deleteTeacher(id) {
    return request({
        url: `/edu/teacher/${id}`,
        method: 'delete'
    })
  }
}
