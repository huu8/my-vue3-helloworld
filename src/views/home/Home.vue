<template>
    <div class="home">
        <el-table stripe :data="tableData">
            <el-table-column prop="name" label="Name" width="200px" />
            <el-table-column prop="age" label="Age" width="200px" />
            <el-table-column prop="address" label="Address" width="1200px" />
        </el-table>
    </div>
</template>
    
<script setup lang='ts'>
import axios from 'axios';
import { onMounted, ref } from 'vue';
let tableData = ref([])
const getTableData = async () => {
    const res = await axios.get('/api/tableData')
    console.log('mockRes', res);
    tableData.value = res.data.data.tableData
}

onMounted(() => {
    getTableData();
})

</script>
    
<style>
</style>