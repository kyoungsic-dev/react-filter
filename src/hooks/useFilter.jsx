import { useContext } from 'react';
import { FilterContext } from '../contexts/FilterContext';

export default function useFilter() {
  const { filterData, setFilterData } = useContext(FilterContext);

  // 특수 필터 Toggle
  const handleToggleFilter = id => {
    const updatedFilterData = filterData.map(filter => {
      if (filter.id === id) {
        // 특수 필터일 때 필터 Toggle
        if (filter.type === 'single') return { ...filter, status: !filter.status };
      }

      return filter;
    });

    setFilterData(updatedFilterData);
  };

  // 필터 세부 옵션 Toggle
  const handleToggleFilterDetail = (id, optionTitle) => {
    // 세부 옵션 Toggle
    const updatedFilterData = filterData.map(filter => {
      if (filter.id !== id) return filter;

      let updatedOptions = [];

      switch (filter.type) {
        // 차종/지역 - 중복
        case 'multiple':
          updatedOptions = filter.options.map(option => {
            if (option.optionTitle === optionTitle) {
              const optionStatus = !option.optionStatus;
              return { ...option, optionStatus };
            }
            return option;
          });
          break;

        // 가격 - 택일
        case 'choice':
          updatedOptions = filter.options.map(option => {
            if (option.optionTitle === optionTitle) {
              return { ...option, optionStatus: true };
            } else {
              return { ...option, optionStatus: false };
            }
          });
          break;

        default:
          break;
      }

      return { ...filter, options: updatedOptions };
    });

    opionStatusCheck(updatedFilterData);
  };

  // 선택한 필터 초기화
  const handleFilterReset = id => {
    const updatedFilterData = filterData.map(filter => {
      if (filter.id === id) {
        const options = filter.options.map(option => ({ ...option, optionStatus: false }));
        return { ...filter, options };
      }
      return filter;
    });

    opionStatusCheck(updatedFilterData);
  };

  // 전체 필터 초기화
  const handleAllFilterReset = () => {
    const ressetFilterData = filterData.map(filter => {
      // 특수 타입 필터
      if (filter.type === 'single') return { ...filter, status: false };

      // 일반 필터
      const options = filter.options.map(option => {
        return { ...option, optionStatus: false };
      });
      return { ...filter, status: false, options };
    });
    setFilterData(ressetFilterData);
  };

  // 필터 옵션들 중 optionStatus가 true인게 있는 지 체크
  const opionStatusCheck = filterData => {
    const updatedFilterData = filterData.map(filter => {
      // 특수 타입 필터
      if (filter.type === 'single') return filter;

      // 일반 필터
      const status = filter.options.some(option => option.optionStatus);
      return { ...filter, status };
    });

    return setFilterData(updatedFilterData);
  };

  return {
    filterData,
    handleToggleFilter,
    handleToggleFilterDetail,
    handleFilterReset,
    handleAllFilterReset,
  };
}
