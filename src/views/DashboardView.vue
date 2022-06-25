<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const chartBarRef = ref()
const chartLineRef = ref()
const chartPieRef = ref()

function initChartBar() {
  const chartBar = echarts.init(chartBarRef.value)
  chartBar.setOption({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
      }
    ]
  })
}

function initChartLine() {
  const chartLine = echarts.init(chartLineRef.value)
  chartLine.setOption({
    xAxis: {
      data: ['A', 'B', 'C']
    },
    yAxis: {},
    series: [
      {
        data: [120, 200, 150],
        type: 'line'
      }
    ]
  })
}

function initChartPie() {
  const chartPie = echarts.init(chartPieRef.value)
  chartPie.setOption({
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: '直接访问'
          },
          {
            value: 234,
            name: '联盟广告'
          },
          {
            value: 1548,
            name: '搜索引擎'
          }
        ]
      }
    ]
  })
}

onMounted(() => {
  initChartBar()
  initChartLine()
  initChartPie()
})
</script>

<template>
  <div class="dashboard-view">
    <el-card header="柱状图">
      <div ref="chartBarRef" class="chart"></div>
    </el-card>
    <el-card header="折线图">
      <div ref="chartLineRef" class="chart"></div>
    </el-card>
    <el-card header="饼图">
      <div ref="chartPieRef" class="chart"></div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-view {
  display: flex;

  .el-card {
    flex: 1;

    .chart {
      height: 400px;
    }

    &:not(:first-of-type) {
      margin-left: 24px;
    }
  }
}
</style>