<template>
  <Dialog :dialogTitle="title" :dialogVisible="dialogVisible" @dialogClose="onDialogClose">
    <div class="read-form" slot="dialog-contents">
      <StaffReadForm :staffProp="staffProp"></StaffReadForm>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { Emit, Prop, Component, Vue } from 'vue-property-decorator';
import Dialog from '@/components/contents/Dialog.vue';
import StaffModel from '../../components/models/StaffModel';
import StaffReadForm from '@/components/staff/StaffReadForm.vue';

@Component({
  components: {
    Dialog,
    StaffReadForm,
  },
})
export default class StaffReadDialog extends Vue {
  @Prop()
  private dialogVisible!: boolean;

  @Prop()
  private staffProp!: StaffModel;

  // data
  private title: string = '参照';

  @Emit('staffReadDialogClose')
  private onDialogClose(): void {
    /* tslint:disable:no-empty */
  }
}
</script>
