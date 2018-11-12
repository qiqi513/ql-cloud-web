<template>
  <el-row>
    <avue-crud
      :data="data"
      @row-update="update"
      @row-save="save"
      @row-del="remove"
      :option="option"
      v-model="obj"
      :page="page"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
      <template slot-scope="scope" slot="orgNameForm">
        <el-input  v-model="obj.orgName" placeholder="通用角色" @focus="handleOrg()" readonly></el-input>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="small"
                   plain
                   @click.stop="handleEdit(scope.row,scope.index)">权限</el-button>
      </template>
    </avue-crud>


    <el-dialog title="组织选择" :visible.sync="dialogDeptVisible">
      <el-tree class="filter-tree"
               :data="orgTree"
               :default-checked-keys="checkedKeys"
               node-key="id"
               highlight-current
               ref="orgTree"
               @node-click="getNodeData"
               :props="props"
               default-expand-all>
      </el-tree>
      <el-row  slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="clearOrg">清空</el-button>
      </el-row>
    </el-dialog>
  </el-row>
</template>


<script>
  import {listPage,save,update,remove,all} from "@/api/upms/role/role";
  import {tree} from "@/api/upms/org/org";

  export default {
    data() {
      return {
        page: {
          pageSizes: [10, 20, 30, 40],
          total: 0,
          currentPage: 1,
          pageSize: 10,
        },
        obj:{
        },
        data: [
        ],
        option:{
          menuWidth:380,
          page:true,
          height:document.body.clientHeight - 220,
          columnBtn:false,
          align:'center',
          menuAlign:'center',
          column:[

            {
              label:'角色名称',
              prop:'roleName',
              editDisabled:false, //表单编辑时是否禁止
              rules: [
                {required: true, message: '此项为必填项!', trigger: 'blur'},
                {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
              ]
            },

            {
              label:'组织Id',
              prop:'orgId',
              hide:true,
              visdiplay:false
            },
            {
              label:'组织',
              prop:'orgName',
              formsolt:true
            },
            // {
            //   label:'权限',
            //   prop:'grade',
            //   type:'select',
            //   props: {
            //     label: 'name',
            //     value: 'code'
            //   },
            //   dicUrl:'https://avue.top/api/area/{{key}}',
            //   dicData:'getProvince'
            // },
            {
              label:'描述',
              prop:'description',
              type:'textarea',
              span:24

            },
          ]
        },
        orgTree:[],
        dialogDeptVisible:false,
        checkedKeys:[],
        props:{
          id:"id",
          children: 'children',
          label: 'label'
        }
      }
    },
    created(){
      this.getAll();
      this.getOrgTree();
    },
    methods:{
      getAll(){
        let params = {
          page:this.page.currentPage,
          limit:this.page.pageSize
        };

        listPage(params).then(response => {
          this.data = response.data;
          this.page.total = response.total
        })
      },
      sizeChange(val){
        this.page.pageSize = val;
        this.getAll();
      },
      currentChange(val){
        this.page.currentPage = val;
        this.getAll();
      },
      getOrgTree(){
        tree().then(response => {
          this.orgTree = response.data;
        });
      },
      update(row, index, done){
        update(row).then(response => {
          this.getAll();
          done();
        });
      },
      save(row, done){
        save(row).then(response => {
          this.getAll();
          done();
        })
      },
      remove(row, index){
        remove(row.roleId).then(response => {
          this.getAll();
          done();
        })
      },
      handleOrg(){
        this.dialogDeptVisible = true;
      },
      getNodeData(data){
        this.dialogDeptVisible = false;
        this.obj.orgId = data.id;
        this.obj.orgName = data.label
      },
      clearOrg(){
        this.dialogDeptVisible = false;
        this.obj.orgId = '';
        this.obj.orgName = '通用角色'
      },
      handleEdit(row){
        alert(row.roleId)
      }
    }
  }
</script>

<style scoped>

</style>
