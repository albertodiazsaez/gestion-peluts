
<template>
    <section class="w-full h-full flex flex-col items-center justify-center">
        <Card class="my-[7%]">
            <template #title>Bienvenido</template>
            <template #content>
                <Form @submit="onSubmit" :validation-schema="validationSchema">
                    <div class="grid grid-cols-1 gap-4 place-content-center">
                        <Field name="email" v-slot="{ field, errorMessage }">
                            <InputText v-model="emailValue" v-bind="field"
                                :class="{ 'p-invalid': errorMessage }" />
                            <small id="email-help" class="p-error">{{ errorMessage }}</small>
                        </Field>
                        <Field name="password" v-slot="{ field, errorMessage }">
                            <InputText id="password" type="password" v-model="passwordValue" v-bind="field"
                                :class="{ 'p-invalid': errorMessage }" />
                            <small id="email-help" class="p-error">{{ errorMessage }}</small>

                        </Field>

                        <Button type="submit" label="Iniciar Sesión"></Button>
                    </div>
                </Form>
            </template>
        </Card>

    </section>
</template>

<script lang="ts">

import { Form, Field } from 'vee-validate';
import { defineComponent } from 'vue'
import { appwAccount } from '../api/index'
import * as yup from 'yup';



export default defineComponent({
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Form,
        // eslint-disable-next-line vue/no-reserved-component-names
        Field
    },
    data() {
        return {
            emailValue: '',
            passwordValue: '',
            validationSchema: yup.object({
                email: yup.string().required("Introduce tu correo").email("Introduce un correo válido").label("Email Address"),
                password: yup.string().required("Introduce tu contraseña").label("Password"),
            })
        }
    },

    methods: {

        onSubmit(values: any) {
            console.log('Submitted: ', values);
            appwAccount.createEmailSession(values.email, values.password).then((result) => {
                console.log(result);
                appwAccount.getSession("current");
            }).catch((error) => {
                console.log("LOGIN ERROR: ", error);
            });
        },

    }

})

</script>
