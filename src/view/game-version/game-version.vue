<template>
  <div>
    <Select v-model="status" style="width:150px" @on-change="changeStatus">
      <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Button type="primary" style="margin: 0 10px;">搜索</Button>
    <Button type="primary">发版</Button>
    <Table :loading="loading" max-height="400" border :columns="columns" :data="gameVersionList" style="margin-top: 15px;"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" :page-size="limit" :show-sizer="true" :show-elevator="true" @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        loading: true,
        total: 0,
        gameVersionList: [],
        statusList: [
          {
            value: -1,
            label: '不限'
          },
          {
            value: 0,
            label: 'NEW'
          },
          {
            value: 1,
            label: '已生效'
          },
          {
            value: 2,
            label: '已删除'
          }
        ],
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 50,
            fixed: 'left'
          },
          {
            title: '更新文件内容',
            key: 'diffFileList',
            width: '150'
          },
          {
            title: '更新描述',
            key: 'desc',
            width: 200
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
            title: '状态',
            key: 'status',
            width: '80',
            render: (h, params) => {
              return h('div', [
                h('span', this.getStatusText(params.row.status))
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
        skip: 0,
        limit: 10,
        status: -1
      }
    },
    computed: {
      current(){
        return Math.floor(this.skip / this.limit) + 1
      }
    },
    methods: {
      ...mapActions([
        'getGameVersionList'
      ]),
      changeStatus(){
        this.getList()
      },
      changePage(page){
        this.skip = (page-1)*this.limit
        this.getList()
      },
      changePageSize(size){
        this.limit = size
        this.getList()
      },
      getStatusText(status){
        let text = ''
        switch (status) {
          case -1:
            text = '不限'
            break
          case 0:
            text = 'NEW'
            break
          case 1:
            text = '已生效'
            break
          case 2:
            text = '已删除'
            break
          default:
            break
        }
        return text
      },
      getList() {
        this.loading = true
        let params = {
          skip: this.skip,
          limit: this.limit,
          status: this.status
        }
        this.getGameVersionList(params).then(res => {
          this.gameVersionList = res.data.list
          this.total = res.data.total
          this.loading = false
        }, err => {
          this.$Message.error(err.data.errorMsg)
          this.loading = false
        })
      }
    },
    mounted(){
      this.getList()
    }
  }
</script>
