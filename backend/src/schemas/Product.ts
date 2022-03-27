import {
  Schema, model, Document,
} from 'mongoose';

interface ProductInterface extends Document {
  ObjectId: Schema.Types.ObjectId;
  thumb: string;
  description: string;
  isActive: boolean;
  brandId: number;
  dataInactive?: Date;
}
const ProductSchema = new Schema({
  ObjectId: Schema.Types.ObjectId,
  thumb: String,
  description: String,
  isActive: Boolean,
  brandId: Number,
  dataInactive: Date,
}, {
  timestamps: true,
});

// ProductSchema.methods.setDataInativacao = function (): Date {
//   return `Descriçao normal: ${this.descricao
//   }Descrição da macra: ${this.descricaoMarca}`;
// };

export default model<ProductInterface>('Product', ProductSchema);
