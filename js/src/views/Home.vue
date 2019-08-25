<template>
  <div class="home">
    <HeaderLayout>
      <el-container>
        <el-aside width="200px">
          <ContaintsTitle title="一覧表示" />
          <ButtonContainer>
            <el-row>
              <el-button id="handleCreate" @click="handleCreate">新規</el-button>
            </el-row>
          </ButtonContainer>
          <ButtonContainer>
            <el-row>
              <el-button id="handleDelete" type="danger" @click="handleDelete">削除</el-button>
            </el-row>
          </ButtonContainer>
        </el-aside>
        <el-main>
          <el-container style="position: relative;">
            <el-header style="height: 60px;">
              <el-row>
                <el-col :span="20">
                  <el-input v-model="searchStrings" />
                </el-col>
                <el-col :span="4">
                  <el-button id="onSearch" @click="onSearch">検索</el-button>
                </el-col>
              </el-row>
            </el-header>
            <el-main ref="resultTable" style="padding-top: 60px;">
              <el-table
                :data="tableData"
                @selection-change="handleSelectionChange"
                max-height="250"
                style="width: 100%;"
              >
                <el-table-column type="selection" fixed width="55"></el-table-column>
                <el-table-column prop="id" label="ID" width="300"></el-table-column>
                <el-table-column prop="name" label="名前" width="120"></el-table-column>
                <el-table-column prop="title" label="タイトル" width="240"></el-table-column>
                <el-table-column width="240">
                  <template slot-scope="scope">
                    <el-button class="handleRead" size="mini" @click="handleRead(scope.row)">参照</el-button>
                    <el-button class="handleEdit" size="mini" @click="handleEdit(scope.row)">修正</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </HeaderLayout>

    <StaffInputDialog
      :dialogVisible="staffInputFormVisible"
      :staffProp="staff"
      :title="formTitle"
      @staffInputDialogClose="onStaffInputFormClose"
      @staffDataSaved="onSearch"
    ></StaffInputDialog>

    <StaffReadDialog
      :dialogVisible="staffReadFormVisible"
      :staffProp="staff"
      @staffReadDialogClose="onStaffReadFormClose"
    ></StaffReadDialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import HeaderLayout from '@/components/layout/HeaderLayout.vue';
import ContaintsTitle from '@/components/contents/ContentsTitle.vue';
import ButtonContainer from '@/components/contents/aside/ButtonContainer.vue';
import StaffInputDialog from '@/components/staff/StaffInputDialog.vue';
import StaffReadDialog from '@/components/staff/StaffReadDialog.vue';
import StaffModel from '../components/models/StaffModel';
import StaffType from '../components/models/StaffInterface';

@Component({
  components: {
    HeaderLayout,
    ContaintsTitle,
    ButtonContainer,
    StaffInputDialog,
    StaffReadDialog,
  },
})
export default class Home extends Vue {
  private staffInputFormVisible: boolean = false;
  private staffReadFormVisible: boolean = false;
  private staff: StaffModel = new StaffModel();
  private searchStrings: string = '';
  private multipleSelection = [];
  private formTitle: string = '';

  get tableData(): StaffType[] {
    return this.$store.state.items;
  }

  set tableData(items: StaffType[]) {
    this.$store.commit('set', items);
  }

  private async onSearch(): Promise<any> {
    this.$store.dispatch('fetch', this.searchStrings);
  }

  private handleCreate(): void {
    this.formTitle = '新規作成';
    this.staff.clear();
    this.staffInputFormVisible = true;
  }

  private async handleDelete(): Promise<any> {
    const idList: string[] = [];
    this.multipleSelection.forEach((item: StaffType) => {
      idList.push(item.id);
    });
    await this.$store.dispatch('delete', idList);
    this.onSearch();
  }

  private async handleEdit(row: StaffType): Promise<any> {
    this.formTitle = '更新';
    await this.staff.fetch(row.id);
    this.staffInputFormVisible = true;
  }

  private async handleRead(row: StaffType): Promise<any> {
    await this.staff.fetch(row.id);
    this.staffReadFormVisible = true;
  }

  private handleSelectionChange(val: any) {
    this.multipleSelection = val;
  }

  private onStaffInputFormClose(): void {
    this.staffInputFormVisible = false;
  }

  private onStaffReadFormClose(): void {
    this.staffReadFormVisible = false;
  }

}
</script>

<style scoped>
.el-aside button {
  width: 100%;
}

div.home,
.el-aside,
.el-container,
.el-main {
  height: 100%;
}
</style>
