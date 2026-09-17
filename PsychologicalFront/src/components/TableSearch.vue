<template>
    <el-form :model="formData" ref="ruleFormRef" :rules="rule">
        <el-row :gutter="24">
            <el-col
                v-for="item in formItemAttrs"
                :key="item.prop"
                v-bind="item.col"
            >
                <el-form-item :label="item.label" :prop="item.prop">
                    <component
                        :is="isComp(item.comp)"
                        v-model="formData[item.prop]"
                        :placeholder="item.placeholder"
                        :style="{ width: item.width || '100%' }"
                        clearable
                    >
                        <!-- 只有select下拉框才渲染el-option -->
                        <template v-if="item.comp === 'select'">
                            <el-option label="全部" value="all" />
                            <el-option
                                v-for="option in item.options"
                                :key="option.value"
                                :label="option.label"
                                :value="option.value"
                            />
                        </template>
                    </component>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <!-- 不需要传参 -->
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-row>
    </el-form>
</template>
<script setup>
import { reactive, watch, computed, ref } from 'vue'
const props = defineProps({
    formItem: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['search'])
// 表单数据
const formData = reactive({})
// 栅格属性处理
const formItemAttrs = computed(() => {
    return props.formItem.map((item) => ({
        ...item,
        col: item.col || { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }
    }))
})
// 根据配置初始化表单字段
watch(
    () => props.formItem,
    (list) => {
        list.forEach((item) => {
            if (!(item.prop in formData)) {
                if (item.comp === 'select') {
                    formData[item.prop] = 'all'
                } else if (item.comp === 'switch') {
                    // switch 默认布尔false
                    formData[item.prop] = false
                } else if (item.comp === 'date-picker') {
                    // input date-picker
                    formData[item.prop] = ''
                } else if (item.prop === 'title') {
                    formData[item.prop] = '默认表单'
                }
            }
        })
    },
    { immediate: true, deep: true }
)
// 动态组件映射
const isComp = (comp) => {
    return {
        input: 'ElInput',
        select: 'ElSelect',
        'date-picker': 'ElDatePicker',
        switch: 'ElSelect'
    }[comp]
}
const ruleFormRef = ref()
// 【删除无用变量】
// const ruleForm = reactive({
//     title: '',
//     categoryId: ''
// })
// 校验规则（后续可以改成动态生成rule）
const rule = reactive({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' }
    ],
    categoryId: [
        { required: true, message: '请选择分类', trigger: 'blur' }
    ]
})
const handleSearch = () => {
    emit('search', { ...formData })
}
// 重置函数
const handleReset = () => {
    if (!ruleFormRef.value) return
    props.formItem.forEach((item) => {
        // 和watch里完全一样的判断逻辑，设置表单默认值
        if (item.prop === 'title') {
            formData[item.prop] = 'hhhhh'
        } else if (item.comp === 'select') {
            formData[item.prop] = 'all'
        } else if (item.comp === 'switch') {
            formData[item.prop] = false
        } else if (item.comp === 'date-picker') {
            formData[item.prop] = ''
        } else {
            formData[item.prop] = ''
        }
    })
    ruleFormRef.value.clearValidate()
    // 重置后自动触发搜索
    emit('search', { ...formData })
}

</script>
