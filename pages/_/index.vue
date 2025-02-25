<script setup>
import { useUserStore } from '../store/userStore'
import { onMounted } from 'vue'
const userStore = useUserStore()

onMounted(() => {
  if (userStore.userData.role === 'customer') {
      navigateTo('/_/customer/')
    } else if (userStore.userData.role === 'courier') {
      navigateTo('/_/courier/')
    }
})
definePageMeta({
  layout: 'panel',
})
</script>