import { ImageDTO } from "./ImageDTO";
import { PaymentMethodDTO } from "./PaymentMethodDTO";

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ImageDTO[];
  is_active: boolean;
  payment_methods: PaymentMethodDTO[];
  user?: {
    avatar: string;
  };
};
