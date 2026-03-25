

import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type PaymentFormData, paymentSchema} from '@/lib/v0/schemas';
import {createPayment, updatePayment, useCourses, useUsers} from '@/lib/v0/api-hooks';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';

interface PaymentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    payment?: any;
    onSuccess: () => void;
    onClose: () => void;
}

export function PaymentDialog({
                                  open,
                                  onOpenChange,
                                  payment,
                                  onSuccess
                              }: Readonly<PaymentDialogProps>) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const {users} = useUsers();
    const {courses} = useCourses();

    const form = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        defaultValues: payment || {
            userId: '',
            courseId: '',
            amount: 0,
            paymentMethod: 'CREDIT_CARD',
            transactionId: '',
            status: 'PENDING',
        },
    });

    React.useEffect(() => {
        if (payment) {
            form.reset(payment);
        } else {
            form.reset({
                userId: '',
                courseId: '',
                amount: 0,
                paymentMethod: 'CREDIT_CARD',
                transactionId: '',
                status: 'PENDING',
            });
        }
    }, [payment, open, form]);

    const onSubmit = async (data: PaymentFormData) => {
        setIsSubmitting(true);
        try {
            if (payment?.id) {
                await updatePayment(payment.id, data);
            } else {
                await createPayment(data);
            }
            onSuccess();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{payment ? 'Edit Payment' : 'Add New Payment'}</DialogTitle>
                    <DialogDescription>
                        {payment ? 'Update payment information' : 'Record a new payment'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>User</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select user"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {users.map((user: any) => (
                                                    <SelectItem key={user.id} value={user.id}>
                                                        {user.firstName} {user.lastName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="courseId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Course</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select course"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courses.map((course: any) => (
                                                    <SelectItem key={course.id} value={course.id}>
                                                        {course.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="99.99" step="0.01" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Payment Method</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                                                <SelectItem value="DEBIT_CARD">Debit Card</SelectItem>
                                                <SelectItem value="PAYPAL">PayPal</SelectItem>
                                                <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="transactionId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Transaction ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="TXN-12345" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="PENDING">Pending</SelectItem>
                                            <SelectItem value="COMPLETED">Completed</SelectItem>
                                            <SelectItem value="FAILED">Failed</SelectItem>
                                            <SelectItem value="REFUNDED">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            {payment ? 'Update Payment' : 'Create Payment'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
