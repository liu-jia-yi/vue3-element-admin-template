<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
})

const onlyOneChild = ref()

// 判断是否只有一个子路由或者没有子路由
const hasOneShowingChild = (children = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '' }
    return true
  }

  return false
}

const resolvePath = (routePath: string) => {
  if (props.basePath.endsWith('/')) {
    return props.basePath + routePath
  } else if (routePath) {
    return `${props.basePath}/${routePath}`
  } else {
    return props.basePath
  }
}
</script>

<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && !item.alwaysShow">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">{{
          onlyOneChild.meta.title
      }}</el-menu-item>
    </template>

    <el-sub-menu v-else :index="item.path">
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
      <LayoutSidebarItem v-for="child in item.children" :key="child.path" :item="child"
        :base-path="resolvePath(child.path)" />
    </el-sub-menu>
  </div>
</template>
