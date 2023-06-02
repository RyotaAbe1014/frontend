import { FC, useCallback, useState } from 'react';
import { MyDraggableList, MyDraggableHandle, MyDraggableItem } from '../organisms/MyDraggableList';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DefaultLayout } from '../../../common/_components/_templates/DefaultLayout';

// リソース:商品の型
type Product = {
  id: string;
  name: string;
  price: number;
};

// ドラッグ&ドロップ可能な商品リスト
export const Sample: FC = () => {
  // 初期データ
  const initialProducts: Product[] = [
    {
      id: '1',
      name: '商品1',
      price: 1000,
    },
    {
      id: '2',
      name: '商品2',
      price: 2000,
    },
    {
      id: '3',
      name: '商品3',
      price: 3000,
    },
  ];
  // 一覧表示する商品群
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [product2, setProduct2] = useState<Product[]>(initialProducts);

  const onDragStart = useCallback((e: DragStartEvent) => {
    const { active } = e;
    console.log(active.id);
  }, []);

  const onDragEnd = useCallback((e: DragEndEvent) => {
    const { active, over } = e;
    console.log(active.id, over?.id);
    if (over) {
      const overIndex = products.findIndex((product) => product.id === over.id);
      const activeIndex = products.findIndex((product) => product.id === active.id);
      const newProducts = [...products];
      newProducts.splice(overIndex, 0, newProducts.splice(activeIndex, 1)[0]);
      setProducts(newProducts);
    }
  }, [])

  return (
    <DefaultLayout>
      <MyDraggableList items={products} onDragStart={onDragStart} onDragEnd={onDragEnd} layout="grid">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </MyDraggableList>
    </DefaultLayout>
  );
}
const ProductItem: FC<{
  product: Product
}> = ({
  product
}) => (
    <MyDraggableItem id={product.id}>
      <MyDraggableHandle id={product.id}>
        <div className='space-y-4  bg-white p-4 rounded-md shadow-md w-72'>
          <p>{product.name}</p>
          <p>¥ {product.price}</p>
        </div>
      </MyDraggableHandle>
    </MyDraggableItem>
  );