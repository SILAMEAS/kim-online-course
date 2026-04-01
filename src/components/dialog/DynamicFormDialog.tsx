import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FieldValues, Path, UseFormReturn} from "react-hook-form";

export type FieldType = "text" | "email" | "select";
export type FieldOption = {
    label: string;
    value: string;
    disabled?: boolean;
};

export type DynamicField<TFormValues> = {
    name: Path<TFormValues>; // ✅ type-safe key suggestion
    label: string;
    type: FieldType;
    placeholder?: string;
    options?: FieldOption[]; // only for select
};

interface DynamicFormDialogProps<TFormValues extends FieldValues> {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    description?: string;
    form: UseFormReturn<TFormValues>; // now TFormValues is guaranteed to be FieldValues
    fields: DynamicField<TFormValues>[];
    onSubmit: (data: TFormValues) => void | Promise<void>;
    submitLabel?: string;
    cancelLabel?: string;
}

export function DynamicFormDialog<TFormValues extends FieldValues>({
                                                                       open,
                                                                       setOpen,
                                                                       title,
                                                                       description,
                                                                       form,
                                                                       fields,
                                                                       onSubmit,
                                                                       submitLabel = "Submit",
                                                                       cancelLabel = "Cancel",
                                                                   }: Readonly<DynamicFormDialogProps<TFormValues>>) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, (errors) => console.error(errors))}
                        className="space-y-4"
                    >
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name as Path<TFormValues>} // ✅ type-safe cast
                                render={({field: hookField}) => (
                                    <FormItem>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            {(() => {
                                                // Compute the input component based on field type
                                                if (field.type === "text" || field.type === "email") {
                                                    return <Input type={field.type}
                                                                  placeholder={field.placeholder} {...hookField} />;
                                                }

                                                if (field.type === "select") {
                                                    return (
                                                        <Select onValueChange={hookField.onChange}
                                                                defaultValue={hookField.value as string}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={`Select ${field.label}`}/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {field.options?.map((opt) => (
                                                                    <SelectItem key={opt.value} value={opt.value}
                                                                                disabled={opt.disabled}>
                                                                        {opt.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    );
                                                }

                                                return null; // fallback for unsupported types
                                            })()}
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}

                        <DialogFooter className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                {cancelLabel}
                            </Button>
                            <Button type="submit">{submitLabel}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}