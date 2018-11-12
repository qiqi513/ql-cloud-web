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
        @row-click="userRowClick"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
        <template slot-scope="scope" slot="orgNameForm">
          <el-input v-model="obj.orgName" placeholder="选择组织" @focus="handleOrg()" readonly></el-input>
        </template>
      </avue-crud>


      <avue-crud
        :data="link.data"
        @row-update="update"
        @row-save="save"
        @row-del="remove"
        :option="link.option"
        v-model="link.obj"
        :page="link.page"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
        <template slot="menuLeft">
          <el-button type="primary" icon="el-icon-plus" @click.stop="addLink" size="small">新 增</el-button>
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
      </el-dialog>
      <el-dialog title="角色选择"  :visible.sync="role.show"
                 width="800px"  :close-on-click-modal = 'false' @close="roleClose">
        <avue-crud
          :data="role.data"
          :option="role.option"
          v-model="role.obj"
          :page="role.page"
          @selection-change="selectionChange"
          @size-change="sizeChange"
          @current-change="currentChange"
        >
          <template slot="menuLeft">
            <el-button type="primary"  @click.stop="saveUserRole" size="small">确 认</el-button>
            <el-button type="primary"  @click.stop="role.show = flase" size="small">关 闭</el-button>
          </template>
        </avue-crud>
      </el-dialog>
    </el-row>
</template>


<script>
  import {listPage,save,update,remove,all} from "@/api/upms/user/user";
  import {listPage as listRole} from "@/api/upms/role/role";
  import {listPage as listLinkRole} from "@/api/upms/userRole/userRole";
  import {tree} from "@/api/upms/org/org";

  export default {
      data() {
        return {
          role:{
            roleIds:[],
            show:false,
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
              page:true,
              selection:true,
              addBtn:false,
              menu:false,
              refreshBtn:false,
              menuBtn:false,
              height:400,
              columnBtn:false,
              align:'center',
              column:[
                {
                  label:'角色',
                  prop:'roleName',
                  search:true
                },
                {
                  label:'组织',
                  prop:'orgName'
                },
                {
                  label:'描述',
                  prop:'description',
                },
              ]
            },
          },
          link:{
            userId :null,
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
              page:true,
              addBtn:false,
              height:(document.body.clientHeight - 300)*0.6,
              columnBtn:false,
              align:'center',
              menuAlign:'center',
              column:[
                {
                  label:'角色',
                  prop:'username',
                },
                {
                  label:'组织',
                  prop:'orgName'
                },
                {
                  label:'描述',
                  prop:'description',
                },
              ]
            },
          },
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
            page:true,

            height:(document.body.clientHeight - 300)*0.4,
            columnBtn:false,
            align:'center',
            menuAlign:'center',
            column:[

              {
                label:'用户名',
                prop:'username',
                editDisabled:false, //表单编辑时是否禁止
                rules: [
                  {required: true, message: '此项为必填项!', trigger: 'blur'},
                  {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                ]
              },
              {
                label:'密码',
                prop:'password',
                type:'password',
                hide:true,
                rules: [
                  {required: true, message: '此项为必填项!', trigger: 'blur'},
                  {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                ]
              },
              {
                label: '昵称',
                prop: 'nickname',
                rules: [
                  {required: true, message: '此项为必填项!', trigger: 'blur'},
                  {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                ]
              },
              {
                label:'状态',
                prop:'state',
                type:'select',
                valueDefault:'0',
                dicData:[
                  {
                    label:'暂用',
                    value:'1'
                  },{
                    label:'启用',
                    value:'0'
                  }
                ],
                rules: [
                  {required: true, message: '此项为必填项!', trigger: 'blur'},
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
                rules: [
                  {required: true, message: '此项为必填项!', trigger: 'change'},
                ],
                span:24,
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
        //用户列表行点击
        userRowClick (row, event, column) {
          this.link.userId = row.userId;
          this.listLinkRole();
        },
        // 查询用户角色
        listLinkRole(){
          let params = {
            page:this.link.page.currentPage,
            limit:this.link.page.pageSize,
            userId: this.link.userId
          };
          listLinkRole(params).then(response => {
            this.link.data = response.data;
            this.link.page.total = response.total
          });
        },
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
          remove(row.userId).then(response => {
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
        addLink(){
          if(this.link.userId ){
            this.role.show = true;
            let params = {
              page:this.role.page.currentPage,
              limit:this.role.page.pageSize
            };
            listRole(params).then(response => {
              this.role.data = response.data;
              this.role.page.total = response.total;
            })
          }else{
            this.$message.info("请先选择人员!");
          }

        },
        selectionChange(list){
          let roleIds = [];
          list.forEach(function (item) {
            roleIds.push(item.roleId)
          });
          this.role.roleIds = roleIds;
        },
        saveUserRole(){
          if(this.role.roleIds.length != 0){

          }else{
            this.$message.error("请先选择角色!");
          }
        },
        roleClose(){
          this.role.roleIds = [];
        }
      }
    }
</script>

<style scoped>

</style>
