import { useUserStore } from '@/stores/user'

/**
 * 判断传入的角色列表中是否有该用户拥有的角色
 */
export default function checkPermission(value: string[]) {
  const userStore = useUserStore()
  if (value.length > 0) {
    const roles = userStore.roles
    return roles.some(role => value.includes(role))
  } else {
    return false
  }
}