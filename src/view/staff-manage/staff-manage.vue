<template>
  <div>
    <Select v-model="roleKey" style="width:150px" @on-change="changeStatus">
      <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Button type="primary" style="margin: 0 10px;">搜索</Button>
    <Button type="primary">新增</Button>
    <Table :loading="loading" max-height="400" border :columns="columns" :data="userList" style="margin-top: 15px;"></Table>
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
        userList: [],
        statusList: [
          {
            value: '',
            label: '请选择'
          },
          {
            value: 'ADMIN',
            label: '管理员'
          },
          {
            value: 'OPERATE',
            label: '运营'
          }
        ],
        columns: [
          {
            title: '用户账户',
            key: 'account',
          },
          {
            title: '用户昵称',
            key: 'nickname',
          },
          {
            title: '类型',
            key: 'roleKey',
            width: '80',
            render: (h, params) => {
              return h('div', [
                h('span', this.getStatusText(params.row.roleKey))
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
        roleKey: '',
        account: ''
      }
    },
    computed: {
      current(){
        return Math.floor(this.skip / this.limit) + 1
      }
    },
    methods: {
      ...mapActions([
        'getUserList'
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
          case 'ADMIN':
            text = '管理员'
            break
          case 'OPERATE':
            text = '运营'
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
          roleKey: this.roleKey
        }
        this.getUserList(params).then(res => {
          this.userList = res.data.list
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
