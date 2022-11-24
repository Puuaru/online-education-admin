import request from '@/utils/request'

export default {
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/page/condition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },

  getTeacherById(id) {
    return request({
        url: `/eduservice/teacher/${id}`,
        method: 'get'
    })
  },

  saveTeacher(teacherData) {
    return request({
        url: `/eduservice/teacher`,
        method: 'post',
        data: teacherData
    })
  },

  updateTeacher(teacherData) {
    return request({
        url: `/eduservice/teacher`,
        method: 'put',
        data: teacherData
    })
  },

  deleteTeacher(id) {
    return request({
        url: `/eduservice/teacher/${id}`,
        method: 'delete'
    })
  }
}
