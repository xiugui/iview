<template>
  <div>
    <Select v-model="versionId" style="width:150px" @on-change="changeStatus">
      <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.version }}</Option>
    </Select>
    <Button type="primary" style="margin: 0 10px;">搜索</Button>
    <Button type="primary" @click="modal2 = true">上传文件</Button>
    <Table :loading="loading" max-height="400" border :columns="columns" :data="fileList" style="margin-top: 15px;"></Table>
    <Modal v-model="modal2" >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>Delete confirmation</span>
      </p>
      <div style="text-align:center">
        <Upload
          ref="upload"
          :before-upload="handleUpload"
          type="drag"
          :action="uploadUrl">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
          </div>
        </Upload>
        <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import moment from 'moment'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        modal2: false,
        modal_loading: true,
        file: null,
        loadingStatus: false,
        uploadUrl: (process.env.NODE_ENV === 'development' ? this.$config.baseUrl.dev : this.$config.baseUrl.pro) + 'dashboard/common/upload',
        loading: true,
        versionId: -1,
        total: 0,
        fileList: [],
        statusList: [],
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 50,
            fixed: 'left'
          },
          {
            title: '文件名称',
            key: 'diffFileList',
            width: '150'
          },
          {
            title: '文件列数',
            key: 'cols',
            width: 200
          },
          {
            title: '文件行数',
            key: 'rows',
            width: 100
          },
          {
            title: '启用版本id',
            key: 'testId',
            width: 100
          },
          {
            title: '作者',
            key: 'author',
            width: 100
          },
          {
            title: '添加时间',
            key: 'createdTime',
            width: '150',
            render: (h, params) => {
              return h('div', [
                h('span', moment(params.row.createdTime).format(this.$config.dateFilter.ymdHms))
              ]);
            }
          },
          {
            title: '修改时间',
            key: 'updatedTime',
            width: '150',
            render: (h, params) => {
              return h('div', [
                h('span', moment(params.row.updatedTime).format(this.$config.dateFilter.ymdHms))
              ]);
            }
          },
          {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, 'View'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, 'Edit')
              ]);
            }
          }
        ],
      }
    },

    methods: {
      ...mapActions([
        'getFileList',
        'getFileVersion',
        'uploadFileVersion'
      ]),
      del(){},
      handleUpload (file) {
        this.file = file;
        return false;
      },
      upload () {
        this.loadingStatus = true;
        this.$refs.upload.post(this.file)
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
      },
      changeStatus(){
        this.getList()
      },
      getStatusText(status){
        let text = ''
        switch (status) {
          case -1:
            text = '不限'
            break
          case 0:
            text = '已生效'
            break
          default:
            break
        }
        return text
      },
      getList() {
        this.loading = true
        let params = {
          versionId: this.versionId
        }
        this.getFileList(params).then(res => {
          this.fileList = res.data.list
          this.loading = false
        }, err => {
          this.$Message.error(err.data.errorMsg)
          this.loading = false
        })
      },
      getVersion(){
        this.getFileVersion().then(res => {
          this.statusList =  res.data.versions
        }, err => {
          this.$Message.error(err.data.errorMsg)
        })
      }
    },
    mounted(){
      this.getList()
      this.getVersion()
    }
  }
</script>
