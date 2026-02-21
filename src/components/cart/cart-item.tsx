import { Link } from "react-router-dom";
import { CartItem as CartItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  onRemove: (courseId: string) => void;
}

export function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 border border-border rounded-lg p-4 bg-card">
      {/* Image */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.course_title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/courses/${item.course_id}`}>
            <h3 className="font-semibold hover:text-primary transition">
              {item.course_title}
            </h3>
          </Link>
          <p className="text-sm text-foreground/60 mt-1">
            by {item.instructor_name}
          </p>
        </div>

        <p className="text-lg font-semibold text-primary">
          ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item.course_id)}
        className="self-start flex-shrink-0"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
}
