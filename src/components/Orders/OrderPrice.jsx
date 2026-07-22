import { ChevronRight } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

function OrderPrice({ orderPrice }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg font-bold text-indigo-600">
        {formatCurrency(orderPrice)}
      </span>
      <ChevronRight className="w-5 h-5 text-slate-400" />
    </div>
  );
}

export default OrderPrice;
