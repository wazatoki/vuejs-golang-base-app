<template>
  <el-form :model="staffProp" label-width="120px">
    <el-form-item label="ID" prop="id">
      <span>{{ staffProp.id }}</span>
    </el-form-item>

    <el-form-item label="名前" prop="name">
      <span>{{ staffProp.name }}</span>
    </el-form-item>

    <el-form-item label="タイトル" prop="title">
      <span>{{ staffProp.title }}</span>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Emit, Prop, Component, Vue } from 'vue-property-decorator';
import Dialog from '@/components/contents/Dialog.vue';
import StaffModel from '../../components/models/StaffModel';

@Component({
})
export default class StaffReadForm extends Vue {
  @Prop()
  private dialogVisible!: boolean;

  @Prop()
  private staffProp!: StaffModel;
}
</script>
