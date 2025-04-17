<template>
    <div class="p-2 max-w-6xl mx-auto">
        <!-- Title -->
        <h2 class="mb-10 text-3xl text-[#141A31]"> تسویه حساب پیک</h2>

        <!-- Settlement Type Buttons -->
        <div class="flex gap-8 mb-8">
            <div class="text-lg font-medium pt-2">نوع تسویه اتوماتیک:</div>
            <button
                :class="[
                    'px-4 py-2 rounded-lg transition',
                    settlementType === 'daily'
                        ? 'bg-blue-700 text-white'
                        : 'bg-[#E0E7FF] text-blue-700 hover:bg-blue-200'
                ]"
                @click="settlementType = 'daily'"
            >
                تسویه روزانه
            </button>
            <button
                :class="[
                    'px-4 py-2 rounded-lg transition',
                    settlementType === 'weekly'
                        ? 'bg-blue-700 text-white'
                        : 'bg-[#E0E7FF] text-blue-700 hover:bg-blue-200'
                ]"
                @click="settlementType = 'weekly'"
            >
                تسویه هفتگی
            </button>
            <button
                :class="[
                    'px-4 py-2 rounded-lg transition',
                    settlementType === 'monthly'
                        ? 'bg-blue-700 text-white'
                        : 'bg-[#E0E7FF] text-blue-700 hover:bg-blue-200'
                ]"
                @click="settlementType = 'monthly'"
            >
                تسویه ماهانه
            </button>
        </div>

        <!-- Unsettled Income -->
        <div class="bg-yellow-50 p-4 rounded-lg mb-8 flex items-center justify-start gap-8">
            <div class="text-lg font-medium">
                میزان درآمد تسویه‌نشده:
                <span class="text-green-600 font-bold">{{ formatCurrency(unsettledIncome) }}</span> تومان
            </div>
            <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                @click="settleNow">
                همین الان تسویه کن
            </button>
        </div>

        <!-- Settlement History Table -->
        <div class="bg-white shadow rounded-lg overflow-x-auto">
            <table class="min-w-full text-right">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="px-4 py-3">تاریخ</th>
                        <th class="px-4 py-3">مبلغ</th>
                        <th class="px-4 py-3">نوع تسویه</th>
                        <th class="px-4 py-3">وضعیت</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in settlementHistory" :key="index" class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3">{{ item.date }}</td>
                        <td class="px-4 py-3">{{ formatCurrency(item.amount) }} تومان</td>
                        <td class="px-4 py-3">{{ item.type }}</td>
                        <td class="px-4 py-3">
                            <span :class="[
                                'px-2 py-1 text-sm rounded',
                                item.status === 'موفق' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            ]">
                                {{ item.status }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

// پیش‌فرض روی ماهانه
const settlementType = ref("monthly");

const unsettledIncome = ref(850000); 

const settlementHistory = ref([
    { date: "1404/02/09", amount: 320000, type: "هفتگی", status: "موفق" },
    { date: "1404/02/02", amount: 450000, type: "هفتگی", status: "موفق" },
    { date: "1404/01/26", amount: 270000, type: "ماهانه", status: "موفق" },
    { date: "1403/12/26", amount: 500000, type: "هفتگی", status: "موفق" },
]);

const settleNow = () => {
    alert("درخواست تسویه ارسال شد!");
};

const formatCurrency = (num) => {
    return num.toLocaleString("fa-IR");
};

definePageMeta({
  layout: 'panel',
})
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    text-align: center;
}
</style>
