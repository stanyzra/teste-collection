import { Schema, model, Document } from 'mongoose';

interface BrandInterface extends Document {
  brandId: number,
  brandName: string;
  brandDescription: string,
}

const BrandSchema = new Schema({
  brandId: Number,
  brandName: String,
  brandDescription: String,
}, {
  timestamps: true,
});

// BrandSchema.methods.setDataInativacao = function (): Date {
//   return `Descriçao normal: ${this.descricao
//   }Descrição da macra: ${this.descricaoMarca}`;
// };

export default model<BrandInterface>('Brand', BrandSchema);
