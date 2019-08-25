<template>
  <el-form
    :model="staff"
    :rules="rules"
    ref="staff"
    label-width="120px"
    class="staff-input-form"
  >
    <el-form-item label="名前" prop="name">
      <el-input v-model="staff.name"></el-input>
    </el-form-item>

    <el-form-item label="タイトル" prop="title">
      <el-input v-model="staff.title"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button id="staff-input-form-save" type="primary" @click="save('staff')">保存</el-button>
      <el-button id="staff-input-form-clear" @click="resetForm">クリア</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Emit, Prop, Component, Vue } from 'vue-property-decorator';
import Dialog from '@/components/contents/Dialog.vue';
import StaffModel from '../../components/models/StaffModel';

@Component({
  components: {
    Dialog,
  },
})
export default class StaffInputForm extends Vue {

  @Prop()
  private staffProp!: StaffModel;

  // data
  private staff: StaffModel = this.staffProp;

  // config
  private rules = {
    name: [
      {
        required: true,
        message: '名前を入力してください。',
        trigger: 'blur',
      },
    ],
    title: [
      {
        required: true,
        message: 'タイトルを入力してください。',
        trigger: 'blur',
      },
    ],
  };

  private save(formName: string): void {
    (this.$refs[formName] as any).validate(async (valid: any) => {
      if (valid) {
        await this.staff.save();
        this.staff.clear();
        this.$emit('staffDataSaved');
      }
    });
  }

  private resetForm(): void {
    this.staff.reset();
  }
}
</script>
