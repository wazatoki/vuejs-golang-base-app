<template>
  <Dialog :dialogTitle="title" :dialogVisible="dialogVisible" @dialogClose="onDialogClose">
    <div class="input-form" slot="dialog-contents">
      <StaffInputForm :staffProp="staffProp" @staffDataSaved="onStaffDataSaved"></StaffInputForm>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { Emit, Prop, Component, Vue } from 'vue-property-decorator';
import Dialog from '@/components/contents/Dialog.vue';
import StaffModel from '../../components/models/StaffModel';
import StaffInputForm from './StaffInputForm.vue';

@Component({
  components: {
    Dialog,
    StaffInputForm,
  },
})
export default class StaffInputDialog extends Vue {
  @Prop()
  private dialogVisible!: boolean;

  @Prop()
  private title!: string;

  @Prop()
  private staffProp!: StaffModel;

  @Emit('staffInputDialogClose')
  private onDialogClose(): void {
    /* tslint:disable:no-empty */
  }

  @Emit('staffDataSaved')
  private onStaffDataSaved(): void {
    this.onDialogClose();
  }
}
</script>
