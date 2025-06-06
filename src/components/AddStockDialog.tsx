
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { stockService } from "@/services/stockService";

interface AddStockDialogProps {
  onStockAdded?: () => void;
}

export const AddStockDialog = ({ onStockAdded }: AddStockDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddStock = async () => {
    if (!symbol || !name) return;

    setIsLoading(true);
    try {
      const success = stockService.addStock(symbol, name);
      if (success) {
        setSymbol("");
        setName("");
        setIsOpen(false);
        onStockAdded?.();
      } else {
        alert("Stock already exists in the list");
      }
    } catch (error) {
      console.error("Error adding stock:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Stock</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="symbol" className="text-gray-300">Stock Symbol</Label>
            <Input
              id="symbol"
              placeholder="e.g., RELIANCE"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="name" className="text-gray-300">Company Name</Label>
            <Input
              id="name"
              placeholder="e.g., Reliance Industries Ltd."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleAddStock}
              disabled={!symbol || !name || isLoading}
              className="bg-blue-600 hover:bg-blue-700 flex-1"
            >
              {isLoading ? "Adding..." : "Add Stock"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-slate-700 text-gray-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
