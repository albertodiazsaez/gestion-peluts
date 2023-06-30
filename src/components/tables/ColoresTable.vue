<template>
    <DataTable removableSort v-model:filters="filters" scrollable :value="colores" tableStyle="min-width: 50rem"
        scrollHeight="400px">
        <template #header>
            <div class="flex justify-content-end space-x-4">
                <span class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <InputText v-model="filters['global'].value" placeholder="Buscar" />
                </span>
                <Button icon="pi pi-plus" severity="primary" @click="showFormDialog = true"></Button>
            </div>
        </template>
        <Column field="color" header="Color" sortable />
        <Column headerStyle="width: 5rem; text-align: center">
            <template #body>
                <Button type="button" icon=" pi pi-times" severity="danger" @click="confirmDeletion($event)"></Button>
            </template>
        </Column>
    </DataTable>
    <Dialog :header="formDialogHeader" v-model:visible="showFormDialog" modal>
        <ColoresForm class="pt-4" @onColorSaved="closeDialog()" />
    </Dialog>
    <ConfirmPopup></ConfirmPopup>
</template>

<script lang="ts">

import ColoresForm from '@/components/forms/ColoresForm.vue'
import { appwDatabase } from '@/api';
import { Colores } from '@/api/Colores';
import { FilterMatchMode } from 'primevue/api';
import { defineComponent, ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Button from 'primevue/button';

const toast = useToast();

export default defineComponent({

    components: {
        ColoresForm
    },


    mounted() {
        this.getColors();
    },

    data() {
        return {
            confirm: useConfirm(),
            colores: [] as Colores[],
            showFormDialog: false,
            formDialogHeader: 'Crear Color',
            filters: ref({
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            }),
            confirmDeletion: (event: any) => {
                confirm.require({
                    target: event.currentTarget,
                    message: 'Are you sure you want to proceed?',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                    },
                    reject: () => {
                        toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                });
            }

        }
    },

    methods: {
        getColors() {
            appwDatabase.listDocuments('main', 'colores', [])
                .then(result => {
                    this.colores = result.documents as unknown as Colores[];
                    console.log('COLORES: ', result);
                }).catch(error => { });
        },

        closeDialog() {
            this.showFormDialog = false;
            this.getColors();
        }


    }

})

</script>