import {useState} from "react";
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
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export type FieldType = "text" | "email" | "select" | "file";

export type FieldOption = {
    label: string;
    value: string | number;
    disabled?: boolean;
};

export type DynamicField<TFormValues extends FieldValues> = {
    name: Path<TFormValues>;
    label: string;
    type: FieldType;
    placeholder?: string;
    options?: FieldOption[]; // only for select
    accept?: string; // only for file input like "image/*" or "video/*"
};

interface DynamicFormDialogProps<TFormValues extends FieldValues> {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    description?: string;
    form: UseFormReturn<TFormValues>;
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
    const [preview, setPreview] = useState<string | null>(null);
    const {t} = useTranslation();

    const renderField = <TFormValues extends FieldValues>(
        field: DynamicField<TFormValues>,
        hookField: any,
        preview: string | null,
        setPreview: (val: string | null) => void
    ) => {
        switch (field.type) {
            case "text":
            case "email":
                return <Input type={field.type} placeholder={field.placeholder} {...hookField} />;

            case "select":
                return (
                    <Select onValueChange={hookField.onChange} defaultValue={hookField.value as string}>
                        <SelectTrigger>
                            <SelectValue placeholder={`Select ${field.label}`}/>
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((opt) => (
                                <SelectItem key={opt.value} value={`${opt.value}`} disabled={opt.disabled}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case "file":
                return (
                    <>
                        <Input
                            type="file"
                            accept={field.accept}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                hookField.onChange(file);

                                // Preview for images/videos
                                if (field.accept?.startsWith("image/") || field.accept?.startsWith("video/")) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setPreview(reader.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        {preview && field.accept?.startsWith("video/") && (
                            <video src={preview} controls className="w-full rounded-md border mt-2"/>
                        )}
                        {preview && field.accept?.startsWith("image/") && (
                            <img src={preview} alt="preview" className="w-full rounded-md border mt-2"/>
                        )}
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation errors:", errors))}
                        className="space-y-4"
                    >
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name}
                                render={({field: hookField}) => (
                                    <FormItem>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            {renderField(field, hookField, preview, setPreview)}
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}

                        <DialogFooter className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                {t(Localization("actions", cancelLabel?.toLowerCase() as any))}
                            </Button>
                            <Button type="submit"
                                    disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "loading..." : t(Localization("actions", submitLabel?.toLowerCase() as any))}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}