import React, { createContext, ReactNode } from 'react';

type ProductContextProps = {
  children: ReactNode;
};

interface Product {
  _id: string,
  thumb: string,
  description: string,
  isActive: boolean,
  brandId: number,
  dataInactive: Date,
}

type ProductContextType = {
  ObjectId: Product[] | string[];
  Products: Product[];
  isOpenModalUpdateProduct: boolean;
  isOpenModalCreateProduct: boolean;
  isOpenDrawer: boolean;
  setObjectId: (newState: Product[]) => void;
  setProducts: (newState: Product[]) => void;
  setIsOpenModalUpdateProduct: (newState: boolean) => void;
  setIsOpenModalCreateProduct: (newState: boolean) => void;
  setIsOpenDrawer: (newState: boolean) => void;
};

const DEFAULT_VALUE = {
  ObjectId: [],
  Products: [],
  isOpenModalUpdateProduct: false,
  isOpenModalCreateProduct: false,
  isOpenDrawer: false,
  setObjectId: () => {},
  setProducts: () => {},
  setIsOpenModalUpdateProduct: () => {},
  setIsOpenModalCreateProduct: () => {},
  setIsOpenDrawer: () => {},
};

export const ProductContext = createContext<ProductContextType>(DEFAULT_VALUE);

export const ProductContextProvider = ({ children }: ProductContextProps) => {
  const [ObjectId, setObjectId] = React.useState(DEFAULT_VALUE.ObjectId);
  const [Products, setProducts] = React.useState(DEFAULT_VALUE.Products);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(DEFAULT_VALUE.isOpenDrawer);
  const [isOpenModalCreateProduct, setIsOpenModalCreateProduct] = React
    .useState(DEFAULT_VALUE.isOpenModalCreateProduct);
  const [isOpenModalUpdateProduct, setIsOpenModalUpdateProduct] = React
    .useState(DEFAULT_VALUE.isOpenModalUpdateProduct);

  return (<ProductContext.Provider value={{
    ObjectId,
    setObjectId,
    Products,
    setProducts,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenModalCreateProduct,
    setIsOpenModalCreateProduct,
    isOpenModalUpdateProduct,
    setIsOpenModalUpdateProduct,
  }}>
    {children}
    {/* {isOpenProduct && <ResponsiveProduct/>} */}
    </ProductContext.Provider>);
};
