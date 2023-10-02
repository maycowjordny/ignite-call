import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { Clock } from "phosphor-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const confirmFormSchema = z.object({
    name: z.string().min(3, { message: 'O nome precisa de no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Digite um email válido' }),
    observation: z.string().nullable()
})

type ConfirmFormSchemaData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit
    } = useForm<ConfirmFormSchemaData>({
        resolver: zodResolver(confirmFormSchema)
    })

    function handleConfirmScheduling(data: ConfirmFormSchemaData) {

    }

    return (
        <ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
            <FormHeader>
                <Text>
                    22 de setembro de 2022
                </Text>
                <Text>
                    <Clock />
                    18:00h
                </Text>
            </FormHeader>
            <label>
                <Text size='sm'>Nome completo</Text>
                <TextInput
                    placeholder="Seu nome"
                    {...register('name')} />
                {errors.name && (
                    <FormError size='sm'>{errors.name.message}</FormError>
                )}
            </label>
            <label>
                <Text size='sm'>Endereço de e-mail</Text>
                <TextInput
                    type="email"
                    placeholder="johndoe@example.com"
                    {...register('email')} />
                {errors.email && (
                    <FormError size='sm'>{errors.email.message}</FormError>
                )}
            </label>
            <label>
                <Text size='sm'>Observações</Text>
                <TextArea  {...register('observation')} />
            </label>
            <FormActions>
                <Button type="button" variant='tertiary' disabled={isSubmitting}>Cancelar</Button>
                <Button type="submit">Confirmar</Button>
            </FormActions>
        </ConfirmForm>
    )
}