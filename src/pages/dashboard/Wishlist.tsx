import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function WishlistPage() {
  // Mock data - in a real app, this would come from Redux state
  const wishlistItems = [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Wishlist</h1>
        <p className="text-foreground/60">
          Save courses you want to learn later
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="p-12 border border-border text-center">
          <Heart className="w-16 h-16 mx-auto text-foreground/30 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-foreground/60 mb-6">
            Add courses to your wishlist to save them for later
          </p>
          <Link to="/courses">
            <Button size="lg">Browse Courses</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wishlist items would go here */}
        </div>
      )}
    </div>
  );
}
