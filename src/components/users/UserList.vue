<template>
  <div class="row">
    <div class="col">
      <q-table
        flat
        :filter="filter"
        bordered
        class="my-sticky-header-table"
        title="Platform Users"
        :rows="allUsers"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[10, 40, 100, 0]"
      >
      <template v-slot:top-right>
        <q-input standout dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          class="q-ml-md"
          @click="exportTable"
        />
      </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QTableProps,exportFile, useQuasar } from 'quasar';
import { useUsersStore } from 'src/stores/users-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

let filter= ref('')

const columns: QTableProps['columns'] = [
  // {
  //   name: 'id',
  //   align: 'center',
  //   label: 'Keycloak ID',
  //   field: 'id',
  //   sortable: true,
  // },
  // {
  //   name: 'username',
  //   align: 'center',
  //   label: 'Username',
  //   field: 'username',
  //   sortable: false,
  // },
  {
    name: 'firstName',
    align: 'center',
    label: 'First Name',
    field: 'firstName',
    sortable: true,
  },
  {
    name: 'lastName',
    align: 'center',
    label: 'Last Name',
    field: 'lastName',
    sortable: true,
  },
  {
    name: 'email',
    align: 'center',
    label: 'Email',
    field: 'email',
    sortable: false,
  },
  {
    name: 'providers',
    align: 'center',
    label: 'Providers',
    field: 'providers',
    sortable: true,
  },
  {
    name: 'created',
    align: 'center',
    label: 'Date Joined',
    field: 'created',
    sortable: true,
  },
];
const userStore = useUsersStore();
const $q = useQuasar()
const { allUsers } = storeToRefs(userStore);
const wrapCsvValue =  (val, formatFn, row)=> {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
const exportTable =  ()=> {
        // naive encoding to csv format
        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          allUsers.value.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
            col.format,
            row
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      }
</script>
