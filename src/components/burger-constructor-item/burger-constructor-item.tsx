import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { removeIngredient, moveIngredient } from '@services/slices/constructorSlice';

import type { TConstructorIngredient } from '../../utils/types';

import styles from './burger-constructor-item.module.css';

type TIngredientItemProps = {
  item: TConstructorIngredient;
  index: number;
};

export const BurgerConstructorItem = ({
  item,
  index,
}: TIngredientItemProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag(
    {
      type: 'item',
      item: { id: item.id, index },
      isDragging: (monitor) => item.id === monitor.getItem().id,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [item.id, index]
  );

  const [, dropTarget] = useDrop(
    {
      accept: 'item',

      hover(draggedItem: { id: string; index: number }, monitor) {
        if (!ref.current) {
          return;
        }

        const dragIndex = draggedItem.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        //расчет середины, чтобы карточки не дергались
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) {
          return;
        }
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        dispatch(moveIngredient({ dragIndex: draggedItem.index, hoverIndex: index }));
        draggedItem.index = index;
      },
    },
    [index]
  );

  dragRef(dropTarget(ref));

  return (
    <li
      className={styles.fillingsItem}
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={() => dispatch(removeIngredient(item.id))}
        price={item.price}
        text={item.name}
        thumbnail={item.image}
      />
    </li>
  );
};
