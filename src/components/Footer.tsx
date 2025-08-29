import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center space-x-2">
          <Leaf className="h-5 w-5 text-primary" />
          <p className="text-sm text-secondary-foreground font-headline">
            &copy; {new Date().getFullYear()} Crispy Goodness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
