import { getVersionList, getFileList, getUserList, getFileVersion } from '../../api/system'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    getGameVersionList ({ state, commit }, { skip, limit, status }) {
      return new Promise((resolve, reject) => {
        getVersionList({ skip, limit, status }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getFileList ({ state, commit }, { versionId }) {
      return new Promise((resolve, reject) => {
        getFileList({ versionId }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getFileVersion ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getFileVersion().then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    uploadFileVersion ({ state, commit }, { filePath, versionId }) {
      return new Promise((resolve, reject) => {
        uploadFileVersion({ filePath, versionId }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserList ({ state, commit }, { skip, limit, roleKey }) {
      return new Promise((resolve, reject) => {
        getUserList({ skip, limit, roleKey }).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
