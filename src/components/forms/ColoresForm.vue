<template>
    <div class="card flex justify-content-center">
        <section class="p-1">
            <Form @submit="onSubmit" :validation-schema="validationSchema">
                <div class="grid grid-cols-1 gap-4 place-content-center">
                    <Field name="colorName" v-slot="{ field, errorMessage }">
                        <span class="p-float-label">

                            <InputText id="colorNameInput" v-model="colorNameValue" v-bind="field"
                                :class="{ 'p-invalid': errorMessage }" autofocus/>
                            <label for="colorNameInput">Color</label>
                        </span>
                        <small id="email-help" class="p-error">{{ errorMessage }}</small>

                    </Field>
                    <div class="flex flex-row justify-center">
                        <Button label="Guardar" type="submit" severity="success"></Button>
                    </div>
                </div>
            </Form>
        </section>

    </div>
</template>

<script lang="ts">

import { Colores } from "@/api/Colores";
import { appwDatabase } from "@/api/index";
import { useToast } from "primevue/usetoast";
import { Field, Form } from 'vee-validate';
import { defineComponent } from 'vue';
import { MessageErrors } from '@/utils/message-errors'
import * as yup from 'yup';



export default defineComponent({

    props: {
        color: Colores,
    },

    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Form,
        // eslint-disable-next-line vue/no-reserved-component-names
        Field
    },

    data() {
        return {
            isEdition: false,
            toast: useToast(),
            colorNameValue: '',
            validationSchema: yup.object({
                colorName: yup.string().required("Introduce un color").label("Color"),
            })
        }
    },
    methods: {
        onSubmit() {
            appwDatabase.createDocument('main', 'colores', '', { color: this.colorNameValue }).then(response => {
                console.log('RESPONSE: ', response)
                this.toast.add({ severity: 'success', summary: 'Color guardado', detail: `Se ha guardado el color ${this.colorNameValue}`, life: 3000 });
                this.$emit('onColorSaved')
            }).catch(error => {
                console.log(error); 
                this.toast.add({ severity: 'error', summary: 'No se pudo guardar el color', detail: `${MessageErrors.getMessageError(error.code)}`, life: 3000 });
            });
        }
    }
})
</script>