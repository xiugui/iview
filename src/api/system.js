import axios from '@/libs/api.request'

export const getVersionList = ({ skip, limit, status }) => {
  const data = {
    skip,
    limit,
    status
  }
  return axios.request({
    url: 'dashboard/config/versionlist',
    data,
    method: 'post'
  })
}
export const getFileList = ({ versionId }) => {
  const data = {
    versionId
  }
  return axios.request({
    url: 'dashboard/config/filelist',
    data,
    method: 'post'
  })
}
export const getFileVersion = () => {
  const data = {}
  return axios.request({
    url: 'dashboard/common/versions',
    data,
    method: 'post'
  })
}
export const uploadFileVersion = ({ filePath, versionId }) => {
  const data = { filePath, versionId }
  return axios.request({
    url: 'dashboard/common/versions',
    data,
    method: 'post'
  })
}
export const getUserList = ({ skip, limit, roleKey }) => {
  const data = {
    skip,
    limit,
    roleKey
  }
  return axios.request({
    url: 'dashboard/csuser/list',
    data,
    method: 'post'
  })
}
