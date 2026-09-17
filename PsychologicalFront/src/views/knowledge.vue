<template>
    <div>
        <PageHead title="知识文章">
            <template #buttons>
                <el-button type="primary">新增</el-button>
            </template>
        </PageHead>
        <TableSearch :formItem="formItem" @search="handleSearch">

        </TableSearch>
    </div>
</template>

<script setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue';
const formItem =[
    {
        comp: 'input',
        prop: 'title',
        label: '文章标题',
        placeholder: '请输入文章标题',
        defaultValue: '灌灌灌灌'
    },
    {
        comp: 'select',
        prop: 'categoryId',
        label: '分类',
        placeholder: '请选择分类',
        options:[
            { label: '心理健康基础', value: '1' }
        ]
    },
    {
        comp: 'date-picker',
        prop: 'createTime',
        label: '创建时间',
        placeholder: '请选择创建时间',
        type: 'daterange'
    },
    {
        comp: 'select',
        prop: 'status',
        label: '状态',
        placeholder: '请选择状态',
        options: [
            { label: '启用', value: '1' },
            { label: '禁用', value: '0' },
        ]
    }
]
const handleSearch = (formData) => {
    console.log(formData, '查询参数')
}
</script>
