import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

interface CartSummaryProps {
    total: number;
    quantity: number;
    onCheckout: () => void;
    isLoading?: boolean;
}

export function CartSummary({
                                total,
                                quantity,
                                onCheckout,
                                isLoading = false,
                            }: Readonly<CartSummaryProps>) {
    const {t} = useTranslation();
    const TAX_RATE = 0.1; // 10% tax
    const tax = total * TAX_RATE;
    const finalTotal = total + tax;
    return (
        <div className="bg-card border border-border rounded-lg p-6 sticky top-24 h-fit">
            <h3 className="text-xl font-semibold mb-6">{t(Localization("cart", "order_summary"))}</h3>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
          <span className="text-foreground/60">
            {t(Localization("cart","subtotal"))} ({quantity} course{quantity !== 1 ? "s" : ""})
          </span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">{t(Localization("cart", "tax_10"))}</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between">
                    <span className="font-semibold">{t(Localization("cart", "total"))}</span>
                    <span className="text-2xl font-bold text-primary">
            ${finalTotal.toFixed(2)}
          </span>
                </div>
            </div>

            <Button
                className="w-full mb-3"
                size="lg"
                onClick={onCheckout}
                disabled={isLoading || quantity === 0}
            >
                {`${isLoading ? t(Localization("cart", "proceed_to_checkout")) : t(Localization("cart", "proceed_to_checkout"))}`}
            </Button>

            <Link to="/courses">
                <Button variant="outline" className="w-full gap-2" disabled={isLoading}>
                    <ArrowLeft className="w-4 h-4"/>
                    {t(Localization("cart", "continue_shopping"))}
                </Button>
            </Link>

            <p className="text-xs text-foreground/60 text-center mt-4">
                {t(Localization("cart", "guarantee_on_all_courses"))}
            </p>
        </div>
    );
}
