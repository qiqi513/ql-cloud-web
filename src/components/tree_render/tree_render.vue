<template>
	<div class="tree-expand">
		<div
		class="tree-label">
			<span>{{NODE.label}}</span>
		</div>
		<el-button-group class="tree-btn" >
		<el-button class="el-button el-button--success is-plain" size="mini" @click.stop="nodeAdd(STORE,DATA,NODE)" title="添加"><i class="el-icon-plus"></i></el-button>
		<el-button class="el-button el-button--warning is-plain" size="mini" @click.stop="nodeEdit(STORE,DATA,NODE)" title="编辑"><i class="el-icon-edit"></i></el-button>
		<el-button class="el-button el-button--danger is-plain" size="mini" @click.stop="nodeDel(STORE,DATA,NODE)" title="删除"><i class="el-icon-delete"></i></el-button>
		</el-button-group>
	</div>
</template>

<script>
	export default{
		name: 'treeExpand',
		props: ['NODE', 'DATA', 'STORE', 'maxexpandId'],
		methods: {
			nodeAdd(s,d,n){//新增
				this.$emit('nodeAdd',s,d,n)
			},
			nodeEdit(s,d,n){//编辑
				d.isEdit = true;
				this.$nextTick(() => {
					this.$refs['treeInput'+d.id].$refs.input.focus()
				})
				this.$emit('nodeEdit',s,d,n)
			},
			nodeDel(s,d,n){//删除
				this.$emit('nodeDel',s,d,n)
			},
			nodeEditPass(s,d,n){//编辑完成
				d.isEdit = false;
        this.$emit('nodeEditPass',s,d,n)
			},
			nodeEditFocus(){
				//阻止点击节点的事件冒泡
			},
		}
	}
</script>

<style>
	.tree-expand{
		overflow:hidden;
		width: 90%;
		border-bottom:1px solid #f5f5f5;
		position: relative
	}
	.tree-expand .tree-label.tree-new{
		font-weight:600;
	}
	.tree-expand .tree-label{
		font-size:0.9em;
		float: left;
		line-height: 40px
	}
	.tree-expand .tree-label .edit{
		width:80%;
	}
	.tree-expand .tree-btn{
		display:none;
		position: absolute;
		top:5px;
		right: 5px;
	}
	.tree-expand .tree-btn i{
		font-size:0.9em;
		margin-right:3px;
	}
	.el-button--mini, .el-button--mini.is-round{
		padding: 7px
	}
</style>
