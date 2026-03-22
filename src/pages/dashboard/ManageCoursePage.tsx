import {Heart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Link, redirect} from "react-router-dom";
import {useEffect} from "react";
import {store} from "@/lib/redux/store.ts";
import {EnumRole} from "@/lib/enum.ts";

export default function ManageCoursePage() {
  // Mock data - in a real app, this would come from Redux state
  const wishlistItems = [];
  useEffect(()=>{
      if(store?.getState()?.auth?.currentUser?.role!==EnumRole.ADMIN){
          redirect("/")
      }
  },[])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Manage Course Page</h1>
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
