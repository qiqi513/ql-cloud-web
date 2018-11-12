<template>
  <el-row style="background-color: white">
    <el-col :span="12"  v-bind:style="{ 'height': (mainHeight) + 'px'}" style="overflow: auto">
        <el-tree highlight-current
                 default-expand-all
                 ref="tree"
                 class="expand-tree"
                 :data="tree.data"
                 node-key="id"
                 :props="tree.props"
                 @node-click="handleNodeClick"
                 :expand-on-click-node="false"
                 :render-content="nodeContent"
        >
        </el-tree>
    </el-col>
    <el-col :span="12">
      <avue-form ref="form" v-model="form.data" :option="form.option" @submit="submit">
        <template slot-scope="scope" slot="menuForm">
          <el-button type="danger"
                     icon="el-icon-plus"
                     size="big"
                     plain
                     @click.stop="handleAdd()">新增</el-button>
        </template>


      </avue-form>
    </el-col>
  </el-row>
</template>


<script>
  import {listTree,saveOrUpdate,remove} from "@/api/upms/menu/menu";
  import TreeRender from '@/components/tree_render/tree_render.vue'

  export default {
    data() {
      return {
        mainHeight:document.body.clientHeight - 75,

        tree:{
          data: [],
          props:{
            id:"id",
            children: 'children',
            label: 'label'
          }
        },
        form:{
          data:{},
          option:{
            emptyBtn:false,
            submitBtn:false,
            column:[
              {
                label: "上级ID",prop: "parentId",span:24,disabled:true
              },
              {
                label: "上级栏目",prop: "parentName",span:24,disabled:true
              },
              {
                label: "栏目ID",prop: "menuId",span:24,disabled:true
              },
              {
                label: "栏目名称",prop: "menuName",span:24,
                rules: [
                  { required: true,message: "请输入栏目名称",trigger: "blur" }
                ],
              },
              {
                label:'栏目类型',prop:'menuType',type:'select',span:24,
                dicData:[
                  {
                    label:'目录栏目',
                    value:'0'
                  },
                  {
                    label:'功能栏目',
                    value:'1'
                  }
                ],
                rules: [
                  {required: true, message: '此项为必填项!', trigger: 'change'},
                ]
              },
              {
                label: "栏目标识",prop: "menuKey",span:24,
                rules: [
                  { required: true,message: "请输入栏目标识",trigger: "blur" }
                ],
              },
              {
                label: "跳转路径",prop: "menuPath",span:24,
                rules: [
                  { required: true,message: "请输入跳转路径",trigger: "blur" }
                ],
              },
              {
                label: "前端组件",prop: "component",span:24,
                rules: [
                  { required: true,message: "请输入前端组件",trigger: "blur" }
                ],
              },
              {
                label: "栏目图标",prop: "menuIcon",span:24
              },

              {
                label: "排序",prop: "orderId",span:24
              },
              {
                label: "描述",prop: "description",type:'textarea',span:24
              }
            ]
          }
        }

      }
    },
    created(){
      this.getTree();
    },
    methods:{
      getTree(){
        listTree().then(response => {
          this.tree.data = response.data;
        })
      },
      handleNodeClick(row){
        this.$refs.form.clearValidate();
        this.form.option.submitBtn = false;
        this.form.data.menuId = row.id;
        this.form.data.parentId = row.parentId;
        this.form.data.parentName = row.parentName;
        this.form.data.menuName = row.label;
        this.form.data.menuType = row.menuType;
        this.form.data.menuKey = row.menuKey;
        this.form.data.menuPath = row.menuPath;
        this.form.data.component = row.component;
        this.form.data.menuIcon = row.menuIcon;
        this.form.data.description = row.description;
        this.form.data.orderId = row.orderId;
      },
      submit(){
        saveOrUpdate(this.form.data).then(esponse => {
          this.getTree();
          this.resetForm();
        })
      },

      nodeContent(h,{node,data,store}){//加载节点
        let that = this;
        return h(TreeRender,{
          props: {
            DATA: data,
            NODE: node,
            STORE: store
          },
          on: {
            nodeAdd: ((s,d,n) => that.nodeAdd(s,d,n)),
            nodeEdit: ((s,d,n) => that.nodeEdit(s,d,n)),
            nodeDel: ((s,d,n) => that.nodeDelete(s,d,n))
          }
        });
      },
      nodeAdd(s,d,n){
        this.resetForm(d)
        this.form.data.parentId = d.id;
        this.form.data.parentName = d.label;
        this.form.option.submitBtn = true;
      },
      nodeEdit(s,d,n){
        this.resetForm(d)
        this.handleNodeClick(d);
        this.form.option.submitBtn = true;

      },
      nodeDelete(s,d,n){
          remove(d.id).then(response => {
            this.getTree();
          })
      },
      resetForm(data){
        this.form.option.submitBtn = false;
        if(data){
          this.$refs.tree.setCurrentKey(data.id);
        }
        this.form.data = {};
        this.$refs.form.clearValidate();
        this.$refs.form.resetForm();

      },
      handleAdd(){
        this.resetForm();
        this.form.option.submitBtn = true;
        this.form.data.parentId = -1;
      }
    }
  }
</script>

<style >
  .expand-tree{
    /*overflow: auto*/
  }
  .expand-tree{
    border:none;
    margin-top:10px;
  }
  .expand-tree .el-tree-node.is-current,
  .expand-tree .el-tree-node:hover{
    overflow:hidden;
  }
  .expand-tree .is-current>.el-tree-node__content .tree-btn,
  .expand-tree .el-tree-node__content:hover .tree-btn{
    display:inline-block;
  }
  .expand-tree .is-current>.el-tree-node__content .tree-label{
    font-weight:600;
    white-space:normal;
  }
  .el-tree-node__content{
    height: 40px;
  }

</style>
