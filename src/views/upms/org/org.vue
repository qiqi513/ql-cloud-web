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
  import {tree,saveOrUpdate,remove} from "@/api/upms/org/org";
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
                  label: "上级组织",prop: "parentName",span:24,disabled:true
              },
              {
                label: "组织ID",prop: "orgId",span:24,disabled:true
              },
              {
                label: "组织名称",prop: "orgName",span:24,
                rules: [
                  { required: true,message: "请输入组织名称",trigger: "blur" }
                ],
              },
              {
                label: "描述",prop: "description",type:'textarea',span:24
              },
              {
                label: "排序",prop: "orderId",span:24
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
        tree().then(response => {
          this.tree.data = response.data;
        })
      },
      handleNodeClick(row){
        this.form.option.submitBtn = false;
        this.form.data.orgId = row.id;
        this.form.data.parentId = row.parentId;
        this.form.data.parentName = row.parentName;
        this.form.data.orgName = row.label;
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
