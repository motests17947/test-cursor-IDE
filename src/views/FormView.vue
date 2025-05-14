<template>
  <div class="container">
    <div class="form-container">
      <h2>個人資料表單</h2>

      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="name">姓名</label>
          <InputText
            id="name"
            v-model.trim="formData.name"
            :class="{ 'p-invalid': errors.name }"
            aria-describedby="name-error"
          />
          <small id="name-error" class="error-message" v-if="errors.name">{{ errors.name }}</small>
        </div>

        <div class="form-field">
          <label for="phone">電話</label>
          <InputText
            id="phone"
            v-model.trim="formData.phone"
            :class="{ 'p-invalid': errors.phone }"
            aria-describedby="phone-error"
          />
          <small id="phone-error" class="error-message" v-if="errors.phone">{{ errors.phone }}</small>
        </div>

        <div class="form-field">
          <label for="address">住址</label>
          <Textarea
            id="address"
            v-model.trim="formData.address"
            rows="3"
            :class="{ 'p-invalid': errors.address }"
            aria-describedby="address-error"
          />
          <small id="address-error" class="error-message" v-if="errors.address">{{ errors.address }}</small>
        </div>

        <div class="form-field">
          <label for="birthday">生日</label>
          <Calendar
            id="birthday"
            v-model="formData.birthday"
            dateFormat="yy-mm-dd"
            :showIcon="true"
            :class="{ 'p-invalid': errors.birthday }"
            aria-describedby="birthday-error"
          />
          <small id="birthday-error" class="error-message" v-if="errors.birthday">{{ errors.birthday }}</small>
        </div>

        <div class="form-field">
          <Button type="submit" label="提交" />
        </div>
      </form>

      <Dialog v-model="showSuccessDialog" header="提交成功" :modal="true">
        <p>表單已成功提交！</p>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

interface FormData {
  name: string;
  phone: string;
  address: string;
  birthday: Date | null;
}

interface FormErrors {
  name: string;
  phone: string;
  address: string;
  birthday: string;
}

const formData = reactive<FormData>({
  name: '',
  phone: '',
  address: '',
  birthday: null
});

const errors = reactive<FormErrors>({
  name: '',
  phone: '',
  address: '',
  birthday: ''
});

const showSuccessDialog = ref(false);

const validateForm = (): boolean => {
  let isValid = true;

  // 重置錯誤訊息
  errors.name = '';
  errors.phone = '';
  errors.address = '';
  errors.birthday = '';

  // 驗證姓名
  if (!formData.name) {
    errors.name = '請輸入姓名';
    isValid = false;
  }

  // 驗證電話
  if (!formData.phone) {
    errors.phone = '請輸入電話號碼';
    isValid = false;
  } else if (!/^[0-9\-+]{8,15}$/.test(formData.phone)) {
    errors.phone = '請輸入有效的電話號碼';
    isValid = false;
  }

  // 驗證住址
  if (!formData.address) {
    errors.address = '請輸入住址';
    isValid = false;
  }

  // 驗證生日
  if (!formData.birthday) {
    errors.birthday = '請選擇生日日期';
    isValid = false;
  }

  return isValid;
};

const submitForm = () => {
  if (validateForm()) {
    console.log('表單提交成功', formData);
    showSuccessDialog.value = true;
  } else {
    console.log('表單驗證失敗');
  }
};
</script>

<style scoped lang="scss">
$primary-color: #4caf50;
$error-color: #ff3d00;

.form-field {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  .p-inputtext, .p-calendar, .p-textarea {
    width: 100%;
  }

  .p-invalid {
    border-color: $error-color;
  }
}

.p-button {
  background-color: $primary-color;
  border-color: $primary-color;

  &:hover {
    background-color: rgba($primary-color, 0.8);
    border-color: rgba($primary-color, 0.8);
  }
}
</style>