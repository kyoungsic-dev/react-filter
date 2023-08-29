import React from 'react';
import CarItem from './CarItem';
import useFilteredList from '../hooks/useFilteredList';

export default function CarList() {
  const { isLoading, isError, filteredCarList } = useFilteredList();

  // 로딩 시
  if (isLoading) return <section>리스트를 불러오는 중입니다.</section>;
  // 에러 발생 시
  if (isError) return <section>리스트를 불러오는 중 에러가 발생했습니다.</section>;

  return (
    <>
      {filteredCarList().length > 0 ? (
        <section className='car-list'>
          <p className='car-list__count'>
            Total : <span>{filteredCarList().length}</span>개
          </p>
          <ul>
            {filteredCarList().map(item => (
              <CarItem key={item.carClassId} item={item} />
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <p>
            선택하신 조건에 맞는 차량이 없습니다. <br />
            준비된 다른 차량을 확인해 보세요!
          </p>
        </section>
      )}
    </>
  );
}
