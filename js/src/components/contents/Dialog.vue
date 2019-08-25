<template>
  <div class="dialog">
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <slot name="dialog-contents"></slot>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Emit, Prop, Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Dialog extends Vue {
  @Prop({
    default: false,
  })
  private dialogVisible!: boolean;
  @Prop({
    default: '',
  })
  private dialogTitle!: string;

  @Emit('dialogClose')
  private handleClose(): void {
    /* tslint:disable:no-empty */
  }
}
</script>
