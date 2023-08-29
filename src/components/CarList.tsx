import React from 'react';
import CarItem from './CarItem';
import useFilteredList from '../hooks/useFilteredList';
import Loading from './Loading';
import Error from './Error';
import { Car } from '../model/types';

const CarList: React.FC = () => {
  const { isLoading, isError, filteredCarList } = useFilteredList();

  // 로딩 시
  if (isLoading) return <Loading />;
  // 에러 발생 시
  if (isError) return <Error />;

  return (
    <>
      {filteredCarList().length > 0 ? (
        <section className='car-list'>
          <p className='car-list__msg'>
            이용 가능한 <span>{filteredCarList().length}</span>대의 자동차가 있습니다.
          </p>
          <ul>
            {filteredCarList().map((item: Car) => (
              <CarItem key={item.carClassId} item={item} />
            ))}
          </ul>
        </section>
      ) : (
        <section className='empty-wrap'>
          <p>
            선택하신 조건에 맞는 차량이 없습니다. 😢 <br />
            준비된 다른 차량을 확인해 보세요!
          </p>
        </section>
      )}
    </>
  );
};

export default CarList;
